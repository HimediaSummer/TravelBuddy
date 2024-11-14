package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.entity.MemberAnswer;

import java.sql.Time;
import java.util.Date;

@Entity
@Table(name="tbl_schedule")
public class Schedule {

    @Id
    @Column(name="sche_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheCode;

    @ManyToOne
    @JoinColumn(name="region_code")
    private Region region;

    @ManyToOne
    @JoinColumn(name="accom_code")
    private Accommodation accommodation;

    @ManyToOne
    @JoinColumn(name="member_code")
    private Account account;

    @ManyToOne
    @JoinColumn(name="member_answer_code")
    private MemberAnswer memberAnswer;

    @Column(name="sche_list")
    private String scheList;

    @Column(name="sche_start_date")
    private String scheStartDate;

    @Column(name="sche_end_date")
    private String scheEndDate;

    @Column(name="sche_start_time")
    private String scheStartTime;

    @Column(name="sche_end_time")
    private String scheEndTime;

    @Column(name="travel_time")
    private String travelTime;

    @Column(name="sche_time")
    private String scheTime;

    public Schedule() {
    }

    public Schedule(int scheCode, Region region, Accommodation accommodation, Account account, MemberAnswer memberAnswer, String scheList, String scheStartDate, String scheEndDate, String scheStartTime, String scheEndTime, String travelTime, String scheTime) {
        this.scheCode = scheCode;
        this.region = region;
        this.accommodation = accommodation;
        this.account = account;
        this.memberAnswer = memberAnswer;
        this.scheList = scheList;
        this.scheStartDate = scheStartDate;
        this.scheEndDate = scheEndDate;
        this.scheStartTime = scheStartTime;
        this.scheEndTime = scheEndTime;
        this.travelTime = travelTime;
        this.scheTime = scheTime;
    }

    public int getScheCode() {
        return scheCode;
    }

    public void setScheCode(int scheCode) {
        this.scheCode = scheCode;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Accommodation getAccommodation() {
        return accommodation;
    }

    public void setAccommodation(Accommodation accommodation) {
        this.accommodation = accommodation;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public MemberAnswer getMemberAnswer() {
        return memberAnswer;
    }

    public void setMemberAnswer(MemberAnswer memberAnswer) {
        this.memberAnswer = memberAnswer;
    }

    public String getScheList() {
        return scheList;
    }

    public void setScheList(String scheList) {
        this.scheList = scheList;
    }

    public String getScheStartDate() {
        return scheStartDate;
    }

    public void setScheStartDate(String scheStartDate) {
        this.scheStartDate = scheStartDate;
    }

    public String getScheEndDate() {
        return scheEndDate;
    }

    public void setScheEndDate(String scheEndDate) {
        this.scheEndDate = scheEndDate;
    }

    public String getScheStartTime() {
        return scheStartTime;
    }

    public void setScheStartTime(String scheStartTime) {
        this.scheStartTime = scheStartTime;
    }

    public String getScheEndTime() {
        return scheEndTime;
    }

    public void setScheEndTime(String scheEndTime) {
        this.scheEndTime = scheEndTime;
    }

    public String getTravelTime() {
        return travelTime;
    }

    public void setTravelTime(String travelTime) {
        this.travelTime = travelTime;
    }

    public String getScheTime() {
        return scheTime;
    }

    public void setScheTime(String scheTime) {
        this.scheTime = scheTime;
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "scheCode=" + scheCode +
                ", region=" + region +
                ", accommodation=" + accommodation +
                ", account=" + account +
                ", memberAnswer=" + memberAnswer +
                ", scheList='" + scheList + '\'' +
                ", scheStartDate='" + scheStartDate + '\'' +
                ", scheEndDate='" + scheEndDate + '\'' +
                ", scheStartTime='" + scheStartTime + '\'' +
                ", scheEndTime='" + scheEndTime + '\'' +
                ", travelTime='" + travelTime + '\'' +
                ", scheTime='" + scheTime + '\'' +
                '}';
    }
}