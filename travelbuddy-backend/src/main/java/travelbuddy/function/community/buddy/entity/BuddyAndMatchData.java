package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_buddy_match_data")
public class BuddyAndMatchData {

  @Id
  @Column(name = "buddy_match_code")
  private int buddyMatchCode;

  @ManyToOne
  @JoinColumn(name = "buddy_code")
  private Buddy buddy;

  @Column(name = "apply_id")
  private String applyId;

  public BuddyAndMatchData() {
  }

  public BuddyAndMatchData(int buddyMatchCode, Buddy buddy, String applyId) {
    this.buddyMatchCode = buddyMatchCode;
    this.buddy = buddy;
    this.applyId = applyId;
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

  @Override
  public String toString() {
    return "BuddyAndMatchData{" +
            "buddyMatchCode=" + buddyMatchCode +
            ", buddy=" + buddy +
            ", applyId='" + applyId + '\'' +
            '}';
  }
}