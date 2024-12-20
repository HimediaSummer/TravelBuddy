package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.member.entity.Account;

import java.util.List;
import java.util.Optional;

public interface MyProfileRepository extends JpaRepository<Account, Integer> {

    @Query("SELECT a FROM Account a WHERE a.memberCode = :memberCode")
    List<Account> findByLoginMemberCode(@Param("memberCode") Integer memberCode);

    @Query("SELECT a FROM Account a WHERE a.memberCode = :memberCode")
    Optional<Account> findByMemberCodeUpdate(@Param("memberCode") Integer memberCode);

    @Query("SELECT a FROM Account a WHERE a.memberCode = :memberCode")
    Optional<Object> findByMemberCode(@Param("memberCode") Integer memberCode);
}
