package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByMemberCode(int memberCode);

    Account findByMemberName(String memberName);
}
