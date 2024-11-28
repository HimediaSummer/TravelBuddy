package travelbuddy.function.community.qnafaq.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import travelbuddy.common.Criteria;
import travelbuddy.common.PageDTO;
import travelbuddy.common.PagingResponseDTO;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDetailDTO;
import travelbuddy.function.community.qnafaq.service.QnaService;
import travelbuddy.function.member.dto.AccountDTO;


@RestController
@RequestMapping("/cs")
public class QnaController {

    private static final Logger log = LoggerFactory.getLogger(QnaController.class);

    private final QnaService qnaService;

    @Autowired
    public QnaController(QnaService qnaService) {
        this.qnaService = qnaService;
    }


//    @Bean
//    public int getLoggedInUserCode() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.isAuthenticated()) {
//            Object principal = authentication.getPrincipal();
//
//            if (principal instanceof AccountDTO) {
//                return ((AccountDTO)principal).getMemberCode();
//            }
//        }
//        return 0;
//    }


    @Operation(summary = "QnA 리스트 조회 요청", description = "QnA 조회 및 페이징 처리가 진행됩니다.", tags={"QnaController"})
    @GetMapping("/qnas")
    public ResponseEntity<ResponseDTO> selectQnaListWithPaging(
            @RequestParam(name="offset", defaultValue = "1") String offset) {

        log.info("[QnaController] selectQnaListWithPaging : " + offset);

        int total = qnaService.selectQnaTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(qnaService.selectQnaListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 요청", pagingResponseDTO));
    }

    /*값만 잘 추출되는지 확인하기 위해 만든 메소드 (추후 없애도 됨)*/
//    @GetMapping("/qnas")
//    public ResponseEntity<ResponseDTO> selectQnaList() {
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 요청", qnaService.selectQnaList()));
//    }

    @Operation(summary = "qna 상세 조회 요청", description = "QnA의 상세 페이지 처리가 진행됩니다.", tags = {"QnaController"})
    @GetMapping("/qnas/{qnaCode}")
    public ResponseEntity<ResponseDTO> selectQnaDetail(@PathVariable int qnaCode){
        QnaDetailDTO qnaDetailDTO = (QnaDetailDTO) qnaService.selectQna(qnaCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"QnA 상세정보 조회 요청",qnaDetailDTO));
    }

    @Operation(summary = "qna 등록 요청", description = "QnA 등록이 진행됩니다.", tags = {"QnaController"})
    @PostMapping("/qnas/insertqna")
    public ResponseEntity<ResponseDTO> insertQna(@RequestBody QnaDTO qnaDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "Qna 입력 요청", qnaService.insertQna(qnaDTO)));
    }

    @Operation(summary = "qna 수정 요청", description = "QnA의 수정 처리가 진행됩니다.", tags = {"QnaController"})
    @PutMapping("/qnas/{qnaCode}/updateqna")
    public ResponseEntity<ResponseDTO> updateQna(@PathVariable int qnaCode, @RequestBody QnaDTO qnaDTO){
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"QnA 수정 요청",qnaService.updateQna(qnaCode, qnaDTO)));
    }

    @Operation(summary = "qna 삭제 요청", description = "QnA의 삭제 처리가 진행됩니다.", tags = {"QnaController"})
    @DeleteMapping("/qnas/{qnaCode}/deleteqna")
    public ResponseEntity<ResponseDTO> deleteQna(@PathVariable int qnaCode){
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"QnA 삭제 요청",qnaService.deleteQna(qnaCode)));
    }

}