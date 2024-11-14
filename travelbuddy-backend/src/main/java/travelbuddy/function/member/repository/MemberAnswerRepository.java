package travelbuddy.function.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.member.entity.MemberAnswer;
import travelbuddy.function.schedule.entity.Region;

public interface MemberAnswerRepository extends JpaRepository<MemberAnswer, Integer> {

    // memberAnswerCode로 MemberAnswer 조회
    MemberAnswer findByMemberAnswerCode(int memberAnswerCode);
}
