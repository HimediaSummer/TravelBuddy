package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelbuddy.function.community.buddy.entity.Buddy;


import java.util.List;

public interface MyBuddyRepository extends JpaRepository<Buddy, Integer> {

    @Query("SELECT b FROM Buddy b WHERE b.account.memberCode = 1002")
    List<Buddy> findByMemberCode();
}
