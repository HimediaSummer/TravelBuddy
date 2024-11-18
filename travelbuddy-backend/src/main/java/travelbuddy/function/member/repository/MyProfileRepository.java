package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelbuddy.function.member.entity.Account;

import java.util.List;
import java.util.Optional;

public interface MyProfileRepository extends JpaRepository<Account, Integer> {

    @Query("SELECT a FROM Account a WHERE a.memberCode = 1004")
    List<Account> findById();

    @Query("SELECT a FROM Account a WHERE a.memberCode = 1004")
    Optional<Account> findByMemberCodeUpdate(int memberCode);

//    @Query("UPDATE Account a SET a.memberLeave = 'Y' WHERE a.memberCode = :memberCode")
//    List<Account> saveMemberLeave(@Param("memberCode") int memberCode);
}
