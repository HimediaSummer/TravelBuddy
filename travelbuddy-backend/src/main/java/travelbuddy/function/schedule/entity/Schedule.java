package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.Date;

@Entity
@Table(name="tbl_schedule")
public class Schedule {

    @Id
    @Column(name="sche_code")
    private int scheCode;

    @ManyToOne
    @JoinColumn(name="region_code")
    private Region region;

    @Column(name="question")
    private String question;

    @Column(name="sche_date")
    private Date scheDate;

    @Column(name="sche_list")
    private String scheList;

    @Column(name="sche_start_date")
    private Time scheStartDate;

    @Column(name="sche_end_date")
    private Time scheEndDate;

    @Column(name="accom")
    private String accom;

    @Column(name="accom_img")
    private String accomImg;

    @Column(name="travel_time")
    private String travelTime;

    @Column(name="sche_time")
    private String scheTime;

    @Column(name="member_answer_code")
    private int memberAnswerCode;

    public Schedule() {
    }

    public Schedule(int scheCode, Region region, String question, Date scheDate, String scheList, Time scheStartDate, Time scheEndDate, String accom, String accomImg, String travelTime, String scheTime, int memberAnswerCode) {
        this.scheCode = scheCode;
        this.region = region;
        this.question = question;
        this.scheDate = scheDate;
        this.scheList = scheList;
        this.scheStartDate = scheStartDate;
        this.scheEndDate = scheEndDate;
        this.accom = accom;
        this.accomImg = accomImg;
        this.travelTime = travelTime;
        this.scheTime = scheTime;
        this.memberAnswerCode = memberAnswerCode;
    }

    public int getScheCode() {
        return scheCode;
    }

    public void setScheCode(int scheCode) {
        this.scheCode = scheCode;
    }

    public Region getRegionCode() {
        return region;
    }

    public void setRegionCode(Region regionCode) {
        this.region = regionCode;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Date getScheDate() {
        return scheDate;
    }

    public void setScheDate(Date scheDate) {
        this.scheDate = scheDate;
    }

    public String getScheList() {
        return scheList;
    }

    public void setScheList(String scheList) {
        this.scheList = scheList;
    }

    public Time getScheStartDate() {
        return scheStartDate;
    }

    public void setScheStartDate(Time scheStartDate) {
        this.scheStartDate = scheStartDate;
    }

    public Time getScheEndDate() {
        return scheEndDate;
    }

    public void setScheEndDate(Time scheEndDate) {
        this.scheEndDate = scheEndDate;
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

    public int getMemberAnswerCode() {
        return memberAnswerCode;
    }

    public void setMemberAnswerCode(int memberAnswerCode) {
        this.memberAnswerCode = memberAnswerCode;
    }

    @Override
    public String toString() {
        return "ScheduleDTO{" +
                "scheCode=" + scheCode +
                ", region=" + region +
                ", question='" + question + '\'' +
                ", scheDate=" + scheDate +
                ", scheList='" + scheList + '\'' +
                ", scheStartDate=" + scheStartDate +
                ", scheEndDate=" + scheEndDate +
                ", accom='" + accom + '\'' +
                ", accomImg='" + accomImg + '\'' +
                ", travelTime='" + travelTime + '\'' +
                ", scheTime='" + scheTime + '\'' +
                ", memberAnswerCode=" + memberAnswerCode +
                '}';
    }
}