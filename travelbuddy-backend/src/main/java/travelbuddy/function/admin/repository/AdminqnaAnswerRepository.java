package travelbuddy.function.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.qnafaq.dto.QnaAnswerDTO;
import travelbuddy.function.community.qnafaq.entity.QnaAnswer;

public interface AdminqnaAnswerRepository extends JpaRepository<QnaAnswer,Integer> {

}
