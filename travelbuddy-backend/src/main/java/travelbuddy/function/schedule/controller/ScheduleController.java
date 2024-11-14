package travelbuddy.function.schedule.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.member.entity.MemberAnswer;
import travelbuddy.function.member.repository.MemberAnswerRepository;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.repository.RegionRepository;
import travelbuddy.function.schedule.repository.ScheduleRepository;
import travelbuddy.function.schedule.service.ScheduleService;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    private final ScheduleRepository scheduleRepository;

    private final RegionRepository regionRepository;

    private final MemberAnswerRepository memberAnswerRepository;

    @Autowired
    public ScheduleController(ScheduleService scheduleService, ScheduleRepository scheduleRepository, RegionRepository regionRepository, MemberAnswerRepository memberAnswerRepository) {
        this.scheduleService = scheduleService;
        this.scheduleRepository = scheduleRepository;
        this.regionRepository = regionRepository;
        this.memberAnswerRepository = memberAnswerRepository;
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

        // 코드로 지역 찾기
        Region region = regionRepository.findByRegionCode(scheduleDTO.getRegionCode());

        if(region == null) {
            return ResponseEntity.badRequest().body(new ResponseDTO(HttpStatus.BAD_REQUEST, "region not found for code", null));
        }

        // 코드로 회원대답 찾기
        MemberAnswer memberAnswer = memberAnswerRepository.findByMemberAnswerCode(scheduleDTO.getMemberAnswerCode());

        if(memberAnswer == null) {
            return ResponseEntity.badRequest().body(new ResponseDTO(HttpStatus.BAD_REQUEST, "memberAnswer not found for code", null));
        }

        // 새로운 스케줄 엔티티 생성
        Schedule newSche = new Schedule();
        newSche.setScheStartDate(scheduleDTO.getScheStartDate());
        System.out.println("ScheStartDate = " + newSche.getScheStartDate());
        newSche.setScheEndDate(scheduleDTO.getScheEndDate());
        System.out.println("ScheEndDate = " + newSche.getScheEndDate());
        newSche.setRegion(region);
        System.out.println("Region = " + newSche.getRegion());
        newSche.setMemberAnswer(memberAnswer);
        System.out.println("MemberAnswer = " + newSche.getMemberAnswer());

        // 스케줄생성 AI 호출바리

        // 최종 DB 저장

        // 성공 응답 반환
        return null;
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정 생성을 위한 데이터 수집 성공!",));
    }

}
