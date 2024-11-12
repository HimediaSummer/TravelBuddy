package travelbuddy.function.schedule.dto;

import java.sql.Time;
import java.util.Date;

public class ScheduleDTO {

    private int scheCode;
    private int regionCode;
    private String question;
    private Date scheDate;
    private String scheList;
    private Time scheStartDate;
    private Time scheEndDate;
    private String accom;
    private String accomImg;
    private String travelTime;
    private String scheTime;
    private int memberAnswerCode;

    public ScheduleDTO() {
    }

    public ScheduleDTO(int scheCode, int regionCode, String question, Date scheDate, String scheList, Time scheStartDate, Time scheEndDate, String accom, String accomImg, String travelTime, String scheTime, int memberAnswerCode) {
        this.scheCode = scheCode;
        this.regionCode = regionCode;
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

    public int getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(int regionCode) {
        this.regionCode = regionCode;
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
                ", regionCode=" + regionCode +
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