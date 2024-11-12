package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
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

    @Column(name="question")
    private String question;

    @Column(name="sche_date")
    private String scheDate;

    @Column(name="sche_list")
    private String scheList;

    @Column(name="sche_start_date")
    private String scheStartDate;

    @Column(name="sche_end_date")
    private String scheEndDate;

    @Column(name="accom")
    private String accom;

    @Column(name="accom_img")
    private String accomImg;

    @Column(name="travel_time")
    private String travelTime;

    @Column(name="sche_time")
    private String scheTime;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="member_answer_code")
    private MemberAnswer memberAnswer;

    public Schedule() {
    }

    public Schedule(String accom, String accomImg, MemberAnswer memberAnswer, String question, Region region, int scheCode, String scheDate, String scheEndDate, String scheList, String scheStartDate, String scheTime, String travelTime) {
        this.accom = accom;
        this.accomImg = accomImg;
        this.memberAnswer = memberAnswer;
        this.question = question;
        this.region = region;
        this.scheCode = scheCode;
        this.scheDate = scheDate;
        this.scheEndDate = scheEndDate;
        this.scheList = scheList;
        this.scheStartDate = scheStartDate;
        this.scheTime = scheTime;
        this.travelTime = travelTime;
    }

    public String getAccom() {
        return accom;
    }

    public void setAccom(String accom) {
        this.accom = accom;
    }

    public String getAccomImg() {
        return accomImg;
    }

    public void setAccomImg(String accomImg) {
        this.accomImg = accomImg;
    }

    public MemberAnswer getMemberAnswer() {
        return memberAnswer;
    }

    public void setMemberAnswer(MemberAnswer memberAnswer) {
        this.memberAnswer = memberAnswer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public int getScheCode() {
        return scheCode;
    }

    public void setScheCode(int scheCode) {
        this.scheCode = scheCode;
    }

    public String getScheDate() {
        return scheDate;
    }

    public void setScheDate(String scheDate) {
        this.scheDate = scheDate;
    }

    public String getScheEndDate() {
        return scheEndDate;
    }

    public void setScheEndDate(String scheEndDate) {
        this.scheEndDate = scheEndDate;
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

    public String getScheTime() {
        return scheTime;
    }

    public void setScheTime(String scheTime) {
        this.scheTime = scheTime;
    }

    public String getTravelTime() {
        return travelTime;
    }

    public void setTravelTime(String travelTime) {
        this.travelTime = travelTime;
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "accom='" + accom + '\'' +
                ", scheCode=" + scheCode +
                ", region=" + region +
                ", question='" + question + '\'' +
                ", scheDate='" + scheDate + '\'' +
                ", scheList='" + scheList + '\'' +
                ", scheStartDate='" + scheStartDate + '\'' +
                ", scheEndDate='" + scheEndDate + '\'' +
                ", accomImg='" + accomImg + '\'' +
                ", travelTime='" + travelTime + '\'' +
                ", scheTime='" + scheTime + '\'' +
                ", memberAnswer=" + memberAnswer +
                '}';
    }
}