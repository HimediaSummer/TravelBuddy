package travelbuddy.function.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelbuddy.common.Criteria;
import travelbuddy.common.PageDTO;
import travelbuddy.common.PagingResponseDTO;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.member.service.MypageService;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class MypageController {

    private static final Logger log = LoggerFactory.getLogger(MypageController.class);
    private final MypageService mypageService;

    @Autowired
    public MypageController(MypageService mypageService) {
        this.mypageService = mypageService;
    }

    /* =========================================== My정보 =========================================== */









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
    @GetMapping("/mybuddypost")
    public ResponseEntity<ResponseDTO> selectBuddyList() {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글목록조회성공", mypageService.selectBuddyList()));
    }

//    @Operation(summary = "게시글상세조회요청", description = "내가쓴글상세조회", tags = {"MypageController"})
//    @GetMapping("/mybuddypost/{buddyCode}")
//    public ResponseEntity<ResponseDTO> getBuddyDetail(@PathVariable("buddyCode") int buddyCode) {
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "내가쓴글상세조회성공", mypageService.getBuddyDetail(buddyCode)));
//    }


}
