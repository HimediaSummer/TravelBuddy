package travelbuddy.function.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.schedule.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
}
