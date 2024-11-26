package travelbuddy.function.schedule.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.entity.MemberAnswer;
import travelbuddy.function.member.repository.AccountRepository;
import travelbuddy.function.member.repository.MemberAnswerRepository;
import travelbuddy.function.schedule.dto.AccommodationDTO;
import travelbuddy.function.schedule.dto.AnswerDTO;
import travelbuddy.function.schedule.dto.QuestionNaireThemeDTO;
import travelbuddy.function.schedule.dto.QuestionnaireDTO;
import travelbuddy.function.schedule.dto.RegionDTO;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Accommodation;
import travelbuddy.function.schedule.entity.Answer;
import travelbuddy.function.schedule.entity.QuestionNaireTheme;
import travelbuddy.function.schedule.entity.Questionnaire;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.repository.AccommodationRepository;
import travelbuddy.function.schedule.repository.AnswerRepository;
import travelbuddy.function.schedule.repository.QuestionNaireThemeRepository;
import travelbuddy.function.schedule.repository.QuestionnaireRepository;
import travelbuddy.function.schedule.repository.RegionRepository;
import travelbuddy.function.schedule.repository.ScheduleRepository;

@Service
public class ScheduleService {

    private static final Logger log = LoggerFactory.getLogger(ScheduleService.class);

    private final ScheduleRepository scheduleRepository;
    private final RegionRepository regionRepository;
    private final AccommodationRepository accommodationRepository;
    private final AccountRepository accountRepository;
    private final MemberAnswerRepository memberAnswerRepository;
    private final ModelMapper modelMapper;
    private final QuestionnaireRepository questionnaireRepository;
    private final QuestionNaireThemeRepository questionNaireThemeRepository;
    private final AnswerRepository answerRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository, RegionRepository regionRepository, AccommodationRepository accommodationRepository, AccountRepository accountRepository, MemberAnswerRepository memberAnswerRepository, ModelMapper modelMapper, QuestionNaireThemeRepository questionNaireThemeRepository, QuestionnaireRepository questionnaireRepository, AnswerRepository answerRepository) {
        this.scheduleRepository = scheduleRepository;
        this.regionRepository = regionRepository;
        this.accommodationRepository = accommodationRepository;
        this.accountRepository = accountRepository;
        this.memberAnswerRepository = memberAnswerRepository;
        this.modelMapper = modelMapper;
        this.questionnaireRepository = questionnaireRepository;
        this.questionNaireThemeRepository = questionNaireThemeRepository;
        this.answerRepository = answerRepository;
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @Transactional
    public Object scheduling(ScheduleDTO scheduleDTO) {
        log.info("[ScheduleService] scheduling() Start");
        log.info("[ScheduleService] scheduleDTO : {}", scheduleDTO);
        log.info("Saving Schedule with accomCode: {}", scheduleDTO.getAccomCode());

        int result = 0;

        try {

            Schedule scheduling = modelMapper.map(scheduleDTO, Schedule.class);

            // regionCode 값을 실제 Region 엔티티로 변환
            Region region = regionRepository.findByRegionCode(scheduleDTO.getRegionCode());
            scheduling.setRegion(region);
            // memberCode 값을 실제 Accout 엔티티로 변환
            Account account = accountRepository.findByMemberCode(scheduleDTO.getMemberCode());
            scheduling.setAccount(account);
            // regionCode 값을 실제 Region 엔티티로 변환
            Accommodation accom = accommodationRepository.findByAccomCode(scheduleDTO.getAccomCode());
            scheduling.setAccommodation(accom);
            // regionCode 값을 실제 Region 엔티티로 변환
            MemberAnswer memberAnswer = memberAnswerRepository.findByMemberAnswerCode(scheduleDTO.getMemberAnswerCode());
            scheduling.setMemberAnswer(memberAnswer);

            scheduleRepository.save(scheduling);

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return (result > 0) ? "생성 일정 저장 성공" : "생성 일정 저장 실패";
    }

    public Map<String, Object> selectAllregion() {
        log.info("[ScheduleService] selectAllregion() start");
        System.out.println("[ScheduleService] 왓니?");

        // 장소
        List<Region> regions = regionRepository.findAll();
        List<RegionDTO> regionDTOS = regions.stream()
                                            .map(region -> modelMapper.map(region, RegionDTO.class))
                                            .collect(Collectors.toList());

        // 질문지 테마(카테고리)

        // 묶어
        Map<String, Object> responseDataRegion = new HashMap<>();
        responseDataRegion.put("regions", regionDTOS);

        log.info("[ScheduleService] selectAllregion() end");

        return responseDataRegion;
    }

    public Map<String, Object> selectAllaccom() {
        log.info("[ScheduleService] selectAllaccom() start");
        System.out.println("[ScheduleService] 왓니?");

        // 숙소
        List<Accommodation> accoms = accommodationRepository.findAll();
        List<AccommodationDTO> accomDTOS = accoms.stream()
                                                .map(accommodation -> modelMapper.map(accommodation, AccommodationDTO.class))
                                                .collect(Collectors.toList());

        // 질문지 테마(카테고리)

        // 묶어
        Map<String, Object> responseDataAccom = new HashMap<>();
        responseDataAccom.put("Accommodations", accomDTOS);

        log.info("[ScheduleService] selectAllaccom() end");

        return responseDataAccom;
    }

    public Map<String, Object> selectAllQuestionTheme() {
        log.info("[QuestionTheme] selectAllQuestionTheme() start");
        System.out.println("[QuestionTheme] 왓니?");

        // 질문지 테마
        List<QuestionNaireTheme> qThemes = questionNaireThemeRepository.findAll();
        List<QuestionNaireThemeDTO> qThemeDTOs = qThemes.stream()
                                                        .map(questionNaireTheme -> modelMapper.map(questionNaireTheme, QuestionNaireThemeDTO.class))
                                                        .collect(Collectors.toList());

        // 묶어
        Map<String, Object> responseDataQuestionTheme = new HashMap<>();
        responseDataQuestionTheme.put("qThemes", qThemeDTOs);

        log.info("[QuestionTheme] selectAllQuestionTheme() end");

        return responseDataQuestionTheme;
    }

    public Object selectRegionByCode(int regionCode) {

        log.info("[ScheduleService] selectRegionByCode() start");
        System.out.println("[ScheduleService] 왓니?");

        Region region = regionRepository.findById(regionCode).get();

        log.info("[ScheduleService] selectRegionByCode() end");

        return modelMapper.map(region, Region.class);
    }

    public Object selectAccomByCode(int accomCode) {

        log.info("[ScheduleService] selectAccomByCode() start");
        System.out.println("[ScheduleService] 왓니?");

        Accommodation accom = accommodationRepository.findById(accomCode).get();

        log.info("[ScheduleService] selectAccomByCode() end");

        return modelMapper.map(accom, Accommodation.class);
    }

//    @Transactional
//    public Object selectQuestionByThemeCode(int themeCode) {
//
//        log.info("[ScheduleService] selectQuestionByThemeCode() start");
//        System.out.println("[ScheduleService] 왓니?");
//
//        List<Questionnaire> question = questionnaireRepository.findByQuestionNaireTheme_ThemeCode(themeCode);
//
//        log.info("[ScheduleService] selectQuestionByThemeCode() end");
//
//        System.out.println("[ScheduleService] question = " + question);
//
//        return modelMapper.map(question, Questionnaire.class);
//    }

    @Transactional
    public Object selectQuestionByThemeCode(int themeCode) {

        log.info("[ScheduleService] selectQuestionByThemeCode() start");
        System.out.println("[QuestionByThemeCode] 왓니?");

        // themeCode로 조회한 질문지 리스트
        List<Questionnaire> questions = questionnaireRepository.findByQuestionNaireTheme_ThemeCode(themeCode);

        log.info("[QuestionByThemeCode] selectQuestionByThemeCode() end");

        System.out.println("[QuestionByThemeCode] questions = " + questions);
        log.info("[ScheduleService] Retrieved questions: " + questions);

        // DTO 변환
        List<QuestionnaireDTO> questionnaireDTOList = questions.stream().map(q -> {
            QuestionnaireDTO dto = new QuestionnaireDTO();
            dto.setQuestCode(q.getQuestCode());
            dto.setQuestion(q.getQuestion());
            // themeCode가 들어있는 questionNaireTheme이 null인지 확인
//            if (q.getQuestionNaireTheme() != null) {
                dto.setThemeCode(q.getQuestionNaireTheme().getThemeCode()); // themeCode 설정
//            }
            return dto;
        }).collect(Collectors.toList());

        log.info("[ScheduleService] Converted DTOs: " + questionnaireDTOList);  // 변환된 DTO 리스트 확인

        return questionnaireDTOList;  // 서비스에서 DTO 리스트 반환
    }

    @Transactional
    public Object selectAnswerByQuestCode(int questCode) {

        log.info("[ScheduleService] selectAnswerByQuestCode() start");
        System.out.println("[AnswerByQuestCode] 왓니?");

        // questCode로 조회한 답변 리스트
        List<Answer> answers = answerRepository.findByQuestionnaire_QuestCode(questCode);

        log.info("[ScheduleService] selectAnswerByQuestCode() end");

        System.out.println("[AnswerByQuestCode] answers = " + answers);
        log.info("[ScheduleService] answers:" + answers);

        // DTO 변환
        List<AnswerDTO> answerDTOList = answers.stream().map(a -> {
            AnswerDTO dto = new AnswerDTO();
            dto.setAnswerCode(a.getAnswerCode());
            dto.setAnswer(a.getAnswer());
            dto.setQuestCode(a.getQuestionnaire().getQuestCode());
            return dto;
        }).collect(Collectors.toList());

        log.info("[ScheduleService] Converted DTOs: " + answerDTOList);

        return answerDTOList;
    }

//    @Transactional
//    public Object saveSchedule(ScheduleDTO scheduleDTO) {
//
//        log.info("[ScheduleService] saveSchedule() start");
//        System.out.println("[saveSchedule] 왓니?");
//
//        // DB 저정
//        Schedule savedSchedule = modelMapper.map(scheduleDTO, Schedule.class);
//
//        scheduleRepository.save(savedSchedule);
//
//        log.info("[ScheduleService] saveSchedule() end");
//
//        return savedSchedule;
//    }

    @Transactional
    public Schedule saveSchedule(ScheduleDTO scheduleDTO) {
        // 각 엔티티 조회
        Region region = regionRepository.findById(scheduleDTO.getRegionCode())
                .orElseThrow(() -> new RuntimeException("Region not found"));
        Accommodation accommodation = accommodationRepository.findById(scheduleDTO.getAccomCode())
                .orElseThrow(() -> new RuntimeException("Accommodation not found"));
        Account account = accountRepository.findById(scheduleDTO.getMemberCode())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        MemberAnswer memberAnswer = memberAnswerRepository.findById(scheduleDTO.getMemberAnswerCode())
                .orElseThrow(() -> new RuntimeException("MemberAnswer not found"));

        // Schedule 엔티티 생성
        Schedule schedule = new Schedule();
        schedule.setRegion(region);
        schedule.setAccommodation(accommodation);
        schedule.setAccount(account);
        schedule.setMemberAnswer(memberAnswer);
        schedule.setScheList(scheduleDTO.getScheList());
        schedule.setScheStartDate(scheduleDTO.getScheStartDate());
        schedule.setScheEndDate(scheduleDTO.getScheEndDate());
        schedule.setScheStartTime(scheduleDTO.getScheStartTime());
        schedule.setScheEndTime(scheduleDTO.getScheEndTime());
        schedule.setTravelTime(scheduleDTO.getTravelTime());
        schedule.setScheTime(scheduleDTO.getScheTime());

        // DB에 저장
        return scheduleRepository.save(schedule);
    }
}