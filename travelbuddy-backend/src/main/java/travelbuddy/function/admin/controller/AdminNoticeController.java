package travelbuddy.function.admin.controller;


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
import travelbuddy.function.admin.service.AdminNoticeService;
import travelbuddy.function.community.notice.controller.NoticeController;
import travelbuddy.function.community.notice.dto.NoticeDTO;

@RestController
@RequestMapping("/admin")
public class AdminNoticeController {

    private static final Logger log = LoggerFactory.getLogger(NoticeController.class);
    private final AdminNoticeService adminNoticeService;

    @Autowired
    public AdminNoticeController(AdminNoticeService adminNoticeService) {
        this.adminNoticeService = adminNoticeService;
    }

    @Operation(summary = "관리자페이지 공지 리스트 조회 요청", description = "관리자페이지 공지 조회 및 페이징 처리가 진행됩니다.", tags={"AdminNoticeController"})
    @GetMapping("/notices")
    public ResponseEntity<ResponseDTO> selectNoticeListWithPaging(
            @RequestParam(name="offset", defaultValue = "1") String offset) {

        log.info("[NoticeController] selectNoticeListWithPaging() start" + offset);

        int total = adminNoticeService.selectNoticeTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(adminNoticeService.selectNoticeListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 요청", pagingResponseDTO));
    }

    @Operation(summary = "관리자페이지 공지 상세 조회 요청", description = "관리자페이지 공지의 상세 페이지 처리가 진행됩니다.", tags = {"AdminNoticeController"})
    @GetMapping("notices/{noticeCode}")
    public ResponseEntity<ResponseDTO> selectNoticeDetail(@PathVariable int noticeCode){
        NoticeDTO noticeDTO = adminNoticeService.selectNotice(noticeCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지 상세정보 조회 요청" , noticeDTO));
    }

    @Operation(summary = "공지 등록 요청", description = "공지의 등록 처리가 진행됩니다.", tags = {"AdminNoticeController"})
    @PostMapping("/notices/insertNotice")
    public ResponseEntity<ResponseDTO> insertNotice(@RequestBody NoticeDTO noticeDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지 등록 완료",adminNoticeService.insertNotice(noticeDTO)));
    }

    @Operation(summary = "공지 수정 요청", description = "공지의 수정 처리가 진행됩니다.", tags = {"AdminNoticeController"})
    @PutMapping("/notices/{noticeCode}/updateNotice")
    public ResponseEntity<ResponseDTO> insertNotice(@PathVariable int noticeCode, @RequestBody NoticeDTO noticeDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지 수정 완료",adminNoticeService.updateNotice(noticeCode,noticeDTO)));
    }

    @Operation(summary = "공지 삭제 요청", description = "공지의 삭제 처리가 진행됩니다.", tags = {"AdminNoticeController"})
    @DeleteMapping("/notices/{noticeCode}/deleteNotice")
    public ResponseEntity<ResponseDTO> insertNotice(@PathVariable int noticeCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지 삭제 완료",adminNoticeService.deleteNotice(noticeCode)));
    }
}
