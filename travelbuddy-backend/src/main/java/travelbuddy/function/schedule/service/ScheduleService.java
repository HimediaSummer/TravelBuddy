package travelbuddy.function.schedule.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelbuddy.function.member.repository.AccountRepository;
import travelbuddy.function.member.repository.MemberAnswerRepository;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.repository.AccommodationRepository;
import travelbuddy.function.schedule.repository.RegionRepository;
import travelbuddy.function.schedule.repository.ScheduleRepository;

import java.util.List;

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

    public Object scheduling(ScheduleDTO scheduleDTO) {
        log.info("[ScheduleService] scheduling() Start");
        log.info("[ScheduleService] scheduleDTO : {}", scheduleDTO);
        log.info("Saving Schedule with accomCode: {}", scheduleDTO.getAccomCode());

        int result = 0;

        try {
            Schedule scheduling = modelMapper.map(scheduleDTO, Schedule.class);

            scheduleRepository.save(scheduling);

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return (result > 0) ? "생성 일정 저장 성공" : "생성 일정 저장 실패";
    }
}
