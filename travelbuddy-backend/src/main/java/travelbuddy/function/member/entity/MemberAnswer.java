package travelbuddy.function.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import travelbuddy.function.qestion.entity.Answer;
import travelbuddy.function.qestion.entity.Questionnaire;

@Entity
@Table(name="tbl_member_answer")
public class MemberAnswer {

  @Id
  @Column(name="member_answer_code")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int memberAnswerCode;

  @ManyToOne
  @JoinColumn(name="quest_code")
  private Questionnaire questionnaire;

  @ManyToOne
  @JoinColumn(name="answer_code")
  private Answer answer;

  public MemberAnswer() {
  }

  public MemberAnswer(int memberAnswerCode, Questionnaire questionnaire, Answer answer) {
    this.memberAnswerCode = memberAnswerCode;
    this.questionnaire = questionnaire;
    this.answer = answer;
  }

  public int getMemberAnswerCode() {
    return memberAnswerCode;
  }

  public void setMemberAnswerCode(int memberAnswerCode) {
    this.memberAnswerCode = memberAnswerCode;
  }

  public Questionnaire getQuestionnaire() {
    return questionnaire;
  }

  public void setQuestionnaire(Questionnaire questionnaire) {
    this.questionnaire = questionnaire;
  }

  public Answer getAnswer() {
    return answer;
  }

  public void setAnswer(Answer answer) {
    this.answer = answer;
  }

  @Override
  public String toString() {
    return "MemberAnswer{" +
            "memberAnswerCode=" + memberAnswerCode +
            ", questionnaire=" + questionnaire +
            ", answer=" + answer +
            '}';
  }
}
