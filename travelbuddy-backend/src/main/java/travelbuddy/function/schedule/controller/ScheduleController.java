package travelbuddy.function.schedule.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.entity.MemberAnswer;
import travelbuddy.function.member.repository.AccountRepository;
import travelbuddy.function.member.repository.MemberAnswerRepository;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Accommodation;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.repository.AccommodationRepository;
import travelbuddy.function.schedule.repository.RegionRepository;
import travelbuddy.function.schedule.repository.ScheduleRepository;
import travelbuddy.function.schedule.service.ScheduleService;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }
    
    @GetMapping
    public List<Schedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @GetMapping("/hello")
    public String hello() {
        // return이 localhost:8080에다가 보내주는 데이터 
        // 스프링에서 8080으로 데이터를 쏴주고 리액트에서 캐치한다음 3000으로 보여주는거임 react의 App.js 확인
        return "일단 메인페이지 따란~";
    }

    @Operation(summary = "일정 생성", description = "사용자 정보 입력 받아 일정 생성", tags = { "ScheduleController" })
    @PostMapping("/scheduling")
    public ResponseEntity<ResponseDTO> scheduling(@RequestBody ScheduleDTO scheduleDTO) {

        System.out.println("[ScheduleController] 왓니?");

        System.out.println("머 갖고잇어" + scheduleDTO);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정 생성을 위한 데이터 수집 성공!", scheduleService.scheduling(scheduleDTO)));
    }

}
