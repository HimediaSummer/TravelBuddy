package travelbuddy.function.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.MyBuddyRepository;
import travelbuddy.function.member.repository.MyScheduleRepository;
import travelbuddy.function.member.service.MypageService;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Schedule;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mypage")
public class MypageController {

    private static final Logger log = LoggerFactory.getLogger(MypageController.class);
    private final MypageService mypageService;
    private final MyScheduleRepository myScheduleRepository;

    @Autowired
    public MypageController(MypageService mypageService, MyBuddyRepository myBuddyRepository, MyScheduleRepository myScheduleRepository) {
        this.mypageService = mypageService;
        this.myScheduleRepository = myScheduleRepository;
    }

    /* =========================================== My정보 =========================================== */
    @Operation(summary = "회원정보조회", description = "내가입정보조회", tags = {"MypageController"})
    @GetMapping("/myprofile")
    public ResponseEntity<ResponseDTO> selectMyProfile() {
        log.info("[MypageService] seleceMyProfile Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원정보조회", mypageService.selectMyProfile()));
    }

    @Operation(summary = "회원정보수정", description = "내가입정보수정", tags = {"MypageController"})
    @PutMapping("/updatemyprofile")
    public ResponseEntity<ResponseDTO> updateMyProfile(
            @ModelAttribute AccountDTO accountDTO,
            @RequestParam(value = "memberImg", required = false) MultipartFile memberImg)
    {
        log.info("[MypageService] updateMyProfile Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원정보수정", mypageService.updateMyProfile(accountDTO,memberImg)));
    }

    @Operation(summary = "회원탈퇴", description = "회원숨김수정", tags = {"MypageController"})
    @PutMapping("/deletion/{memberCode}")
    public ResponseEntity<ResponseDTO> putDeleteAccount(@PathVariable int memberCode) {
        log.info("[MypageService] deletionMyProfile Start");

        mypageService.putDeleteAccount(memberCode);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원숨김ㅃㅃ", null));
    }

    /* =========================================== My일정 =========================================== */
    /* 내 일정 목록 조회 */
    @Operation(summary = "일정조회", description = "일정목록조회", tags = {"MypageController"})
    @GetMapping("/myschedule/{memberCode}")
    public ResponseEntity<ResponseDTO> selectMySchedule(@PathVariable int memberCode) {
        log.info("[MypageService] selectMySchedule Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정조회", mypageService.selectMySchedule(memberCode)));
    }

    /* 내 일정 세부 조회 */
    @Operation(summary = "일정상세조회", description = "일정상세조회", tags = {"MypageController"})
    @GetMapping("/myschedule/{memberCode}/{scheCode}")
    public ResponseEntity<ResponseDTO> getDetailSchedule(@PathVariable int scheCode) {
        log.info("[MypageService] selectMySchedule Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정상세조회", mypageService.getDetailSchedule(scheCode)));
    }

    /* 내 일정 삭제 */
    @Operation(summary = "일정삭제", description = "내 일정 삭제", tags = {"MypageController"})
    @DeleteMapping(value = "/myschedule/{memberCode}/{scheCode}/delete")
    public ResponseEntity<ResponseDTO> deleteSchedule(@PathVariable int memberCode, @PathVariable int scheCode) {

        mypageService.deleteScheCode(memberCode, scheCode);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정삭제성공", null));
    }

    /* 내 일정 재생성 */
    @Operation(summary = "일정재생성", description = "내 일정 재생성", tags = {"MypageController"})
    @PostMapping(value = "/myschedule/{memberCode}/{scheCode}/recreate")
    public ResponseEntity<ResponseDTO> recreateSchedule(
            @PathVariable int memberCode,
            @PathVariable int scheCode,
            @RequestBody(required = false) ScheduleDTO newScheduleData
    ) {
        log.info("[ScheduleController] recreateSchedule() Start - 삭제할 scheCode: {}", scheCode);

        if (newScheduleData == null) {
            throw new IllegalArgumentException("Request body is missing. 스케쥴만든거 못찾겠다 꾀꼬리.");
        }

        Schedule recreateSchedule = mypageService.recreateSchedule(memberCode, scheCode, newScheduleData);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정재생성성공", recreateSchedule));
    }

    /* =========================================== My커뮤니티 =========================================== */
