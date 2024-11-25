package travelbuddy.function.member.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelbuddy.function.schedule.entity.Schedule;

import java.util.List;

public interface MyScheduleRepository extends JpaRepository<Schedule, Integer> {

    @Query("SELECT s, r.regionName " +
            "FROM Schedule s " +
            "JOIN s.region r " +
            "JOIN s.account a " +
            "WHERE a.memberCode = :memberCode")
    List<Object[]> findByMemberCode(int memberCode);

    @Modifying
    @Query("DELETE FROM Schedule s WHERE s.scheCode IN :scheCodes")
    void deleteByScheCode(@Param("scheCodes") List<Integer> scheCodes);

    @Query("SELECT s, r.regionName " +
            "FROM Schedule s " +
            "JOIN s.region r " +
            "JOIN s.account a " +
            "WHERE a.memberCode = :memberCode")
    Page<Object[]> findAllScheListPaging(@Param("memberCode") int memberCode, Pageable pageable);
}
