package travelbuddy.function.schedule.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_member_schedule_data")
public class ScheduleData {

    @Id
    @Column(name = "member_sche_code")
    private int memberScheCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "sche_code")
    private int scheCode;

    public ScheduleData() {
    }

    public ScheduleData(int memberScheCode, int memberCode, int scheCode) {
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
        return "ScheduleData{" +
                "memberScheCode=" + memberScheCode +
                ", memberCode=" + memberCode +
                ", scheCode=" + scheCode +
                '}';
    }
}