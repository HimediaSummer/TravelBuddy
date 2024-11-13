package travelbuddy.function.admin.controller;

import travelbuddy.common.Criteria;
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
import travelbuddy.function.admin.service.AdminAccountService;
import travelbuddy.function.member.dto.AccountDTO;

@RestController
@RequestMapping("/admin")
public class AdminAccountController {

    /*Log 를 찍기 위해서 가져오다. 로그.*/
    private static final Logger log = LoggerFactory.getLogger(AdminAccountController.class);

    private final AdminAccountService adminAccountService;

    @Autowired
    public AdminAccountController(AdminAccountService adminAccountService) {
        this.adminAccountService = adminAccountService;
    }

//    @Operation(summary = "관리자페이지 회원 리스트 조회 요청", description = "전체 회원 조회 및 페이징 처리를 진행합니다.", tags ={"AdminAccountController"})
//    @GetMapping("/members")
//    public ResponseEntity<ResponseDTO> selectMemberListWithPaging(
//            @RequestParam(name = "offset", defaultValue = "1") String offset) {
//
//        log.info("[AdminAccountController] selectMemberListWithPaging : " + offset);
//
//        /*========pageing 처리를 위한 작업===================*/
//        /*전체 회원의 수를 확인*/
//        int total = adminAccountService.selectMemberTotal();
//
//        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
//        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
//
//        /*1. offset (현재 기본 1로 지정) 의 번호에 맞는 페이지에 뿌릴 Member 들*/
//        pagingResponseDTO.setData(adminAccountService.selectMemberListWithPaging(cri));
//
//        /*2. pageDTO(criteria(보고싶은페이지, 한페이지에 뿌릴 개수), 전체 회원 수)
//         * 화면에서 페이징 처리를 계산해서 추출 한다.*/
//        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
//        /*===================================================*/
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
//    }

    /*값만 잘 추출되는지 확인하기 위해 만든 메소드 (추후 없애도 됨)*/
    @GetMapping("/members")
    public ResponseEntity<ResponseDTO> selectMemberList() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", adminAccountService.selectMemberList()));
    }

    @Operation(summary = "관리자페이지 회원 상세 조회 요청", description = "회원의 상세 페이지 처리가 진행됩니다.", tags = {"AdminAccountController"})
    @GetMapping("/members/{memberCode}")
    public ResponseEntity<ResponseDTO> selectMemberDetail(@PathVariable int memberCode){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"회원 상세정보 조회 성공",adminAccountService.selectMember(memberCode)));
    }

    @Operation(summary = "회원 정지 상태 변경", description = "정지 여부를 Y와 N으로 전환합니다.", tags = {"AdminAccountController"})
    @PostMapping("/members/{memberCode}/toggle-suspension")
    public ResponseEntity<ResponseDTO> toggleMemberSuspension(@PathVariable int memberCode){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"정지 여부 변경 성공", adminAccountService.toggleMemberSuspension(memberCode)));
    }

    @Operation(summary = "회원 탈퇴 상태 변경", description = "탈퇴 여부를 Y와 N으로 전환합니다.", tags = {"AdminAccountController"})
    @PostMapping("/members/{memberCode}/toggle-deletion")
    public ResponseEntity<ResponseDTO> toggleMemberDelesion(@PathVariable int memberCode){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"탈퇴 여부 변경 성공", adminAccountService.toggleMemberDelesion(memberCode)));
    }



}
