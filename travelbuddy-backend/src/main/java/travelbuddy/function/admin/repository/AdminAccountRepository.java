package travelbuddy.function.admin.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.AccountEntity;

import java.util.List;

public interface AdminAccountRepository extends JpaRepository<AccountEntity,Integer> {


    List<AccountEntity> findBymemberDeletion(String status);

    Page<AccountEntity> findBymemberDeletion(String status, Pageable paging);

}
