package travelbuddy.function.community.qnafaq.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.qnafaq.dto.FaqDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDetailDTO;
import travelbuddy.function.community.qnafaq.service.FaqService;

@RestController
@RequestMapping("/cs")
public class FaqController {

    private static final Logger log = LoggerFactory.getLogger(QnaController.class);
    private final FaqService faqService;

    @Autowired
    public FaqController(FaqService faqService) {
        this.faqService = faqService;
    }

    @GetMapping("/faqs")
    public ResponseEntity<ResponseDTO> selectFaqList() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 요청", faqService.selectFaqList()));
    }

    @Operation(summary = "qna 상세 조회 요청", description = "QnA의 상세 페이지 처리가 진행됩니다.", tags = {"QnaController"})
    @GetMapping("/faqs/{faqCode}")
    public ResponseEntity<ResponseDTO> selectFaqDetail(@PathVariable int faqCode){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"QnA 상세정보 조회 요청",faqService.selectFaq(faqCode)));
    }


}
