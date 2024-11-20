package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.member.entity.Account;

import java.util.List;
import java.util.Optional;

public interface MyBuddyRepository extends JpaRepository<Buddy, Integer> {

    @Query("SELECT b, r.regionName, t.buddyTypeName, a.memberName " +
            "FROM Buddy b " +
            "JOIN b.region r " +
            "JOIN b.buddyType t " +
            "JOIN b.account a " +
            "WHERE a.memberCode = :memberCode")
    List<Object[]> findAllByAccount(int memberCode);

    Optional<Object> findByBuddyCode(int buddyCode);
}
