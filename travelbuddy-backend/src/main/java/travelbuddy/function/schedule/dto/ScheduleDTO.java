package travelbuddy.function.schedule.dto;

import java.sql.Time;
import java.util.Date;

public class ScheduleDTO {

    private int scheCode;
    private int regionCode;
    private int accomCode;
    private int memberCode;
    private int memberAnswerCode;
    private String scheList;
    private String scheStartDate;
    private String scheEndDate;
    private String scheStartTime;
    private String scheEndTime;
    private String travelTime;
    private String scheTime;

    public ScheduleDTO() {
    }

    public ScheduleDTO(int scheCode, int regionCode, int accomCode, int memberCode, int memberAnswerCode, String scheList, String scheStartDate, String scheEndDate, String scheStartTime, String scheEndTime, String travelTime, String scheTime) {
        this.scheCode = scheCode;
        this.regionCode = regionCode;
        this.accomCode = accomCode;
        this.memberCode = memberCode;
        this.memberAnswerCode = memberAnswerCode;
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

    public int getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(int regionCode) {
        this.regionCode = regionCode;
    }

    public int getAccomCode() {
        return accomCode;
    }

    public void setAccomCode(int accomCode) {
        this.accomCode = accomCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getMemberAnswerCode() {
        return memberAnswerCode;
    }

    public void setMemberAnswerCode(int memberAnswerCode) {
        this.memberAnswerCode = memberAnswerCode;
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
        return "ScheduleDTO{" +
                "scheCode=" + scheCode +
                ", regionCode=" + regionCode +
                ", accomCode=" + accomCode +
                ", memberCode=" + memberCode +
                ", memberAnswerCode=" + memberAnswerCode +
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