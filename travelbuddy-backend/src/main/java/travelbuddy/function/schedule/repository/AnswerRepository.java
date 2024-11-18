package travelbuddy.function.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.schedule.entity.Answer;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findByQuestionnaire_QuestCode(int questCode);
}
