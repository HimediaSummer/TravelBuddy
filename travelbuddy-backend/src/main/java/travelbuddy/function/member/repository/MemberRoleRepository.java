package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.AccountEntity;
import travelbuddy.function.member.entity.AuthorityEntity;

public interface MemberRoleRepository extends JpaRepository<AccountEntity, AuthorityEntity> {
}
