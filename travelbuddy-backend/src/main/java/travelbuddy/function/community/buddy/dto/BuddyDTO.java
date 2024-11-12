package travelbuddy.function.community.buddy.dto;

public class BuddyDTO {
    private int buddyCode;
    private int memberCode;
    private int regionCode;
    private int buddyTypeCode;
    private String buddyTitle;
    private String buddyContents;
    private String buddyCreate;
    private String buddyStatus;
    private String buddyImg;
    private int buddyCount;
    private String buddyAt;
    private String buddyApply;

    public BuddyDTO() {
    }

    public BuddyDTO(String buddyApply, String buddyAt, int buddyCode, String buddyContents, int buddyCount, String buddyCreate, String buddyImg, String buddyStatus, String buddyTitle, int buddyTypeCode, int memberCode, int regionCode) {
        this.buddyApply = buddyApply;
        this.buddyAt = buddyAt;
        this.buddyCode = buddyCode;
        this.buddyContents = buddyContents;
        this.buddyCount = buddyCount;
        this.buddyCreate = buddyCreate;
        this.buddyImg = buddyImg;
        this.buddyStatus = buddyStatus;
        this.buddyTitle = buddyTitle;
        this.buddyTypeCode = buddyTypeCode;
        this.memberCode = memberCode;
        this.regionCode = regionCode;
    }

    public String getBuddyApply() {
        return buddyApply;
    }

    public void setBuddyApply(String buddyApply) {
        this.buddyApply = buddyApply;
    }

    public String getBuddyAt() {
        return buddyAt;
    }

    public void setBuddyAt(String buddyAt) {
        this.buddyAt = buddyAt;
    }

    public int getBuddyCode() {
        return buddyCode;
    }

    public void setBuddyCode(int buddyCode) {
        this.buddyCode = buddyCode;
    }

    public String getBuddyContents() {
        return buddyContents;
    }

    public void setBuddyContents(String buddyContents) {
        this.buddyContents = buddyContents;
    }

    public int getBuddyCount() {
        return buddyCount;
    }

    public void setBuddyCount(int buddyCount) {
        this.buddyCount = buddyCount;
    }

    public String getBuddyCreate() {
        return buddyCreate;
    }

    public void setBuddyCreate(String buddyCreate) {
        this.buddyCreate = buddyCreate;
    }

    public String getBuddyImg() {
        return buddyImg;
    }

    public void setBuddyImg(String buddyImg) {
        this.buddyImg = buddyImg;
    }

    public String getBuddyStatus() {
        return buddyStatus;
    }

    public void setBuddyStatus(String buddyStatus) {
        this.buddyStatus = buddyStatus;
    }

    public String getBuddyTitle() {
        return buddyTitle;
    }

    public void setBuddyTitle(String buddyTitle) {
        this.buddyTitle = buddyTitle;
    }

    public int getBuddyTypeCode() {
        return buddyTypeCode;
    }

    public void setBuddyTypeCode(int buddyTypeCode) {
        this.buddyTypeCode = buddyTypeCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(int regionCode) {
        this.regionCode = regionCode;
    }

    @Override
    public String toString() {
        return "BuddyDTO{" +
                "buddyApply='" + buddyApply + '\'' +
                ", buddyCode=" + buddyCode +
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
                '}';
    }
}
