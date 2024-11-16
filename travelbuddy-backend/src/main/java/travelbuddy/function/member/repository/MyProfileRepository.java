package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelbuddy.function.member.entity.Account;

import java.util.List;

public interface MyProfileRepository extends JpaRepository<Account, Integer> {

    @Query("SELECT a FROM Account a WHERE a.memberCode = 1002")
    List<Account> findById();
}
