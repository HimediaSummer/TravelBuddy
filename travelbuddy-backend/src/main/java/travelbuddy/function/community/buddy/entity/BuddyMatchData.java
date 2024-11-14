package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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

  public BuddyMatchData() {
  }

  public BuddyMatchData(String applyId, Buddy buddy, int buddyMatchCode) {
    this.applyId = applyId;
    this.buddy = buddy;
    this.buddyMatchCode = buddyMatchCode;
  }

  public String getApplyId() {
    return applyId;
  }

  public void setApplyId(String applyId) {
    this.applyId = applyId;
  }

  public Buddy getBuddy() {
    return buddy;
  }

  public void setBuddy(Buddy buddy) {
    this.buddy = buddy;
  }

  public int getBuddyMatchCode() {
    return buddyMatchCode;
  }

  public void setBuddyMatchCode(int buddyMatchCode) {
    this.buddyMatchCode = buddyMatchCode;
  }

  @Override
  public String toString() {
    return "BuddyMatchData{" +
            "applyId='" + applyId + '\'' +
            ", buddyMatchCode=" + buddyMatchCode +
            ", buddy=" + buddy +
            '}';
  }
}