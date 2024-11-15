package travelbuddy.function.schedule.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    // 필요한 추가 쿼리 메서드가 있다면 여기에 정의
    List<Schedule> findBySchedule(String status);

    Page<Schedule> findBySchedule(String status, Pageable paging);

    //    @Query("SELECT s FROM Schedule s")
    // List<Schedule> findAllSchedules();
//    @Query("SELECT s.scheCode, s.region.regionName, s.accommodation.accomName, s.account.memberName, s.memberAnswer.answerText, s.scheList, s.scheStartDate, s.scheEndDate, s.scheStartTime, s.scheEndTime, s.travelTime, s.scheTime " +
//            "FROM Schedule s " +
//            "JOIN s.region r " +
//            "JOIN s.accommodation a " +
//            "JOIN s.account m " +
//            "JOIN s.memberAnswer ma")
//    List<Object[]> findAllSchedules();
    @Query("SELECT new travelbuddy.function.schedule.dto.ScheduleDTO(s.scheCode, s.region.regionCode, s.accommodation.accomCode, s.account.memberCode, ma.memberAnswerCode, s.scheList, s.scheStartDate, s.scheEndDate, s.scheStartTime, s.scheEndTime, s.travelTime, s.scheTime) " +
            "FROM Schedule s " +
            "JOIN s.region r " +
            "JOIN s.accommodation a " +
            "JOIN s.account m " +
            "JOIN s.memberAnswer ma")
    List<Schedule> findAllSchedules();


} 