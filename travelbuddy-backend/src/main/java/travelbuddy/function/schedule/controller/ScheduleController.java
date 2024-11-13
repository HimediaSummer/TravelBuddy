package travelbuddy.function.schedule.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @GetMapping("/hello")
    public String hello() {
        // return이 localhost:8080에다가 보내주는 데이터 
        // 스프링에서 8080으로 데이터를 쏴주고 리액트에서 캐치한다음 3000으로 보여주는거임 react의 App.js 확인
        return "흠... (카멘톤으로)";
    }

}
