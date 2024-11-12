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