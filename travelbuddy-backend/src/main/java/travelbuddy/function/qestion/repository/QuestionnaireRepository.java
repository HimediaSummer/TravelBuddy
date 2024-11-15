package travelbuddy.function.qestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.qestion.entity.Questionnaire;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Integer> {
    List<Questionnaire> findQuestionNaireTheme_ThemeCode(int themeCode);
}
