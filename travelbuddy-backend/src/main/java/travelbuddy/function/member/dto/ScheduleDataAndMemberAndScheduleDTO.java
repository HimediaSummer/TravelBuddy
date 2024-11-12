package travelbuddy.function.member.dto;

public class ScheduleDataAndMemberAndScheduleDTO {

    private int memberScheCode;
    private Member memberCode;
    private Schedule scheCode;

    public ScheduleDataAndMemberAndScheduleDTO() {
    }

    public ScheduleDataAndMemberAndScheduleDTO(int memberScheCode, Member memberCode, Schedule scheCode) {
        this.memberScheCode = memberScheCode;
        this.memberCode = memberCode;
        this.scheCode = scheCode;
    }

    public int getMemberScheCode() {
        return memberScheCode;
    }

    public void setMemberScheCode(int memberScheCode) {
        this.memberScheCode = memberScheCode;
    }

    public Member getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(Member memberCode) {
        this.memberCode = memberCode;
    }

    public Schedule getScheCode() {
        return scheCode;
    }

    public void setScheCode(Schedule scheCode) {
        this.scheCode = scheCode;
    }

    @Override
    public String toString() {
        return "ScheduleDataAndMemberAndScheduleDTO{" +
                "memberScheCode=" + memberScheCode +
                ", memberCode=" + memberCode +
                ", scheCode=" + scheCode +
                '}';
    }
}
