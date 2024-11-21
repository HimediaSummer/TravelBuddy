package travelbuddy.function.community.buddy.dto;

public class BuddyDTO {
    private int buddyCode;          // 버디코드
    private int memberCode;         // 회원코드
    private int regionCode;         // 지역코드
    private int buddyTypeCode;      // 버디유형코드
    private String buddyTitle;      // 게시글제목
    private String buddyContents;   // 게시글내용
    private String buddyCreate;     // 작성일
    private String buddyStatus;     // 매칭상태
    private String buddyImg;        // 게시글 이미지경로
    private int buddyCount;         // 조회수
    private String buddyAt;         // 은폐여부
    private String regionName;
    private String buddyTypeName;
    private String memberName;


    public BuddyDTO() {
    }

    public BuddyDTO(int buddyCode, int memberCode, int regionCode, int buddyTypeCode, String buddyTitle, String buddyContents, String buddyCreate, String buddyStatus, String buddyImg, int buddyCount, String buddyAt, String regionName, String buddyTypeName, String memberName) {
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
        this.regionName = regionName;
        this.buddyTypeName = buddyTypeName;
        this.memberName = memberName;
    }

    public int getBuddyCode() {
        return buddyCode;
    }

    public void setBuddyCode(int buddyCode) {
        this.buddyCode = buddyCode;
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

    public int getBuddyTypeCode() {
        return buddyTypeCode;
    }

    public void setBuddyTypeCode(int buddyTypeCode) {
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

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getBuddyTypeName() {
        return buddyTypeName;
    }

    public void setBuddyTypeName(String buddyTypeName) {
        this.buddyTypeName = buddyTypeName;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    @Override
    public String toString() {
        return "BuddyDTO{" +
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
                ", regionName='" + regionName + '\'' +
                ", buddyTypeName='" + buddyTypeName + '\'' +
                ", memberName='" + memberName + '\'' +
                '}';
    }
}
