package travelbuddy.function.schedule.dto;

public class ScheduleDataDTO {
    private int memberScheCode;
    private int memberCode;
    private int scheCode;

    public ScheduleDataDTO() {
    }

    public ScheduleDataDTO(int memberScheCode, int memberCode, int scheCode) {
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

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getScheCode() {
        return scheCode;
    }

    public void setScheCode(int scheCode) {
        this.scheCode = scheCode;
    }

    @Override
    public String toString() {
        return "ScheduleDataDTO{" +
                "memberScheCode=" + memberScheCode +
                ", memberCode=" + memberCode +
                ", scheCode=" + scheCode +
                '}';
    }
}