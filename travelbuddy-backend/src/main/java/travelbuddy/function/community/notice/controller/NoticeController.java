package travelbuddy.function.community.notice.controller;


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
import travelbuddy.function.community.notice.dto.NoticeDTO;
import travelbuddy.function.community.notice.service.NoticeService;

@RestController
@RequestMapping("/cs")
public class NoticeController {

    private static final Logger log = LoggerFactory.getLogger(NoticeController.class);
    private final NoticeService noticeService;

    @Autowired
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @Operation(summary = "회원의 공지 리스트 조회 요청", description = "회원의 공지 조회 및 페이징 처리가 진행됩니다.", tags={"NoticeController"})
    @GetMapping("/notices")
    public ResponseEntity<ResponseDTO> selectNoticeListWithPaging(

            @RequestParam(name="offset", defaultValue = "1") String offset) {

        log.info("[NoticeController] selectNoticeListWithPaging() start" + offset);

        int total = noticeService.selectNoticeTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);

        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(noticeService.selectNoticeListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 요청", pagingResponseDTO));
    }

    @Operation(summary = "회원의 공지 상세 조회 요청", description = "회원의 공지의 상세 페이지 처리가 진행됩니다.", tags = {"NoticeController"})
    @GetMapping("notices/{noticeCode}")
    public ResponseEntity<ResponseDTO> selectNoticeDetail(@PathVariable int noticeCode){
        NoticeDTO noticeDTO = noticeService.selectNotice(noticeCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "공지 상세정보 조회 요청" , noticeDTO));
    }
}
