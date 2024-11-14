package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_buddy_match_data")   // 테이블명
public class BuddyMatchData {

  @Id
  @Column(name = "buddy_match_code")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int buddyMatchCode;     // 버디매칭코드

  @ManyToOne
  @JoinColumn(name = "buddy_code")
  private Buddy buddy;            // 버디코드

  @Column(name = "apply_id")
  private String applyId;         // 신청자아이디

  @Column(name = "apply_status")
  private String applyStatus;         // 매칭신청

  public BuddyMatchData() {
  }

  public BuddyMatchData(int buddyMatchCode, Buddy buddy, String applyId, String applyStatus) {
    this.buddyMatchCode = buddyMatchCode;
    this.buddy = buddy;
    this.applyId = applyId;
    this.applyStatus = applyStatus;
  }

  public int getBuddyMatchCode() {
    return buddyMatchCode;
  }

  public void setBuddyMatchCode(int buddyMatchCode) {
    this.buddyMatchCode = buddyMatchCode;
  }

  public Buddy getBuddy() {
    return buddy;
  }

  public void setBuddy(Buddy buddy) {
    this.buddy = buddy;
  }

  public String getApplyId() {
    return applyId;
  }

  public void setApplyId(String applyId) {
    this.applyId = applyId;
  }

  public String getApplyStatus() {
    return applyStatus;
  }

  public void setApplyStatus(String applyStatus) {
    this.applyStatus = applyStatus;
  }

  @Override
  public String toString() {
    return "BuddyMatchData{" +
            "buddyMatchCode=" + buddyMatchCode +
            ", buddy=" + buddy +
            ", applyId='" + applyId + '\'' +
            ", applyStatus='" + applyStatus + '\'' +
            '}';
  }
}