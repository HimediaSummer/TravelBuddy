package travelbuddy.function.community.buddy.dto;

public class BuddyMatchDataDTO {

  private int buddyMatchCode;
  private int buddyCode;
  private String applyId;

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
