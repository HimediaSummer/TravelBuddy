package travelbuddy.function.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.common.Criteria;
import travelbuddy.common.PageDTO;
import travelbuddy.common.PagingResponseDTO;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.service.MypageService;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Schedule;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mypage")
public class MypageController {

    private static final Logger log = LoggerFactory.getLogger(MypageController.class);
    private final MypageService mypageService;

    @Autowired
    public MypageController(MypageService mypageService) {
        this.mypageService = mypageService;
    }

    // 현재 로그인한 사용자(AccountDTO) 가져오기
    public static AccountDTO getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof AccountDTO) {
            return (AccountDTO) principal;
        }
        return null; // 인증되지 않은 경우
    }

    // 현재 로그인한 사용자의 memberName 가져오기
    public static String getCurrentUsername() {
        AccountDTO currentUser = getCurrentUser();
        return currentUser != null ? currentUser.getMemberName() : null;
    }

    // 현재 로그인한 사용자의 memberCode 가져오기
    public static Integer getCurrentMemberCode() {
        AccountDTO currentUser = getCurrentUser();
        return currentUser != null ? currentUser.getMemberCode() : null;
    }

    /* =========================================== My정보 =========================================== */
    @Operation(summary = "회원정보조회", description = "내가입정보조회", tags = {"MypageController"})
    @GetMapping("/myprofile")
    public ResponseEntity<ResponseDTO> selectMyProfile() {
        log.info("[MypageService] seleceMyProfile Start");

        Integer memberCode = getCurrentMemberCode();

        // 서비스 계층 호출
        Object profileData = mypageService.selectMyProfile(memberCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원정보조회", profileData));
    }

    @Operation(summary = "회원정보수정", description = "내가입정보수정", tags = {"MypageController"})
    @PutMapping("/updatemyprofile")
    public ResponseEntity<ResponseDTO> updateMyProfile(
            @ModelAttribute AccountDTO accountDTO,
            @RequestParam(value = "profileImg", required = false) MultipartFile profileImg, HttpServletRequest request)
    {

        log.info("[MypageController] Raw request parameters:");
        request.getParameterMap().forEach((key, value) -> log.info("{}: {}", key, Arrays.toString(value)));

        // 현재 로그인한 사용자의 memberCode 가져오기
        Integer memberCode = getCurrentMemberCode();
        if (memberCode == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseDTO(HttpStatus.UNAUTHORIZED, "로그인 정보가 없습니다.", null));
        }

        // 현재 사용자의 memberCode를 AccountDTO에 설정
        accountDTO.setMemberCode(memberCode);

        // profileImg 처리 로그
        if (profileImg != null && !profileImg.isEmpty()) {
            log.info("[MypageController] profileImg Original Name: {}", profileImg.getOriginalFilename());
            log.info("[MypageController] profileImg Size: {}", profileImg.getSize());
        } else {
            log.info("[MypageController] No profileImg provided.");
        }

        String savedFileName = mypageService.updateMyProfile(accountDTO, profileImg);
        accountDTO.setMemberImg(savedFileName);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원정보수정", accountDTO));
    }

    @Operation(summary = "회원탈퇴", description = "회원숨김수정", tags = {"MypageController"})
    @PutMapping("/deletion")
    public ResponseEntity<ResponseDTO> putDeleteAccount() {
        log.info("[MypageService] deletionMyProfile Start");

        // 현재 로그인한 사용자의 memberCode 가져오기
        Integer memberCode = getCurrentMemberCode();
        if (memberCode == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseDTO(HttpStatus.UNAUTHORIZED, "로그인 정보가 없습니다.", null));
        }

        mypageService.putDeleteAccount(memberCode);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원 탈퇴가 완료되었습니다", null));
    }

    /* =========================================== My일정 =========================================== */
    /* 내 일정 목록 조회 */
    @Operation(summary = "일정조회", description = "일정목록페이지조회", tags = {"MypageController"})
    @GetMapping("/myschedule")
    public ResponseEntity<ResponseDTO> selectMyScheListPaging(
            @RequestParam(name = "offset", defaultValue = "1") int offset) {
        log.info("[MypageController] selectMyScheListPaging : " + offset);

        // 현재 로그인한 사용자의 memberCode 가져오기
        Integer memberCode = getCurrentMemberCode();
        if (memberCode == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseDTO(HttpStatus.UNAUTHORIZED, "로그인 정보가 없습니다.", null));
        }

        // offset 값 검증 및 최소값 보장
        if (offset < 1) {
            offset = 1;
        }
        int total = mypageService.selectScheTotal(memberCode);
        Criteria cri = new Criteria(offset, 10);
        List<Map<String, Object>> scheList = mypageService.selectMyScheListPaging(cri, memberCode);

        PagingResponseDTO response = new PagingResponseDTO();
        response.setData(scheList);
        response.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "페이지조회 성공", response));

    }

    /* 내 일정 세부 조회 */
    @Operation(summary = "일정상세조회", description = "일정상세조회", tags = {"MypageController"})
    @GetMapping("/myschedule/{scheCode}")
    public ResponseEntity<ResponseDTO> getDetailSchedule(@PathVariable int scheCode) {
        log.info("[MypageService] selectMySchedule Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정상세조회", mypageService.getDetailSchedule(scheCode)));
    }

    /* 내 일정 삭제 */
    @Operation(summary = "일정삭제", description = "내 일정 삭제", tags = {"MypageController"})
    @DeleteMapping(value = "/myschedule/delete")
    public ResponseEntity<ResponseDTO> deleteSchedule(@RequestBody List<Integer> scheCodes) {
        log.info("Received schedule delete request: {}", scheCodes);

        mypageService.deleteScheCode(scheCodes);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정삭제성공", null));
    }

    /* 내 일정 재생성 */
