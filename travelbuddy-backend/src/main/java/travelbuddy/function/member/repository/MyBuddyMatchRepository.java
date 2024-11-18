package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelbuddy.function.community.buddy.entity.BuddyMatchData;

import java.util.List;

public interface MyBuddyMatchRepository extends JpaRepository<BuddyMatchData, Integer> {

    @Query("SELECT bmd FROM BuddyMatchData bmd WHERE bmd.buddy.buddyCode = :buddyCode")
    List<BuddyMatchData> findByBuddyCode(@Param("buddyCode")int buddyCode);
}
