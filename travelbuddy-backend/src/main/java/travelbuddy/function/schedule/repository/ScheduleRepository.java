package travelbuddy.function.schedule.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import travelbuddy.function.schedule.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    // 필요한 추가 쿼리 메서드가 있다면 여기에 정의
    @Query("SELECT s FROM Schedule s")
    List<Schedule> findAllSchedules();
} 