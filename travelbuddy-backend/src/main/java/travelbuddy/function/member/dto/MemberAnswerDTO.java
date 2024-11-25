package travelbuddy.function.member.dto;


public class MemberAnswerDTO {

  private int memberAnswerCode;
  private int questCode;
  private int answerCode;

  public MemberAnswerDTO() {
  }

  public MemberAnswerDTO(int memberAnswerCode, int questCode, int answerCode) {
    this.memberAnswerCode = memberAnswerCode;
    this.questCode = questCode;
    this.answerCode = answerCode;
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

  @Override
  public String toString() {
    return "MemberAnswerDTO{" +
            "memberAnswerCode=" + memberAnswerCode +
            ", questCode=" + questCode +
            ", answerCode=" + answerCode +
            '}';
  }
}
