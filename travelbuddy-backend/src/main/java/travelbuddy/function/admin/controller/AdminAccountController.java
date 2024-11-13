package travelbuddy.function.admin.controller;

import travelbuddy.common.Criteria;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.admin.service.AdminAccountService;

@RestController
@RequestMapping("/admin")
public class AdminAccountController {

    private static final Logger log = LoggerFactory.getLogger(AdminAccountController.class);

    private final AdminAccountService adminAccountService;

    @Autowired
    public AdminAccountController(AdminAccountService adminAccountService) {
        this.adminAccountService = adminAccountService;
    }

    @Operation(summary = "전체 회원 리스트 조회 요청", description = "전체 회원 조회 및 페이징 처리가 진행됩니다.", tags = {"AdminAccountController"})
    public ResponseEntity<ResponseDTO> selectMemberListWithPaging(@RequestParam(name = "offset", defaultValue = "1") String offset) {
        log.info("[AdminAccountController] selectMemberListWithPaging : " + offset);

        int total = AdminAccountService.selectAccountTotal();   // 요거 TODO

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        return null;
    }

}
