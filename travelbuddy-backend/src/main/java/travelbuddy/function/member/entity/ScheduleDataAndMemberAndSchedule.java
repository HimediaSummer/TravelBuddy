package travelbuddy.function.member.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_member_schedule_data")
public class ScheduleDataAndMemberAndSchedule {

    @Id
    @Column(name = "member_sche_code")
    private int memberScheCode;

    @ManyToOne
    @JoinColumn(name = "member_code")
    private Member memberCode;

    @ManyToOne
    @JoinColumn(name = "sche_code")
    private Schedule scheCode;

    public ScheduleDataAndMemberAndSchedule() {
    }

    public ScheduleDataAndMemberAndSchedule(int memberScheCode, Member memberCode, Schedule scheCode) {
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
        return "ScheduleDataAndMemberAndSchedule{" +
                "memberScheCode=" + memberScheCode +
                ", memberCode=" + memberCode +
                ", scheCode=" + scheCode +
                '}';
    }
}