package travelbuddy.function.community.buddy.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import travelbuddy.common.Criteria;
import travelbuddy.common.PageDTO;
import travelbuddy.common.PagingResponseDTO;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.buddy.service.BuddyService;

@RestController
@RequestMapping("/api/v1")
public class BuddyController {

    private static final Logger log = LoggerFactory.getLogger(BuddyController.class);

    private final BuddyService buddyService;

    @Autowired
    public BuddyController(BuddyService buddyService) {
        this.buddyService = buddyService;
    }

    @Operation(summary = "버디글 리스트 조회 요청", description = "버디글 조회 및 페이징 처리가 진행됩니다.", tags = {"BuddyController"})
    @GetMapping("/buddies")
    public ResponseEntity<ResponseDTO> selectBuddyListWithPaging(
            @RequestParam(name = "offset", defaultValue = "1") String offset) {

        log.info("[BuddyController] selectBuddyListWithPaging : " + offset);

        int total = buddyService.selectBuddyTotal();

        /* 한 페이지에 나올 갯수*/
        Criteria criteria = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(buddyService.selectBuddyListWithPaging(criteria));

        pagingResponseDTO.setPageInfo(new PageDTO(criteria, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
    }


}
