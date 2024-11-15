package travelbuddy.function.member.dto;

public class MemberBuddyDataDTO {

    private int memberBuddyCode;
    private int memberCode;
    private int buddyCode;

    public MemberBuddyDataDTO() {
    }

    public MemberBuddyDataDTO(int memberBuddyCode, int memberCode, int buddyCode) {
        this.memberBuddyCode = memberBuddyCode;
        this.memberCode = memberCode;
        this.buddyCode = buddyCode;
    }

    public int getMemberBuddyCode() {
        return memberBuddyCode;
    }

    public void setMemberBuddyCode(int memberBuddyCode) {
        this.memberBuddyCode = memberBuddyCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getBuddyCode() {
        return buddyCode;
    }

    public void setBuddyCode(int buddyCode) {
        this.buddyCode = buddyCode;
    }

    @Override
    public String toString() {
        return "MemberBuddyDataDTO{" +
                "memberBuddyCode=" + memberBuddyCode +
                ", memberCode=" + memberCode +
                ", buddyCode=" + buddyCode +
                '}';
    }
}