//    @Operation(summary = "내가쓴게시글조회요청", description = "내가쓴글조회및 페이징처리", tags = {"MypageController"})
//    @GetMapping("/mybuddypost")
//    public ResponseEntity<ResponseDTO> selectMypagePostList(
//            @RequestParam(name = "offset", defaultValue = "1")String offset) {
//
//        log.info("[MypageController]selectMyPostList" + offset);
//
//        int total = mypageService.selectMypagePostTotal();
//
//        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
//        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
//
//        pagingResponseDTO.setData(mypageService.selectMypagePostList(cri));
//        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
//
//        return ResponseEntity.ok().body
//                (new ResponseDTO(HttpStatus.OK, "내가쓴글조회성공", pagingResponseDTO));
//    }

    @Operation(summary = "게시글조회요청", description = "내가쓴글목록조회", tags = {"MypageController"})
    @GetMapping("/mybuddy")
    public ResponseEntity<ResponseDTO> selectBuddyList() {
        int memberCode = 1002; // 하드코딩된 memberCode
        List<Map<String, Object>> buddyList = mypageService.selectBuddyList(memberCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글목록조회성공", buddyList));
    }

    @Operation(summary = "게시글상세조회요청", description = "내가쓴글상세조회", tags = {"MypageController"})
    @GetMapping("/mybuddy/{buddyCode}")
    public ResponseEntity<ResponseDTO> getBuddyDetail(@PathVariable("buddyCode") int buddyCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글세부내용및신청회원조회성공", mypageService.getBuddyDetail(buddyCode)));
    }

    @Operation(summary = "게시글매칭상태수정", description = "매칭신청상태 1 : 신청 , 2: 수락 , 3: 거절", tags = {"MypageController"})
    @PutMapping("/mybuddy/{buddyCode}/applystatus")
    public ResponseEntity<ResponseDTO> getBuddyApplyStatus(
            @PathVariable("buddyCode") int buddyCode,
            @RequestParam("buddyMatchCode") int buddyMatchCode,
            @RequestParam("applyStatus") int applyStatus) {

        mypageService.updateApplyStatus(buddyCode, buddyMatchCode, applyStatus);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글매칭신청자상태수정", null));
    }

    /* 내가 쓴글 수정 */
    @Operation(summary = "게시글수정", description = "내가쓴글수정", tags = {"MypageController"})
    @PutMapping(value = "/mybuddy/{buddyCode}/update")
    public ResponseEntity<ResponseDTO> updateBuddy(@ModelAttribute BuddyDTO buddyDTO, @RequestParam(required = false) MultipartFile buddyImg) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글수정성공", mypageService.updateBuddy(buddyDTO, buddyImg)));
    }

    /* 내가 쓴글 삭제 */
    @Operation(summary = "게시글삭제", description = "내가쓴글삭제", tags = {"MypageController"})
    @DeleteMapping(value = "/mybuddy/{buddyCode}/delete")
    public ResponseEntity<ResponseDTO> deleteBuddy(@PathVariable int buddyCode) {

        mypageService.deleteBuddyCode(buddyCode);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글삭제성공", null));
    }

    /* 내가 신청한 게시글, 신청상태 조회 */
    @Operation(summary = "신청게시글조회", description = "내가매칭신청한게시글조회", tags = {"MypageController"})
    @GetMapping(value = "/mymatch/{memberCode}")
    public ResponseEntity<ResponseDTO> seleteMatch(@PathVariable int memberCode) {
        log.info("[MypageController] seleteMatch() Start");

        Object matchData = mypageService.selectMatch(memberCode);

        log.info("[MypageController] seleteMatch() End");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가신청한게시글조회성공", matchData));
    }

    /* 신청취소(삭제) */
    @Operation(summary = "신청취소", description = "신청취소삭제", tags = {"MypageController"})
    @DeleteMapping(value = "/mymatch/{memberCode}/delete")
    public ResponseEntity<ResponseDTO> deleteMatch(@PathVariable int memberCode) {
        log.info("[MypageController] deleteMatch() Start");
        log.info("Delete Request - memberCode: {}", memberCode);

        mypageService.deleteMatch(memberCode);

        log.info("[MypageController] deleteMatch() End");
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "신청취소 완 (삭제)", null));
    }

}
