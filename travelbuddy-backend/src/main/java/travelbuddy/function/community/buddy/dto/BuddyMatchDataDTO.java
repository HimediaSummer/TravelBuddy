package travelbuddy.function.community.buddy.dto;

public class BuddyMatchDataDTO {

<<<<<<< HEAD
  private int buddyMatchCode;
  private int buddyCode;
  private String applyId;
  private int apply_status;
=======
  private int buddyMatchCode;   // 버디매칭코드
  private int buddyCode;        // 버디코드
  private String applyId;       // 신청자 아이디
  private int applyStatus;
>>>>>>> main

  public BuddyMatchDataDTO() {
  }

<<<<<<< HEAD
  public BuddyMatchDataDTO(int buddyMatchCode, int buddyCode, String applyId, int apply_status) {
    this.buddyMatchCode = buddyMatchCode;
    this.buddyCode = buddyCode;
    this.applyId = applyId;
    this.apply_status = apply_status;
=======
  public BuddyMatchDataDTO(int buddyMatchCode, int buddyCode, String applyId, int applyStatus) {
    this.buddyMatchCode = buddyMatchCode;
    this.buddyCode = buddyCode;
    this.applyId = applyId;
    this.applyStatus = applyStatus;
>>>>>>> main
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

<<<<<<< HEAD
  public int getApply_status() {
    return apply_status;
  }

  public void setApply_status(int apply_status) {
    this.apply_status = apply_status;
=======
  public int getApplyStatus() {
    return applyStatus;
  }

  public void setApplyStatus(int applyStatus) {
    this.applyStatus = applyStatus;
>>>>>>> main
  }

  @Override
  public String toString() {
    return "BuddyMatchDataDTO{" +
            "buddyMatchCode=" + buddyMatchCode +
            ", buddyCode=" + buddyCode +
            ", applyId='" + applyId + '\'' +
<<<<<<< HEAD
            ", apply_status=" + apply_status +
=======
            ", applyStatus=" + applyStatus +
>>>>>>> main
            '}';
  }
}
