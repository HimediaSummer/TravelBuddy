package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT b FROM Buddy b " +
            "JOIN FETCH b.region " +
            "JOIN FETCH b.account " +
            "JOIN FETCH b.buddyType " +
            "WHERE b.buddyCode = :buddyCode")
    Buddy findByBuddyCode(@Param("buddyCode") int buddyCode);

    @Modifying
    @Query("DELETE FROM Buddy b WHERE b.buddyCode IN :buddyCodes")
    void deleteByBuddyCode(@Param("buddyCodes") List<Integer> buddyCodes);
}
