package travelbuddy.function.qestion.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tbl_questionnaire")
public class TblQuestionnaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quest_code", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "question")
    private String question;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "theme_code", nullable = false)
    private TblQuestionNaireTheme themeCode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public TblQuestionNaireTheme getThemeCode() {
        return themeCode;
    }

    public void setThemeCode(TblQuestionNaireTheme themeCode) {
        this.themeCode = themeCode;
    }

    public TblQuestionnaire() {
    }

    public TblQuestionnaire(Integer id, String question, TblQuestionNaireTheme themeCode) {
        this.id = id;
        this.question = question;
        this.themeCode = themeCode;
    }

    @Override
    public String toString() {
        return "TblQuestionnaire{" +
                "id=" + id +
                ", question='" + question + '\'' +
                ", themeCode=" + themeCode +
                '}';
    }
}