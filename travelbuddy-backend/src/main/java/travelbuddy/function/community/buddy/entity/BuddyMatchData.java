package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_buddy_match_data")
public class BuddyMatchData {

  @Id
  @Column(name = "buddy_match_code")
  private int buddyMatchCode;

  @Column(name = "buddy_code")
  private int buddyCode;

  @Column(name = "buddy_match_code")
  private String applyId;

  public BuddyMatchData() {
  }

  public BuddyMatchData(int buddyMatchCode, int buddyCode, String applyId) {
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
    return "BuddyMatchData{" +
            "buddyMatchCode=" + buddyMatchCode +
            ", buddyCode=" + buddyCode +
            ", applyId='" + applyId + '\'' +
            '}';
  }
}