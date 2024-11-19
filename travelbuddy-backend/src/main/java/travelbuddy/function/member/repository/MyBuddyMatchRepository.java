package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelbuddy.function.community.buddy.entity.BuddyMatchData;

import java.util.List;
import java.util.Optional;

public interface MyBuddyMatchRepository extends JpaRepository<BuddyMatchData, Integer> {

    @Query("SELECT bmd FROM BuddyMatchData bmd WHERE bmd.buddy.buddyCode = :buddyCode")
    List<BuddyMatchData> findByBuddyCode(@Param("buddyCode")int buddyCode);

    @Query("SELECT bmd FROM BuddyMatchData bmd WHERE bmd.account.memberCode = :memberCode")
    Optional<BuddyMatchData> findByMemberCode(@Param("memberCode") int memberCode);

    @Query("SELECT b FROM BuddyMatchData b WHERE b.applyId = :applyId AND b.buddy.account.memberName = :memberName")
    Optional<BuddyMatchData> findByNameAndId(@Param("applyId") String applyId, @Param("memberName") String memberName);

    @Modifying
    @Query("DELETE FROM BuddyMatchData bmd WHERE bmd.applyId = :applyId AND bmd.buddy.account.memberName = :memberName")
    int deleteByNameAndId(@Param("applyId") String applyId, @Param("memberName") String memberName);

}
