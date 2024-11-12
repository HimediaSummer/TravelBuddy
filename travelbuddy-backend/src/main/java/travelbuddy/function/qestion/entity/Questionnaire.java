package travelbuddy.function.qestion.entity;

import jakarta.persistence.*;

@Entity
@Table(name="tbl_questionnaire")
public class Questionnaire {

    @Id
    @Column(name="quest_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questCode;

    @Column(name="question")
    private String question;

    @ManyToOne
    @JoinColumn(name="theme_code")
    private QuestionNaireTheme questionNaireTheme;

    public Questionnaire() {
    }

    public Questionnaire(int questCode, String question, QuestionNaireTheme questionNaireTheme) {
        this.questCode = questCode;
        this.question = question;
        this.questionNaireTheme = questionNaireTheme;
    }

    public int getQuestCode() {
        return questCode;
    }

    public void setQuestCode(int questCode) {
        this.questCode = questCode;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public QuestionNaireTheme getThemeCode() {
        return questionNaireTheme;
    }

    public void setThemeCode(QuestionNaireTheme themeCode) {
        this.questionNaireTheme = themeCode;
    }

    @Override
    public String toString() {
        return "QuestionnaireDTO{" +
                "questCode=" + questCode +
                ", question='" + question + '\'' +
                ", questionNaireTheme=" + questionNaireTheme +
                '}';
    }
}
