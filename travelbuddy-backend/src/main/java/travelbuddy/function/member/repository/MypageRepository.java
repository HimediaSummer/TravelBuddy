package travelbuddy.function.member.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.member.entity.AccountEntity;
import travelbuddy.function.member.entity.MemberBuddyData;

import java.util.List;

public interface MypageRepository extends JpaRepository<Buddy, Integer> {

    List<MemberBuddyData> findByMemberCode(int account);

    Page<MemberBuddyData> findByMemberCode(int i, Pageable paging);
}
