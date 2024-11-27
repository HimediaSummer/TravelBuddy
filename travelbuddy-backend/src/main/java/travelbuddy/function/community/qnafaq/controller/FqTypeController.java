package travelbuddy.function.community.qnafaq.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.community.qnafaq.service.FqTypeService;

@RestController
@RequestMapping("/fqtype")
public class FqTypeController {

    private static final Logger log = LoggerFactory.getLogger(FqTypeController.class);

    private final FqTypeService fqTypeService;

    @Autowired
    public FqTypeController(FqTypeService fqTypeService) {
        this.fqTypeService = fqTypeService;
    }

    @Operation(summary = "FqType 이름 요청", description = "FqType 정보를 처리합니다.", tags={"FqTypeController"})
    @GetMapping("/getname")
    public ResponseEntity<ResponseDTO> getFqTypeName() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK,"FqType 이름 요청", fqTypeService.getFqTypeName()));

    }

}
