package travelbuddy.function.admin.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.qnafaq.entity.Qna;

public interface AdminQnaRepository extends JpaRepository<Qna,Integer> {

    Page<Qna> findAll(Pageable paging);

}
