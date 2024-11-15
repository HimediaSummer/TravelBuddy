package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_buddy_match_data")
public class BuddyMatchData {

  @Id
  @Column(name = "buddy_match_code")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int buddyMatchCode;

  @ManyToOne
  @JoinColumn(name = "buddy_code")
  private Buddy buddy;

  @Column(name = "apply_id")
  private String applyId;

  @Column(name = "apply_status")
  private int applyStatus;

  public BuddyMatchData() {
  }

  public BuddyMatchData(int buddyMatchCode, Buddy buddy, String applyId, int applyStatus) {
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

  public int getApplyStatus() {
    return applyStatus;
  }

  public void setApplyStatus(int applyStatus) {
    this.applyStatus = applyStatus;
  }

  @Override
  public String toString() {
    return "BuddyMatchData{" +
            "buddyMatchCode=" + buddyMatchCode +
            ", buddy=" + buddy +
            ", applyId='" + applyId + '\'' +
            ", applyStatus=" + applyStatus +
            '}';
  }

}