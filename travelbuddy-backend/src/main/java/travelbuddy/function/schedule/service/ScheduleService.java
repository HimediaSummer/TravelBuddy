package travelbuddy.function.schedule.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.entity.MemberAnswer;
import travelbuddy.function.member.repository.AccountRepository;
import travelbuddy.function.member.repository.MemberAnswerRepository;
import travelbuddy.function.schedule.dto.AccommodationDTO;
import travelbuddy.function.schedule.dto.RegionDTO;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Accommodation;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.repository.AccommodationRepository;
import travelbuddy.function.schedule.repository.RegionRepository;
import travelbuddy.function.schedule.repository.ScheduleRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    private static final Logger log = LoggerFactory.getLogger(ScheduleService.class);

    private final ScheduleRepository scheduleRepository;
    private final RegionRepository regionRepository;
    private final AccommodationRepository accommodationRepository;
    private final AccountRepository accountRepository;
    private final MemberAnswerRepository memberAnswerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository, RegionRepository regionRepository, AccommodationRepository accommodationRepository, AccountRepository accountRepository, MemberAnswerRepository memberAnswerRepository, ModelMapper modelMapper) {
        this.scheduleRepository = scheduleRepository;
        this.regionRepository = regionRepository;
        this.accommodationRepository = accommodationRepository;
        this.accountRepository = accountRepository;
        this.memberAnswerRepository = memberAnswerRepository;
        this.modelMapper = modelMapper;
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

    public Map<String, Object> select() {

        log.info("[ScheduleService] select() start");
        System.out.println("[ScheduleService] 왓니?");

        // 장소
        List<Region> regions = regionRepository.findAll();
        List<RegionDTO> regionDTOS = regions.stream()
                                            .map(region -> modelMapper.map(region, RegionDTO.class))
                                            .collect(Collectors.toList());
        // 숙소
        List<Accommodation> accoms = accommodationRepository.findAll();
        List<AccommodationDTO> accomDTOS = accoms.stream()
                                                .map(accommodation -> modelMapper.map(accommodation, AccommodationDTO.class))
                                                .collect(Collectors.toList());

        // 질문지 테마(카테고리)


        // 묶어
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("regions", regionDTOS);
        responseData.put("Accommodations", accomDTOS);

        log.info("[ScheduleService] select() end");

        return responseData;
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
}
