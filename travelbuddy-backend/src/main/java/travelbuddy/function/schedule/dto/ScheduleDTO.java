package travelbuddy.function.schedule.dto;

import java.sql.Time;
import java.util.Date;

public class ScheduleDTO {

    private int scheCode;
    private int regionCode;
    private int memberAnswerCode;
    private int accomCode;
    private String scheList;
    private String scheStartDate;
    private String scheEndDate;
    private String travelTime;
    private String scheTime;

    public ScheduleDTO() {
    }

    public ScheduleDTO(int scheCode, int regionCode, int memberAnswerCode, int accomCode, String scheList, String scheStartDate, String scheEndDate, String travelTime, String scheTime) {
        this.scheCode = scheCode;
        this.regionCode = regionCode;
        this.memberAnswerCode = memberAnswerCode;
        this.accomCode = accomCode;
        this.scheList = scheList;
        this.scheStartDate = scheStartDate;
        this.scheEndDate = scheEndDate;
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

    public int getMemberAnswerCode() {
        return memberAnswerCode;
    }

    public void setMemberAnswerCode(int memberAnswerCode) {
        this.memberAnswerCode = memberAnswerCode;
    }

    public int getAccomCode() {
        return accomCode;
    }

    public void setAccomCode(int accomCode) {
        this.accomCode = accomCode;
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
                ", memberAnswerCode=" + memberAnswerCode +
                ", accomCode=" + accomCode +
                ", scheList='" + scheList + '\'' +
                ", scheStartDate='" + scheStartDate + '\'' +
                ", scheEndDate='" + scheEndDate + '\'' +
                ", travelTime='" + travelTime + '\'' +
                ", scheTime='" + scheTime + '\'' +
                '}';
    }
}