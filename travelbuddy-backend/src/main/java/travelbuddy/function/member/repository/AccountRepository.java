package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByMemberCode(int memberCode);

    Account findByMemberName(String userIdString);
}
