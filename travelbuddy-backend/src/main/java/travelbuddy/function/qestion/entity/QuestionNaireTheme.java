package travelbuddy.function.qestion.entity;

import jakarta.persistence.*;

@Entity
@Table(name="tbl_question_naire_theme")
public class QuestionNaireTheme {

  @Id
  @Column(name="theme_code")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int themeCode;

  @Column(name="question_theme")
  private String questionTheme;

  public QuestionNaireTheme() {
  }

  public QuestionNaireTheme(int themeCode, String questionTheme) {
    this.themeCode = themeCode;
    this.questionTheme = questionTheme;
  }

  public long getThemeCode() {
    return themeCode;
  }

  public void setThemeCode(int themeCode) {
    this.themeCode = themeCode;
  }


  public String getQuestionTheme() {
    return questionTheme;
  }

  public void setQuestionTheme(String questionTheme) {
    this.questionTheme = questionTheme;
  }

  @Override
  public String toString() {
    return "QuestionNaireThemeDTO{" +
            "themeCode=" + themeCode +
            ", questionTheme='" + questionTheme + '\'' +
            '}';
  }
}



