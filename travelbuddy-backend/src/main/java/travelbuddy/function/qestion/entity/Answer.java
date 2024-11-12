package travelbuddy.function.qestion.entity;

import jakarta.persistence.*;

@Entity
@Table(name="tbl_answer")
public class Answer {

  @Id
  @Column(name ="answer_code")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int answerCode;

  @Column(name="answer")
  private String answer;

  @ManyToOne
  @JoinColumn(name="quest_code")
  private Questionnaire questionnaire;

  public Answer() {
  }

  public Answer(int answerCode, String answer, Questionnaire questionnaire) {
    this.answerCode = answerCode;
    this.answer = answer;
    this.questionnaire = questionnaire;
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


  public Questionnaire getQuestCode() {
    return questionnaire;
  }

  public void setQuestCode(Questionnaire questCode) {
    this.questionnaire = questCode;
  }

  @Override
  public String toString() {
    return "AnswerDTO{" +
            "answerCode=" + answerCode +
            ", answer='" + answer + '\'' +
            ", questionnaire=" + questionnaire +
            '}';
  }
}
