package travelbuddy.function.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.schedule.entity.Questionnaire;

import java.util.List;

public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Integer> {
    List<Questionnaire> findByQuestionNaireTheme_ThemeCode(int themeCode);
}
