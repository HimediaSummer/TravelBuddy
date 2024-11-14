package travelbuddy.function.member.entity;

import jakarta.persistence.*;
import travelbuddy.function.schedule.entity.Schedule;

@Entity
@Table(name = "tbl_member_schedule_data")
public class MemberScheduleData {

    @Id
    @Column(name = "member_sche_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberScheCode;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_code")
    private AccountEntity account;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "sche_code")
    private Schedule schedule;

    public MemberScheduleData() {
    }

    public MemberScheduleData(AccountEntity account, int memberScheCode, Schedule schedule) {
        this.account = account;
        this.memberScheCode = memberScheCode;
        this.schedule = schedule;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public int getMemberScheCode() {
        return memberScheCode;
    }

    public void setMemberScheCode(int memberScheCode) {
        this.memberScheCode = memberScheCode;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    @Override
    public String toString() {
        return "ScheduleData{" +
                "account=" + account +
                ", memberScheCode=" + memberScheCode +
                ", schedule=" + schedule +
                '}';
    }
}