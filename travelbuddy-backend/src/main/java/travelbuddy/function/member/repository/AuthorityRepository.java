package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {

    //권한을 조회하는 메서드
    Authority findByAuthorityCode(int  authorityCode);
}