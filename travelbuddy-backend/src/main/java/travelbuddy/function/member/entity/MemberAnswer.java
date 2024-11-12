package travelbuddy.function.member.entity;

import jakarta.persistence.*;
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

  @ManyToOne
  @JoinColumn(name="member_code")
  private AccountEntity Account;

  public MemberAnswer() {
  }

  public MemberAnswer(AccountEntity account, Answer answer, int memberAnswerCode, Questionnaire questionnaire) {
    Account = account;
    this.answer = answer;
    this.memberAnswerCode = memberAnswerCode;
    this.questionnaire = questionnaire;
  }

  public AccountEntity getAccount() {
    return Account;
  }

  public void setAccount(AccountEntity account) {
    Account = account;
  }

  public Answer getAnswer() {
    return answer;
  }

  public void setAnswer(Answer answer) {
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

  @Override
  public String toString() {
    return "MemberAnswer{" +
            "Account=" + Account +
            ", memberAnswerCode=" + memberAnswerCode +
            ", questionnaire=" + questionnaire +
            ", answer=" + answer +
            '}';
  }
}
