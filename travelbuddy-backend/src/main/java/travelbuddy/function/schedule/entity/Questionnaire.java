package travelbuddy.function.schedule.entity;

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

    @ManyToOne(fetch = FetchType.EAGER)
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

    public QuestionNaireTheme getQuestionNaireTheme() {
        return questionNaireTheme;
    }

    public void setQuestionNaireTheme(QuestionNaireTheme questionNaireTheme) {
        this.questionNaireTheme = questionNaireTheme;
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
