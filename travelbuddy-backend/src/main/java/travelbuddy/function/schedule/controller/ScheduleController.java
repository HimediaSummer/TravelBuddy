package travelbuddy.function.schedule.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.service.ScheduleService;

import java.util.Map;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }
    
//    @GetMapping
//    public List<Schedule> getAllSchedules() {
//        return scheduleService.getAllSchedules();
//    }

    @GetMapping("/hello")
    public String hello() {
        // return이 localhost:8080에다가 보내주는 데이터 
        // 스프링에서 8080으로 데이터를 쏴주고 리액트에서 캐치한다음 3000으로 보여주는거임 react의 App.js 확인
        return "일단 메인페이지 따란~";
    }

    @Operation(summary = "전체 조회", description = "사용자가 선택할 수 있는 정보가 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping()
//    @GetMapping("/schedule")
    public ResponseEntity<ResponseDTO> select() {

        System.out.println("[ScheduleController] 왓니?");

        Map<String, Object> responseData = scheduleService.select();

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", responseData));
    }

    @Operation(summary = "지역 상세 조회", description = "사용자가 선택할 수 있는 지역이 상세 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/region/{regionCode}")
    public ResponseEntity<ResponseDTO> selectRegionByCode(@PathVariable int regionCode) {

        System.out.println("[ScheduleController] 왓니?");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 조회 성공", scheduleService.selectRegionByCode(regionCode)));
    }

    @Operation(summary = "숙소 상세 조회", description = "사용자가 선택할 수 있는 지역이 상세 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/accom/{accomCode}")
    public ResponseEntity<ResponseDTO> selectAccomByCode(@PathVariable int accomCode) {

        System.out.println("[ScheduleController] 왓니?");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 조회 성공", scheduleService.selectAccomByCode(accomCode)));
    }

    @Operation(summary = "질문지 상세 조회", description = "사용자가 선택할 수 있는 질문지가 상세 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/question/{themeCode}")
    public ResponseEntity<ResponseDTO> selectQuestionByThemeCode(@PathVariable int themeCode) {

        System.out.println("[ScheduleController] 왓니?");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 조회 성공", scheduleService.selectQuestionByThemeCode(themeCode)));
    }

    @Operation(summary = "일정 생성", description = "사용자 정보 입력 받아 일정 생성", tags = { "ScheduleController" })
    @PostMapping("/scheduling")
    public ResponseEntity<ResponseDTO> scheduling(@RequestBody ScheduleDTO scheduleDTO) {

        System.out.println("[ScheduleController] 왓니?");

        System.out.println("머 갖고잇어" + scheduleDTO);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정 생성을 위한 데이터 수집 성공!", scheduleService.scheduling(scheduleDTO)));
    }

}
