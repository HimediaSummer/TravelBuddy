package travelbuddy.function.member.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import travelbuddy.function.member.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByMemberCode(int memberCode);

    List<Account> findByMemberFullNameContaining(String search);
    Account findByMemberName(String userIdString);
}
