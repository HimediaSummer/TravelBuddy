package travelbuddy.function.member.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import travelbuddy.function.community.buddy.entity.Buddy;

@Entity
@Table(name = "tbl_member_buddy_data")
public class MemberBuddyData {

    @Id
    @Column(name = "member_buddy_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberBuddyCode;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_code")
    private Account memberCode;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "buddy_code")
    private Buddy buddy;

    public MemberBuddyData() {
    }

    public MemberBuddyData(int memberBuddyCode, Account memberCode, Buddy buddy) {
        this.memberBuddyCode = memberBuddyCode;
        this.memberCode = memberCode;
        this.buddy = buddy;
    }

    public int getMemberBuddyCode() {
        return memberBuddyCode;
    }

    public void setMemberBuddyCode(int memberBuddyCode) {
        this.memberBuddyCode = memberBuddyCode;
    }

    public Account getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(Account memberCode) {
        this.memberCode = memberCode;
    }

    public Buddy getBuddy() {
        return buddy;
    }

    public void setBuddy(Buddy buddy) {
        this.buddy = buddy;
    }

    @Override
    public String toString() {
        return "MemberBuddyData{" +
                "memberBuddyCode=" + memberBuddyCode +
                ", memberCode=" + memberCode +
                ", buddy=" + buddy +
                '}';
    }
}

