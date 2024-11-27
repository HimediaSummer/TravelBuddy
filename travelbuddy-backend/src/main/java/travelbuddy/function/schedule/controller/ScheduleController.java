package travelbuddy.function.schedule.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.AccountRepository;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.service.ScheduleService;
import travelbuddy.jwt.TokenProvider;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final TokenProvider tokenProvider;
    private  final AccountRepository accountRepository;

    @Autowired
    public ScheduleController(ScheduleService scheduleService, TokenProvider tokenProvider, AccountRepository accountRepository) {
        this.scheduleService = scheduleService;
        this.tokenProvider = tokenProvider;
        this.accountRepository = accountRepository;
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

//    @Operation(summary = "전체 조회", description = "사용자가 선택할 수 있는 정보가 조회됩니다.", tags = { "ScheduleController" })
//    @GetMapping()
////    @GetMapping("/schedule")
//    public ResponseEntity<ResponseDTO> select() {
//
//        System.out.println("[ScheduleController] 왓니?");
//
//        Map<String, Object> responseData = scheduleService.select();
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", responseData));
//    }

    @Operation(summary = "지역 전체 조회", description = "사용자가 선택할 수 있는 모든지역이 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/region")
    public ResponseEntity<ResponseDTO> selectAllregion() {
        Map<String, Object> responseDataRegion = scheduleService.selectAllregion();
        System.out.println("[ScheduleController] 왓니?");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 조회 성공", responseDataRegion));
    }

    @Operation(summary = "지역 상세 조회", description = "사용자가 선택할 수 있는 지역이 상세 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/region/{regionCode}")
    public ResponseEntity<ResponseDTO> selectRegionByCode(@PathVariable int regionCode) {

        System.out.println("[ScheduleController] 왓니?");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 조회 성공", scheduleService.selectRegionByCode(regionCode)));
    }

    @Operation(summary = "숙소 전체 조회", description = "모든 지역과 숙소 정보를 조회합니다.", tags = { "ScheduleController" })
    @GetMapping("/accom")
    public ResponseEntity<ResponseDTO> selectAllaccom() {
        Map<String, Object> responseDataAccom = scheduleService.selectAllaccom();
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "모든 숙소 조회 성공", responseDataAccom));
    }

    @Operation(summary = "숙소 상세 조회", description = "사용자가 선택할 수 있는 지역이 상세 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/accom/{accomCode}")
    public ResponseEntity<ResponseDTO> selectAccomByCode(@PathVariable int accomCode) {

        System.out.println("[ScheduleController] 왓니?");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 조회 성공", scheduleService.selectAccomByCode(accomCode)));
    }

    @Operation(summary = "질문지 테마 조회", description = "질문지의 모든 테마가 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/question")
    public ResponseEntity<ResponseDTO> selectAllQuestionTheme() {
        Map<String, Object> responseDataQuestionTheme = scheduleService.selectAllQuestionTheme();
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "질문지 테마 조회 성공", responseDataQuestionTheme));
    }

    @Operation(summary = "질문지 상세 조회", description = "사용자가 선택할 수 있는 질문지가 상세 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/question/{themeCode}")
    public ResponseEntity<ResponseDTO> selectQuestionByThemeCode(@PathVariable int themeCode) {

        System.out.println("[ScheduleController] 왓니?");
        System.out.println("[ScheduleController] themeCode = " + themeCode);

        Object responseData = scheduleService.selectQuestionByThemeCode(themeCode);
        System.out.println("[ScheduleController] responseData = " + responseData);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "질문지 상세 조회 성공", responseData));
    }

    @Operation(summary = "답변 상세 조회", description = "사용자가 선택할 수 있는 답변이 상세 조회됩니다.", tags = { "ScheduleController" })
    @GetMapping("/answer/{questCode}")
    public ResponseEntity<ResponseDTO> selectAnswerByQuestCode(@PathVariable int questCode) {

        System.out.println("[ScheduleController] 왓니?");
        System.out.println("[ScheduleController] questCode = " + questCode);

        Object responseData = scheduleService.selectAnswerByQuestCode(questCode);
        System.out.println("[ScheduleController] responseData = " + responseData);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "답변 상세 조회 성공", responseData));
    }

//    @Operation(summary = "일정 저장", description = "생성된 일정 저장", tags = { "ScheduleController" })
//    @PostMapping("/save")
//    public ResponseEntity<ResponseDTO> saveSchedule(@RequestBody ScheduleDTO scheduleDTO,
//                                                    @RequestHeader("Authorization") String token) {
//
//        System.out.println("[ScheduleController] 왓니?");
//        System.out.println("머 갖고잇어" + scheduleDTO);
//
//        // 토큰에서 사용자 ID (username 또는 userId) 추출
//        String actualToken = token.substring(7);    // "Bearer" 제거
//        String userIdString = tokenProvider.getUserId(actualToken); // 사용자 ID (예: username) 가져오기
//
//        // userIdString (username)을 사용하여 Account 테이블에서 사용자 정보를 조회
//        Account userAccount = accountRepository.findByMemberName(userIdString); // username으로 사용자 조회 (username은 userIdString에 해당)
//        if (userAccount == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseDTO(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다.", null));
//        }
//
//        // 조회된 userAccount의 기본키인 user_id를 사용하여 scheduleDTO에 설정
//        scheduleDTO.setMemberCode(userAccount.getMemberCode());  // user_id (기본키) 정보 설정
//
//        // 일정 저장
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정 저장 성공!", scheduleService.saveSchedule(scheduleDTO)));
//    }

    @Operation(summary = "일정 저장", description = "생성된 일정 저장", tags = { "ScheduleController" })
    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveSchedule(@RequestBody ScheduleDTO scheduleDTO,
                                                    @RequestHeader("Authorization") String token) {
        // 토큰에서 사용자 ID 추출 및 사용자 정보 조회
        String actualToken = token.substring(7); // "Bearer" 제거
        String userIdString = tokenProvider.getUserId(actualToken); // 사용자 ID 가져오기

        // 일정 저장 서비스 호출
        Schedule savedSchedule =  scheduleService.saveSchedule(scheduleDTO, userIdString);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "일정 저장 성공!", savedSchedule));
    }

}
