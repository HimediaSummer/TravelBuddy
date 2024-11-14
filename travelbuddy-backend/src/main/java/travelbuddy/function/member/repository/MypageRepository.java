package travelbuddy.function.member.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelbuddy.function.member.entity.MemberBuddyData;

import java.util.List;

public interface MypageRepository extends JpaRepository<MemberBuddyData, Integer> {

    @Query("SELECT m FROM MemberBuddyData m WHERE m.memberCode = ?1")
    List<MemberBuddyData> findByMemberCode(int memberCode);

    @Query("SELECT m FROM MemberBuddyData m WHERE m.memberCode = ?1")
    Page<MemberBuddyData> findByMemberCode(int memberCode, Pageable paging);
}
