package travelbuddy.function.community.qnafaq.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import travelbuddy.common.Criteria;
import travelbuddy.common.PageDTO;
import travelbuddy.common.PagingResponseDTO;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.qnafaq.service.QnaService;


@RestController
@RequestMapping("/cs")
public class QnaController {

    private static final Logger log = LoggerFactory.getLogger(QnaController.class);

    private final QnaService qnaService;

    @Autowired
    public QnaController(QnaService qnaService) {
        this.qnaService = qnaService;
    }

//    @Operation(summary = "QnA 리스트 조회 요청", description = "QnA 조회 및 페이징 처리가 진행됩니다.", tags={"QnaController"})
//    @GetMapping("/qnas")
//    public ResponseEntity<ResponseDTO> selectQnaListWithPaging(
//            @RequestParam(name="offset", defaultValue = "1") String offset) {
//
//        log.info("[QnaController] selectQnaListWithPaging : " + offset);
//
//        int total = qnaService.selectQnaTotal();
//
//        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
//        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
//
//        pagingResponseDTO.setData(qnaService.selectQnaListWithPaging(cri));
//
//        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
//    }

    /*값만 잘 추출되는지 확인하기 위해 만든 메소드 (추후 없애도 됨)*/
    @GetMapping("/qnas")
    public ResponseEntity<ResponseDTO> selectQnaList() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", qnaService.selectQnaList()));
    }

}
