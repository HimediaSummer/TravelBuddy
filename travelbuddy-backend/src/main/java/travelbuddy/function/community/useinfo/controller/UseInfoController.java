package travelbuddy.function.community.useinfo.controller;

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
import travelbuddy.function.community.useinfo.dto.UseinfoDTO;
import travelbuddy.function.community.useinfo.service.UseInfoService;

@RestController
@RequestMapping("/cs")
public class UseInfoController {

    private static final Logger log = LoggerFactory.getLogger(UseInfoController.class);
    private final UseInfoService useInfoService;

    @Autowired
    public UseInfoController(UseInfoService useInfoService) {
        this.useInfoService = useInfoService;
    }

    @Operation(summary = "회원 설명서 리스트 조회 요청", description = "회원 설명서 조회 및 페이징 처리가 진행됩니다.", tags={"UseInfoController"})
    @GetMapping("/useinfos")
    public ResponseEntity<ResponseDTO> selectUseInfoListWithPaging(
            @RequestParam(name="offset", defaultValue = "1") String offset) {

        log.info("[UseInfoController] selectUseInfoListWithPaging() start" + offset);

        int total = useInfoService.selectUseInfoTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(useInfoService.selectUseInfoListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 요청", pagingResponseDTO));
    }

    @Operation(summary = "회원 설명서 상세 조회 요청", description = "회원 설명서 상세 페이지 처리가 진행됩니다.", tags = {"UseInfoController"})
    @GetMapping("useinfos/{useinfoCode}")
    public ResponseEntity<ResponseDTO> selectUseInfoDetail(@PathVariable int useinfoCode){
        UseinfoDTO useinfoDTO = useInfoService.selectUseInfo(useinfoCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "설명서 상세정보 조회 요청" , useinfoDTO));
    }

}
