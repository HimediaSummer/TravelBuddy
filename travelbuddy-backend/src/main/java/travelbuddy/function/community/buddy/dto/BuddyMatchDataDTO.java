package travelbuddy.function.community.buddy.dto;

public class BuddyMatchDataDTO {

  private int buddyMatchCode;   // 버디매칭코드
  private int buddyCode;        // 버디코드
  private String applyId;       // 신청자 아이디

  public BuddyMatchDataDTO() {
  }

  public BuddyMatchDataDTO(int buddyMatchCode, int buddyCode, String applyId) {
    this.buddyMatchCode = buddyMatchCode;
    this.buddyCode = buddyCode;
    this.applyId = applyId;
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

  public String getApplyId() {
    return applyId;
  }

  public void setApplyId(String applyId) {
    this.applyId = applyId;
  }

  @Override
  public String toString() {
    return "BuddyMatchDataDTO{" +
            "buddyMatchCode=" + buddyMatchCode +
            ", buddyCode=" + buddyCode +
            ", applyId='" + applyId + '\'' +
            '}';
  }
}