//    @Operation(summary = "일정재생성", description = "내 일정 재생성", tags = {"MypageController"})
//    @PostMapping(value = "/myschedule/{scheCode}/recreate")
//    public ResponseEntity<ResponseDTO> recreateSchedule(
//            @PathVariable int memberCode,
//            @PathVariable int scheCode,
//            @RequestBody(required = false) ScheduleDTO newScheduleData
//    ) {
//        log.info("[ScheduleController] recreateSchedule() Start - 삭제할 scheCode: {}", scheCode);
//
//        if (newScheduleData == null) {
//            throw new IllegalArgumentException("Request body is missing. 스케쥴만든거 못찾겠다 꾀꼬리.");
//        }
//
//        Schedule recreateSchedule = mypageService.recreateSchedule(memberCode, scheCode, newScheduleData);
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정재생성성공", recreateSchedule));
//    }

    /* =========================================== My커뮤니티 =========================================== */
    @Operation(summary = "게시글조회요청", description = "내가쓴글페이지목록조회", tags = {"MypageController"})
    @GetMapping("/mybuddy")
    public ResponseEntity<ResponseDTO> selectBuddyListPaging(
            @RequestParam(name = "offset", defaultValue = "1") int offset) {
        log.info("[MypageController] selectBuddyListPaging : " + offset);

        // 현재 로그인한 사용자의 memberCode 가져오기
        Integer memberCode = getCurrentMemberCode();
        if (memberCode == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseDTO(HttpStatus.UNAUTHORIZED, "로그인 정보가 없습니다.", null));
        }

        int total = mypageService.selectBuddyTotal(memberCode); // memberCode 전달
        Criteria cri = new Criteria(offset, 10);
        List<Map<String, Object>> buddyList = mypageService.selectBuddyListPaging(cri, memberCode); // memberCode 전달

        PagingResponseDTO response = new PagingResponseDTO();
        response.setData(buddyList);
        response.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", response));
    }

    @Operation(summary = "게시글상세조회요청", description = "내가쓴글상세조회", tags = {"MypageController"})
    @GetMapping("/mybuddy/{buddyCode}")
    public ResponseEntity<ResponseDTO> getBuddyDetail(@PathVariable("buddyCode") int buddyCode) {
        System.out.println("Received request for buddyCode: " + buddyCode);

        Map<String, Object> buddyDetail = mypageService.getBuddyDetail(buddyCode);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글세부내용조회성공", buddyDetail));
    }

    @Operation(summary = "게시글매칭상태수정", description = "매칭신청상태 1 : 신청 , 2: 수락 , 3: 거절", tags = {"MypageController"})
    @PutMapping("/mybuddy/{buddyCode}")
    public ResponseEntity<ResponseDTO> getBuddyApplyStatus(
            @PathVariable("buddyCode") int buddyCode,
            @RequestBody Map<String, Object> requestBody) {

        System.out.println("Buddy Code: " + buddyCode);
        System.out.println("Request Body: " + requestBody);

        // 검증: applyStatus가 1, 2, 3 중 하나인지 확인
        if (!requestBody.containsKey("buddyMatchCode") || !requestBody.containsKey("applyStatus")) {
            return ResponseEntity.badRequest().body(
                    new ResponseDTO(HttpStatus.BAD_REQUEST, "Missing required fields", null)
            );
        }

        int buddyMatchCode = (int) requestBody.get("buddyMatchCode");
        int applyStatus = (int) requestBody.get("applyStatus");

        System.out.println("Buddy Code: " + buddyCode);
        System.out.println("Buddy Match Code: " + buddyMatchCode);
        System.out.println("Apply Status: " + applyStatus);

        mypageService.updateApplyStatus(buddyCode, buddyMatchCode, applyStatus);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글매칭신청자상태수정", null));
    }


    /* 내가 쓴글 수정 */
    @Operation(summary = "게시글수정", description = "내가쓴글수정", tags = {"MypageController"})
    @PutMapping(value = "/mybuddy/{buddyCode}/update")
    public ResponseEntity<ResponseDTO> updateBuddy(
            @PathVariable int buddyCode,
            @ModelAttribute BuddyDTO buddyDTO,
            @RequestParam(value = "postImg", required = false) MultipartFile[] postImg) {
        log.info("Controller: PUT request for buddyCode {}", buddyCode);

        Map<String, Object> updatedData = mypageService.updateBuddy(buddyCode, buddyDTO, postImg);
        BuddyDTO updatedBuddy = (BuddyDTO) updatedData.get("updatedBuddy");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "버디 정보 수정 완료", updatedBuddy));
    }

    /* 내가 쓴글 이전 데이터불러오기 */
    @GetMapping("/mybuddy/{buddyCode}/update")
    public ResponseEntity<ResponseDTO> getUpdateData(@PathVariable int buddyCode) {
        // 수정 페이지 데이터 반환
        Map<String, Object> responseData = mypageService.getBuddyDetailWithLists(buddyCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시글 수정 데이터 반환 성공", responseData));
    }

    /* 내가 쓴글 삭제 */
    @Operation(summary = "게시글삭제", description = "내가쓴글삭제", tags = {"MypageController"})
    @DeleteMapping(value = "/mybuddy/delete")
    public ResponseEntity<ResponseDTO> deleteBuddy(@RequestBody List<Integer> buddyCodes) {

        mypageService.deleteBuddyCode(buddyCodes);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글삭제성공", null));
    }

    /* 내가 신청한 게시글, 신청상태 조회 */
    @Operation(summary = "신청게시글조회", description = "내가매칭신청한게시글조회", tags = {"MypageController"})
    @GetMapping(value = "/mymatch")
    public ResponseEntity<ResponseDTO> seleteMatch() {
        log.info("[MypageController] seleteMatch() Start");

        // 현재 로그인한 사용자의 memberCode 가져오기
        Integer memberCode = getCurrentMemberCode();
        if (memberCode == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseDTO(HttpStatus.UNAUTHORIZED, "로그인 정보가 없습니다.", null));
        }

        Object matchData = mypageService.selectMatch(memberCode);

        log.info("[MypageController] seleteMatch() End");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가신청한게시글조회성공", matchData));
    }

    /* 신청취소(삭제) */
    @Operation(summary = "신청취소", description = "신청취소삭제", tags = {"MypageController"})
    @DeleteMapping(value = "/mymatch")
    public ResponseEntity<ResponseDTO> deleteMatch() {
        log.info("[MypageController] deleteMatch() Start");

        // 현재 로그인한 사용자의 memberCode 가져오기
        Integer memberCode = getCurrentMemberCode();
        if (memberCode == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseDTO(HttpStatus.UNAUTHORIZED, "로그인 정보가 없습니다.", null));
        }

        mypageService.deleteMatch(memberCode);

        log.info("[MypageController] deleteMatch() End");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "신청취소 완 (삭제)", null));
    }

}
