package travelbuddy.function.qestion.dto;


public class AnswerDTO {

  private int answerCode;
  private String answer;
  private int questCode;

  public AnswerDTO() {
  }

  public AnswerDTO(int answerCode, String answer, int questCode) {
    this.answerCode = answerCode;
    this.answer = answer;
    this.questCode = questCode;
  }

  public int getAnswerCode() {
    return answerCode;
  }

  public void setAnswerCode(int answerCode) {
    this.answerCode = answerCode;
  }


  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
  }


  public long getQuestCode() {
    return questCode;
  }

  public void setQuestCode(int questCode) {
    this.questCode = questCode;
  }

  @Override
  public String toString() {
    return "AnswerDTO{" +
            "answerCode=" + answerCode +
            ", answer='" + answer + '\'' +
            ", questCode=" + questCode +
            '}';
  }
}
