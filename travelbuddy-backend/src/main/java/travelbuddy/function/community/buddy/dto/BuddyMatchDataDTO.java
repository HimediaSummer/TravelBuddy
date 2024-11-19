package travelbuddy.function.community.buddy.dto;

public class BuddyMatchDataDTO {

  private int buddyMatchCode;   // 버디매칭코드
  private int buddyCode;        // 버디코드
  private int memberCode;       // 회원코드
  private String applyId;       // 신청자 아이디
  private int applyStatus;      // 신청상태

  public BuddyMatchDataDTO() {
  }

  public BuddyMatchDataDTO(int buddyMatchCode, int buddyCode, int memberCode, String applyId, int applyStatus) {
    this.buddyMatchCode = buddyMatchCode;
    this.buddyCode = buddyCode;
    this.memberCode = memberCode;
    this.applyId = applyId;
    this.applyStatus = applyStatus;
  }

  public int getBuddyMatchCode() {
    return buddyMatchCode;
  }

  public void setBuddyMatchCode(int buddyMatchCode) {
    this.buddyMatchCode = buddyMatchCode;
  }

  public int getBuddyCode() {
    return buddyCode;
  }

  public void setBuddyCode(int buddyCode) {
    this.buddyCode = buddyCode;
  }

  public int getMemberCode() {
    return memberCode;
  }

  public void setMemberCode(int memberCode) {
    this.memberCode = memberCode;
  }

  public String getApplyId() {
    return applyId;
  }

  public void setApplyId(String applyId) {
    this.applyId = applyId;
  }

  public int getApplyStatus() {
    return applyStatus;
  }

  public void setApplyStatus(int applyStatus) {
    this.applyStatus = applyStatus;
  }

  @Override
  public String toString() {
    return "BuddyMatchDataDTO{" +
            "buddyMatchCode=" + buddyMatchCode +
            ", buddyCode=" + buddyCode +
            ", memberCode=" + memberCode +
            ", applyId='" + applyId + '\'' +
            ", applyStatus=" + applyStatus +
            '}';
  }
}
