package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelbuddy.function.schedule.entity.Schedule;

import java.util.List;

public interface MyScheduleRepository extends JpaRepository<Schedule, Integer> {

    @Query("SELECT s FROM Schedule s WHERE s.account.memberCode = :memberCode")
    List<Schedule> findByMemberCode(int memberCode);
}
