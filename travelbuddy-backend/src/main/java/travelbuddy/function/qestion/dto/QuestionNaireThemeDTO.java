package travelbuddy.function.qestion.dto;


public class QuestionNaireThemeDTO {

  private int themeCode;
  private String questionTheme;

  public QuestionNaireThemeDTO() {
  }

  public QuestionNaireThemeDTO(int themeCode, String questionTheme) {
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



