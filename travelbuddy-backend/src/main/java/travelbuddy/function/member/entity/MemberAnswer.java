package travelbuddy.function.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_member_answer")
public class MemberAnswer {

  @Id
  @Column(name="member_answer_code")
  private int memberAnswerCode;

  @Column(name="quest_code")
  private int questCode;

  @Column(name="answer_code")
  private int answerCode;

  @Column(name="member_code")
  private int memberCode;

  public MemberAnswer() {
  }

  public MemberAnswer(int memberAnswerCode, int questCode, int answerCode, int memberCode) {
    this.memberAnswerCode = memberAnswerCode;
    this.questCode = questCode;
    this.answerCode = answerCode;
    this.memberCode = memberCode;
  }

  public int getMemberAnswerCode() {
    return memberAnswerCode;
  }

  public void setMemberAnswerCode(int memberAnswerCode) {
    this.memberAnswerCode = memberAnswerCode;
  }


  public int getQuestCode() {
    return questCode;
  }

  public void setQuestCode(int questCode) {
    this.questCode = questCode;
  }


  public int getAnswerCode() {
    return answerCode;
  }

  public void setAnswerCode(int answerCode) {
    this.answerCode = answerCode;
  }


  public int getMemberCode() {
    return memberCode;
  }

  public void setMemberCode(int memberCode) {
    this.memberCode = memberCode;
  }

  @Override
  public String toString() {
    return "MemberAnswerDTO{" +
            "memberAnswerCode=" + memberAnswerCode +
            ", questCode=" + questCode +
            ", answerCode=" + answerCode +
            ", memberCode=" + memberCode +
            '}';
  }
}
