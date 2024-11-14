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
import travelbuddy.function.admin.service.AdminQnaService;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDetailDTO;

@RestController
@RequestMapping("/admin")
public class AdminQnaController {

    private static final Logger log = LoggerFactory.getLogger(AdminQnaController.class);
    private final AdminQnaService adminQnaService;

    @Autowired
    public AdminQnaController(AdminQnaService adminQnaService) {
        this.adminQnaService = adminQnaService;
    }

//    @Operation(summary = "관리자페이지 QnA 리스트 조회 요청", description = "전체 QnA 조회 및 페이징 처리를 진행합니다.", tags ={"AdminQnaController"})
//    @GetMapping("/qnas")
//    public ResponseEntity<ResponseDTO> selectQnaListWithPaging(
//            @RequestParam(name = "offset", defaultValue = "1") String offset) {
//
//        log.info("[AdminQnaController] selectQnaListWithPaging : " + offset);
//
//        /*========pageing 처리를 위한 작업===================*/
//        /*전체 회원의 수를 확인*/
//        int total = adminQnaService.selectQnaTotal();
//
//        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
//        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
//
//        /*1. offset (현재 기본 1로 지정) 의 번호에 맞는 페이지에 뿌릴 Member 들*/
//        pagingResponseDTO.setData(adminQnaService.selectQnaListWithPaging(cri));
//
//        /*2. pageDTO(criteria(보고싶은페이지, 한페이지에 뿌릴 개수), 전체 회원 수)
//         * 화면에서 페이징 처리를 계산해서 추출 한다.*/
//        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
//        /*===================================================*/
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
//    }

    /*값만 잘 추출되는지 확인하기 위해 만든 메소드 (추후 없애도 됨)*/
    @GetMapping("/qnas")
    public ResponseEntity<ResponseDTO> selectQnaList() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", adminQnaService.selectQnaList()));
    }

    @Operation(summary = "관리자페이지 QnA 상세 조회 요청", description = "QnA의 상세 페이지 처리가 진행됩니다.", tags = {"AdminQnaController"})
    @GetMapping("/qnas/{qnaCode}")
    public ResponseEntity<ResponseDTO> selectQnaDetail(@PathVariable int qnaCode){
        QnaDetailDTO qnaDetailDTO = (QnaDetailDTO) adminQnaService.selectQna(qnaCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"QnA 상세정보 조회 성공",adminQnaService.selectQna(qnaCode)));
    }

}
