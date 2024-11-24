package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import travelbuddy.function.member.entity.Account;

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

  @ManyToOne
  @JoinColumn(name = "member_code")
  private Account account;            // 버디코드

  @Column(name = "apply_id")
  private String applyId;         // 신청자아이디

  @Column(name = "apply_status")
  private int applyStatus;         // 신청상태

  public BuddyMatchData() {
  }

  public BuddyMatchData(int buddyMatchCode, Buddy buddy, Account account, String applyId, int applyStatus) {
    this.buddyMatchCode = buddyMatchCode;
    this.buddy = buddy;
    this.account = account;
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

  public Account getAccount() {
    return account;
  }

  public void setAccount(Account account) {
    this.account = account;
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
            ", account=" + account +
            ", applyId='" + applyId + '\'' +
            ", applyStatus=" + applyStatus +
            '}';
  }
}