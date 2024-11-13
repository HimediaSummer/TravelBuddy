package travelbuddy.function.member.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelbuddy.function.member.entity.AccountEntity;

public interface MemberRepository extends JpaRepository<AccountEntity, Integer> {

    AccountEntity findByMemberName(String memberName);
    AccountEntity findByMemberEmail(String memberEmail);

    /* 설명. JPQL과 @Query를 활용한 구문 */
    @Query("SELECT MAX(m.memberCode) FROM AccountEntity m")    // 설명. JPQL에서 엔티티 이름은 대소문자까지 완벽히 일치할 것!
    int maxMemberCode();

    /* 설명. purchase 도메인 추가하면서 추가한 메소드 */
    @Query("SELECT m.memberCode FROM AccountEntity m WHERE m.memberName = ?1")
    int findMemberCodeByMemberName(String orderMemberId);


}
