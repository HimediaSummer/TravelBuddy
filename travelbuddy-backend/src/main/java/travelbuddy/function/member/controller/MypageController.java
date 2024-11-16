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
import travelbuddy.function.member.repository.MyBuddyRepository;
import travelbuddy.function.member.service.MypageService;

import java.util.Map;

@RestController
@RequestMapping("/mypage")
public class MypageController {

    private static final Logger log = LoggerFactory.getLogger(MypageController.class);
    private final MypageService mypageService;

    @Autowired
    public MypageController(MypageService mypageService, MyBuddyRepository myBuddyRepository) {
        this.mypageService = mypageService;
    }

    /* =========================================== My정보 =========================================== */
    @Operation(summary = "회원정보조회", description = "내가입정보조회", tags = {"MypageController"})
    @GetMapping()
    public ResponseEntity<ResponseDTO> selectMyProfile() {
        log.info("[MypageService] seleceMyProfile Start");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원정보조회", mypageService.selectMyProfile()));
    }








    /* =========================================== My일정 =========================================== */






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
    @GetMapping("/mybuddylist")
    public ResponseEntity<ResponseDTO> selectBuddyList() {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글목록조회성공", mypageService.selectBuddyList()));
    }

    @Operation(summary = "게시글상세조회요청", description = "내가쓴글상세조회", tags = {"MypageController"})
    @GetMapping("/mybuddylist/{buddyCode}")
    public ResponseEntity<ResponseDTO> getBuddyDetail(@PathVariable("buddyCode") int buddyCode) {
        Map<String, Object> getBuddyDetail = mypageService.getBuddyDetail(buddyCode);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글세부내용및신청회원조회성공", mypageService.getBuddyDetail(buddyCode)));
    }

    @Operation(summary = "게시글수정", description = "내가쓴글수정", tags = {"MypageController"})
    @PutMapping(value = "/mybuddylist/{buddyCode}/update")
    public ResponseEntity<ResponseDTO> updateBuddy(@ModelAttribute BuddyDTO buddyDTO, @RequestParam(required = false) MultipartFile buddyImg) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글수정성공",  mypageService.updateBuddy(buddyDTO, buddyImg)));
    }

    @Operation(summary = "게시글삭제", description = "내가쓴글삭제", tags = {"MypageController"})
    @DeleteMapping(value = "/mybuddylist/{buddyCode}/delete")
    public ResponseEntity<ResponseDTO> deleteBuddy(@PathVariable int buddyCode) {

        mypageService.deleteBuddyCode(buddyCode);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글삭제성공", null));
    }

}
