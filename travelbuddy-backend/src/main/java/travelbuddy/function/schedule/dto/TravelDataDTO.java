package travelbuddy.function.schedule.dto;

import java.util.List;

public class TravelDataDTO {
    private String startDate;
    private String endDate;
    private List<String> accommodations; // 숙소 목록
    private List<String> regions; // 지역 목록
    private List<String> questions; // 질문 목록

    public TravelDataDTO() {
    }

    public TravelDataDTO(String startDate, String endDate, List<String> accommodations, List<String> regions, List<String> questions) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.accommodations = accommodations;
        this.regions = regions;
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "TravelDataDTO{" +
                "startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", accommodations=" + accommodations +
                ", regions=" + regions +
                ", questions=" + questions +
                '}';
    }

    // Getters and Setters
    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public List<String> getAccommodations() {
        return accommodations;
    }

    public void setAccommodations(List<String> accommodations) {
        this.accommodations = accommodations;
    }

    public List<String> getRegions() {
        return regions;
    }

    public void setRegions(List<String> regions) {
        this.regions = regions;
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }
}