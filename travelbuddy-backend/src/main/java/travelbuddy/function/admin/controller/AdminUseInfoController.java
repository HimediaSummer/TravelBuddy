package travelbuddy.function.admin.controller;


import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.common.Criteria;
import travelbuddy.common.PageDTO;
import travelbuddy.common.PagingResponseDTO;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.admin.service.AdminUseInfoService;
import travelbuddy.function.community.notice.dto.NoticeDTO;
import travelbuddy.function.community.useinfo.dto.UseinfoDTO;

@RestController
@RequestMapping("/admin")
public class AdminUseInfoController {

    private static final Logger log = LoggerFactory.getLogger(AdminUseInfoController.class);
    private final AdminUseInfoService adminUseInfoService;

    @Autowired
    public AdminUseInfoController(AdminUseInfoService adminUseInfoService) {
        this.adminUseInfoService = adminUseInfoService;
    }

    @Operation(summary = "관리자페이지 설명서 리스트 조회 요청", description = "관리자페이지 설명서 조회 및 페이징 처리가 진행됩니다.", tags={"AdminUseInfoController"})
    @GetMapping("/useinfos")
    public ResponseEntity<ResponseDTO> selectUseInfoListWithPaging(

            @RequestParam(name="offset", defaultValue = "1") String offset) {

        log.info("[AdminUseInfoController] selectUseInfoListWithPaging() start" + offset);

        int total = adminUseInfoService.selectUseInfoTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);

        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(adminUseInfoService.selectUseInfoListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 요청", pagingResponseDTO));
    }

    @Operation(summary = "관리자페이지 설명서 상세 조회 요청", description = "관리자페이지 설명서 상세 페이지 처리가 진행됩니다.", tags = {"AdminUseInfoController"})
    @GetMapping("useinfos/{useinfoCode}")
    public ResponseEntity<ResponseDTO> selectUseInfoDetail(@PathVariable int useinfoCode){
        UseinfoDTO useinfoDTO = adminUseInfoService.selectUseInfo(useinfoCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "설명서 상세정보 조회 요청" , useinfoDTO));
    }

    @Operation(summary = "설명서 등록 요청", description = "설명서 등록 처리가 진행됩니다.", tags = {"AdminUseInfoController"})
    @PostMapping("/useinfos/insertuseinfo")
    public ResponseEntity<ResponseDTO> insertUseInfo(@ModelAttribute UseinfoDTO useinfoDTO, @RequestParam(value = "useinfoImage", required = false) MultipartFile useinfoImage ) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "설명서 등록 완료",adminUseInfoService.insertUseInfo(useinfoDTO, useinfoImage)));
    }

    @Operation(summary = "설명서 수정 요청", description = "설명서 수정 처리가 진행됩니다.", tags = {"AdminUseInfoController"})
    @PutMapping("/useinfos/{useinfoCode}/updateuseinfo")
    public ResponseEntity<ResponseDTO> updateUseInfo(@PathVariable int useinfoCode, @RequestBody UseinfoDTO useinfoDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "설명서 수정 완료",adminUseInfoService.updateUseInfo(useinfoCode,useinfoDTO)));
    }

    @Operation(summary = "설명서 조회수+ 요청", description = "설명서 조회수+ 처리가 진행됩니다.", tags = {"AdminUseInfoController"})
    @PutMapping("/useinfos/{useinfoCode}/appendcount")
    public ResponseEntity<ResponseDTO> appendUseinfoCount(@PathVariable int useinfoCode, @ModelAttribute UseinfoDTO useinfoDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지 조회수+ 성공",adminUseInfoService.appendUseinfoCount(useinfoCode,useinfoDTO)));
    }

    @Operation(summary = "설명서 삭제 요청", description = "설명서 삭제 처리가 진행됩니다.", tags = {"AdminUseInfoController"})
    @DeleteMapping("/useinfos/{useinfoCode}/deleteuseinfo")
    public ResponseEntity<ResponseDTO> deleteUseInfo(@PathVariable int useinfoCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "설명서 삭제 완료",adminUseInfoService.deleteUseInfo(useinfoCode)));
    }
}
