package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.AuthorityEntity;

public interface AuthorityRepository extends JpaRepository<AuthorityEntity, Integer> {

    //권한을 조회하는 메서드
    AuthorityEntity findByAuthorityCode(int  authorityCode);
}