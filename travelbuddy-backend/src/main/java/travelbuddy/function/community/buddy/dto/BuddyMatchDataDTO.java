package travelbuddy.function.community.buddy.dto;

public class BuddyMatchDataDTO {

  private int buddyMatchCode;
  private int buddyCode;
  private String applyId;
  private int apply_status;

  public BuddyMatchDataDTO() {
  }

  public BuddyMatchDataDTO(int buddyMatchCode, int buddyCode, String applyId, int apply_status) {
    this.buddyMatchCode = buddyMatchCode;
    this.buddyCode = buddyCode;
    this.applyId = applyId;
    this.apply_status = apply_status;
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

  public int getApply_status() {
    return apply_status;
  }

  public void setApply_status(int apply_status) {
    this.apply_status = apply_status;
  }

  @Override
  public String toString() {
    return "BuddyMatchDataDTO{" +
            "buddyMatchCode=" + buddyMatchCode +
            ", buddyCode=" + buddyCode +
            ", applyId='" + applyId + '\'' +
            ", apply_status=" + apply_status +
            '}';
  }
}
