package travelbuddy.function.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelbuddy.function.community.qnafaq.entity.Qna;
import travelbuddy.function.community.qnafaq.entity.QnaAnswer;

import java.util.List;

public interface AdminQnaAnswerRepository extends JpaRepository<QnaAnswer,Integer> {

    QnaAnswer findByQna(Qna qna);

//    list 로 qnaCode 찾은거 다 찾아서 다 담아!
    @Query("SELECT qa FROM QnaAnswer qa WHERE qa.qna.qnaCode = :qnaCode")
    List<QnaAnswer> findByQnaCode(int qnaCode);
}
