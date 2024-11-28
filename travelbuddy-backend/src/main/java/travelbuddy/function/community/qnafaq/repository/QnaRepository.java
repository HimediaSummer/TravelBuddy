package travelbuddy.function.community.qnafaq.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.qnafaq.entity.Qna;

public interface QnaRepository extends JpaRepository<Qna, Integer> {

    Page<Qna> findByAccount_MemberCode(int memberCode, Pageable pageable);

}
