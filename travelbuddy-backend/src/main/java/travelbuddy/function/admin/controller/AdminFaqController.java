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
import travelbuddy.function.admin.service.AdminFaqService;
import travelbuddy.function.community.qnafaq.controller.QnaController;
import travelbuddy.function.community.qnafaq.dto.FaqDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;

@RestController
@RequestMapping("/admin")
public class AdminFaqController {

    private static final Logger log = LoggerFactory.getLogger(QnaController.class);

    private final AdminFaqService adminFaqService;

    @Autowired
    public AdminFaqController(AdminFaqService adminFaqService) {
        this.adminFaqService = adminFaqService;
    }

    @Operation(summary = "FAQ 리스트 조회 요청", description = "FAQ 조회 및 페이징 처리가 진행됩니다.", tags={"AdminFaqController"})
    @GetMapping("/faqs")
    public ResponseEntity<ResponseDTO> selectFaqListWithPaging(
            @RequestParam(name="offset", defaultValue = "1") String offset) {

        log.info("[FaqController] selectFaqListWithPaging : " + offset);

        int total = adminFaqService.selectFaqTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(adminFaqService.selectFaqListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 요청", pagingResponseDTO));
    }

    @Operation(summary = "FAQ 상세 조회 요청", description = "FAQ의 상세 페이지 처리가 진행됩니다.", tags = {"AdminFaqController"})
    @GetMapping("/faqs/{faqCode}")
    public ResponseEntity<ResponseDTO> selectFaqDetail(@PathVariable int faqCode){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"FAQ 상세정보 조회 요청",adminFaqService.selectFaq(faqCode)));
    }

    @Operation(summary = "FAQ 등록 요청", description = "FAQ 등록이 진행됩니다.", tags = {"AdminFaqController"})
    @PostMapping("/faqs/insertfaq")
    public ResponseEntity<ResponseDTO> insertFaq(@RequestBody FaqDTO faqDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "FAQ 입력 요청", adminFaqService.insertFaq(faqDTO)));
    }


    @Operation(summary = "FAQ 수정 요청", description = "FAQ 수정 처리가 진행됩니다.", tags = {"AdminFaqController"})
    @PutMapping("/faqs/{faqCode}/updatefaq")
    public ResponseEntity<ResponseDTO> updateFaq(@PathVariable int faqCode, @RequestBody FaqDTO faqDTO){
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"FAQ 수정 요청",adminFaqService.updateFaq(faqCode, faqDTO)));
    }


    @Operation(summary = "FAQ 삭제 요청", description = "FAQ 삭제 처리가 진행됩니다.", tags = {"AdminFaqController"})
    @DeleteMapping("/faqs/{faqCode}/deletefaq")
    public ResponseEntity<ResponseDTO> deleteFaq(@PathVariable int faqCode){
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"FAQ 삭제 요청",adminFaqService.deleteFaq(faqCode)));
    }

}
