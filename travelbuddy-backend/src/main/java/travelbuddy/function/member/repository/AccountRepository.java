package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.Account;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByMemberCode(int memberCode);

    List<Account> findByMemberFullNameContaining(String search);
}
