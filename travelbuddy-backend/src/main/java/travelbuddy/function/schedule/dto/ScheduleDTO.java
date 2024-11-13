package travelbuddy.function.schedule.dto;

import java.sql.Time;
import java.util.Date;

public class ScheduleDTO {

    private int scheCode;
    private int regionCode;
    private String question;
    private String scheDate;
    private String scheList;
    private String scheStartDate;
    private String scheEndDate;
    private String accom;
    private String accomImg;
    private String travelTime;
    private String scheTime;
    private int memberAnswerCode;

    public ScheduleDTO() {
    }

    public ScheduleDTO(String accom, String accomImg, int memberAnswerCode, String question, int regionCode, int scheCode, String scheDate, String scheEndDate, String scheList, String scheStartDate, String scheTime, String travelTime) {
        this.accom = accom;
        this.accomImg = accomImg;
        this.memberAnswerCode = memberAnswerCode;
        this.question = question;
        this.regionCode = regionCode;
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

    public int getMemberAnswerCode() {
        return memberAnswerCode;
    }

    public void setMemberAnswerCode(int memberAnswerCode) {
        this.memberAnswerCode = memberAnswerCode;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(int regionCode) {
        this.regionCode = regionCode;
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
        return "ScheduleDTO{" +
                "accom='" + accom + '\'' +
                ", scheCode=" + scheCode +
                ", regionCode=" + regionCode +
                ", question='" + question + '\'' +
                ", scheDate='" + scheDate + '\'' +
                ", scheList='" + scheList + '\'' +
                ", scheStartDate='" + scheStartDate + '\'' +
                ", scheEndDate='" + scheEndDate + '\'' +
                ", accomImg='" + accomImg + '\'' +
                ", travelTime='" + travelTime + '\'' +
                ", scheTime='" + scheTime + '\'' +
                ", memberAnswerCode=" + memberAnswerCode +
                '}';
    }
}