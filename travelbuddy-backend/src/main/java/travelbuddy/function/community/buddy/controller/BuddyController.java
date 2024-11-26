package travelbuddy.function.community.buddy.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.common.Criteria;
import travelbuddy.common.PageDTO;
import travelbuddy.common.PagingResponseDTO;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.community.buddy.dto.BuddyMatchDataDTO;
import travelbuddy.function.community.buddy.service.BuddyService;

@RestController
@RequestMapping("/buddyBoard")
public class BuddyController {

    private static final Logger log = LoggerFactory.getLogger(BuddyController.class);

    private final BuddyService buddyService;

    @Autowired
    public BuddyController(BuddyService buddyService) {
        this.buddyService = buddyService;
    }

    @Operation(summary = "버디글 리스트 조회 요청", description = "버디글 조회 및 페이징 처리가 진행됩니다.", tags = {"BuddyController"})
    @GetMapping("/buddies")
    public ResponseEntity<ResponseDTO> selectBuddyListWithPaging(
            @RequestParam(name = "offset", defaultValue = "1") String offset) {

        log.info("[BuddyController] selectBuddyListWithPaging : " + offset);

        int total = buddyService.selectBuddyTotal();

        /* 한 페이지에 나올 갯수*/
        Criteria criteria = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(buddyService.selectBuddyListWithPaging(criteria));

        pagingResponseDTO.setPageInfo(new PageDTO(criteria, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
    }

    @Operation(summary = "버디 게시글 상세 조회 요청", description = "버디 게시글의 상세 페이지 처리가 진행됩니다.", tags = { "BuddyController" })
    @GetMapping("/buddies/{buddyCode}")
    public ResponseEntity<ResponseDTO> selectBuddyDetail(@PathVariable int buddyCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "버디게시글 상세정보 조회 성공", buddyService.selectBuddyDetail(buddyCode)));
    }

//    @Operation(summary = "검색 버디 리스트 조회 요청", description = "검색어에 해당되는 버디 리스트 조회가 진행됩니다.", tags = { "BuddyController" })
//    @GetMapping("/buddies/search")
//    public ResponseEntity<ResponseDTO> selectSearchProductList(@RequestParam(name="s", defaultValue="all") String search) {
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공",  buddyService.selectSearchBuddyList(search)));
//    }

    @Operation(summary = "버디 게시글 등록 요청", description = "해당 버디 게시글 등록이 진행됩니다.", tags = { "BuddyController" })
    @PostMapping(value = "/buddyRegist")
    public ResponseEntity<ResponseDTO> insertBuddy(@ModelAttribute BuddyDTO buddyDTO, @RequestParam(value = "buddyImage", required = false)MultipartFile buddyImage) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시글 등록 성공", buddyService.insertBuddy(buddyDTO, buddyImage)));

    }

    @Operation(summary = "버디 게시글 요청", description = "해당 버디 게시글 수정이 진행됩니다.", tags = { "BuddyController" })
    @PutMapping(value = "/buddyUpdate/{buddyCode}")
    public ResponseEntity<ResponseDTO> updateProduct(@ModelAttribute BuddyDTO buddyDTO,@RequestParam(value = "buddyImage", required = false) MultipartFile buddyImage) {

        log.info("[BuddyController] insertBuddy 시작 ===================================");
        log.info("[BuddyController] buddyDTO : {}", buddyDTO);
        log.info("[BuddyController] memberCode : {}", buddyDTO.getMemberCode());
        log.info("[BuddyController] buddyImage : {}", buddyImage != null ? buddyImage.getOriginalFilename() : "없음");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상품 수정 성공",  buddyService.updateBuddy(buddyDTO, buddyImage)));
    }

    @Operation(summary = "버디 게시글 삭제 요청", description = "해당 버디 게시글 삭제가 진행됩니다.", tags = { "BuddyController" })
    @DeleteMapping(value = "/buddies/{buddyCode}")
    public ResponseEntity<ResponseDTO> deleteBuddy(@PathVariable int buddyCode) {
        buddyService.deleteBuddy(buddyCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시글 삭제 성공", null));
    }

    @Operation(summary = "버디 게시글 검색 요청", description = "검색어에 맞는 버디 리스트 조회가 진행됩니다.", tags = { "BuddyController" })
    @GetMapping("buddies/search")
    public ResponseEntity<ResponseDTO> selectSearchMemberList(@RequestParam(name="s", defaultValue="all") String search){
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공",buddyService.selectSearchBuddyList(search)));
    }

    @Operation(summary = "버디 신청", description = "버디신청이 진행됩니다.", tags = { "BuddyController" })
    @PostMapping("/buddyApply")
    public ResponseEntity<ResponseDTO> applyBuddy(@RequestBody BuddyMatchDataDTO buddyMatchDataDTO) {
        buddyService.applyBuddy(buddyMatchDataDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "신청 성공", null));
    }

    @Operation(summary = "지역 조회 요청", description = "지역 조회됩니다.", tags = { "BuddyController" })
    @GetMapping("/region/{regionName}")
    public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable String  regionName) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", buddyService.selectRegion(regionName)));
    }


}
