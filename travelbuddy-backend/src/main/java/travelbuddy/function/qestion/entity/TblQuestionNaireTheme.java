package travelbuddy.function.qestion.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tbl_question_naire_theme")
public class TblQuestionNaireTheme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theme_code", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "question_theme")
    private String questionTheme;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestionTheme() {
        return questionTheme;
    }

    public void setQuestionTheme(String questionTheme) {
        this.questionTheme = questionTheme;
    }

    public TblQuestionNaireTheme() {
    }

    public TblQuestionNaireTheme(Integer id, String questionTheme) {
        this.id = id;
        this.questionTheme = questionTheme;
    }

    @Override
    public String toString() {
        return "TblQuestionNaireTheme{" +
                "id=" + id +
                ", questionTheme='" + questionTheme + '\'' +
                '}';
    }
}