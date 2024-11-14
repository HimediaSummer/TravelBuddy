package travelbuddy.function.admin.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.Account;

import java.util.List;

public interface AdminAccountRepository extends JpaRepository<Account,Integer> {


    List<Account> findBymemberDeletion(String status);

    Page<Account> findBymemberDeletion(String status, Pageable paging);

}
