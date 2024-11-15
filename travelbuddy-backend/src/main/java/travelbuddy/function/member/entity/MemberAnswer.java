package travelbuddy.function.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import travelbuddy.function.schedule.entity.Answer;
import travelbuddy.function.schedule.entity.Questionnaire;

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


  @ManyToOne
  @JoinColumn(name="member_code")
  private Account Account;

  public MemberAnswer() {
  }

  public MemberAnswer(Account account, Answer answer, int memberAnswerCode, Questionnaire questionnaire) {
    Account = account;
    this.answer = answer;
    this.memberAnswerCode = memberAnswerCode;
    this.questionnaire = questionnaire;
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

  public travelbuddy.function.member.entity.Account getAccount() {
    return Account;
  }

  public void setAccount(travelbuddy.function.member.entity.Account account) {
    Account = account;
  }

  @Override
  public String toString() {
    return "MemberAnswer{" +
            "memberAnswerCode=" + memberAnswerCode +
            ", questionnaire=" + questionnaire +
            ", answer=" + answer +
            ", Account=" + Account +
            '}';
  }
}
