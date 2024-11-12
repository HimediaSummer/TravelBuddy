package travelbuddy.function.community.buddy.dto;

import travelbuddy.common.RegionDTO;

public class BuddyAndTypeDTO {
    private int buddyCode;
    private MemberDTO memberCode;
    private RegionDTO regionCode;
    private BuddyTypeDTO buddyTypeCode;
    private String buddyTitle;
    private String buddyContents;
    private String buddyCreate;
    private String buddyStatus;
    private String buddyImg;
    private int buddyCount;
    private String buddyAt;
    private String buddyApply;

    public BuddyAndTypeDTO() {
    }

    public BuddyAndTypeDTO(int buddyCode, MemberDTO memberCode, RegionDTO regionCode, BuddyTypeDTO buddyTypeCode, String buddyTitle, String buddyContents, String buddyCreate, String buddyStatus, String buddyImg, int buddyCount, String buddyAt, String buddyApply) {
        this.buddyCode = buddyCode;
        this.memberCode = memberCode;
        this.regionCode = regionCode;
        this.buddyTypeCode = buddyTypeCode;
        this.buddyTitle = buddyTitle;
        this.buddyContents = buddyContents;
        this.buddyCreate = buddyCreate;
        this.buddyStatus = buddyStatus;
        this.buddyImg = buddyImg;
        this.buddyCount = buddyCount;
        this.buddyAt = buddyAt;
        this.buddyApply = buddyApply;
    }

    public int getBuddyCode() {
        return buddyCode;
    }

    public void setBuddyCode(int buddyCode) {
        this.buddyCode = buddyCode;
    }

    public MemberDTO getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(MemberDTO memberCode) {
        this.memberCode = memberCode;
    }

    public RegionDTO getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(RegionDTO regionCode) {
        this.regionCode = regionCode;
    }

    public BuddyTypeDTO getBuddyTypeCode() {
        return buddyTypeCode;
    }

    public void setBuddyTypeCode(BuddyTypeDTO buddyTypeCode) {
        this.buddyTypeCode = buddyTypeCode;
    }

    public String getBuddyTitle() {
        return buddyTitle;
    }

    public void setBuddyTitle(String buddyTitle) {
        this.buddyTitle = buddyTitle;
    }

    public String getBuddyContents() {
        return buddyContents;
    }

    public void setBuddyContents(String buddyContents) {
        this.buddyContents = buddyContents;
    }

    public String getBuddyCreate() {
        return buddyCreate;
    }

    public void setBuddyCreate(String buddyCreate) {
        this.buddyCreate = buddyCreate;
    }

    public String getBuddyStatus() {
        return buddyStatus;
    }

    public void setBuddyStatus(String buddyStatus) {
        this.buddyStatus = buddyStatus;
    }

    public String getBuddyImg() {
        return buddyImg;
    }

    public void setBuddyImg(String buddyImg) {
        this.buddyImg = buddyImg;
    }

    public int getBuddyCount() {
        return buddyCount;
    }

    public void setBuddyCount(int buddyCount) {
        this.buddyCount = buddyCount;
    }

    public String getBuddyAt() {
        return buddyAt;
    }

    public void setBuddyAt(String buddyAt) {
        this.buddyAt = buddyAt;
    }

    public String getBuddyApply() {
        return buddyApply;
    }

    public void setBuddyApply(String buddyApply) {
        this.buddyApply = buddyApply;
    }

    @Override
    public String toString() {
        return "BuddyAndTypeDTO{" +
                "buddyCode=" + buddyCode +
                ", memberCode=" + memberCode +
                ", regionCode=" + regionCode +
                ", buddyTypeCode=" + buddyTypeCode +
                ", buddyTitle='" + buddyTitle + '\'' +
                ", buddyContents='" + buddyContents + '\'' +
                ", buddyCreate='" + buddyCreate + '\'' +
                ", buddyStatus='" + buddyStatus + '\'' +
                ", buddyImg='" + buddyImg + '\'' +
                ", buddyCount=" + buddyCount +
                ", buddyAt='" + buddyAt + '\'' +
                ", buddyApply='" + buddyApply + '\'' +
                '}';
    }
}