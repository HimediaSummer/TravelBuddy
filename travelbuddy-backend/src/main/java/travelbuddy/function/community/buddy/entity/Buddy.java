package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_buddy")
public class Buddy {

    @Id
    @Column(name = "buddy_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int buddyCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "region_code")
    private int regionCode;

    @Column(name = "buddy_type_code")
    private int buddyTypeCode;

    @Column(name = "buddy_title")
    private String buddyTitle;

    @Column(name = "buddy_contents")
    private String buddyContents;

    @Column(name = "buddy_create")
    private String buddyCreate;

    @Column(name = "buddy_status")
    private String buddyStatus;

    @Column(name = "buddy_img")
    private String buddyImg;

    @Column(name = "buddy_count")
    private int buddyCount;

    @Column(name = "buddy_at")
    private String buddyAt;

    @Column(name = "buddy_apply")
    private String buddyApply;

    public Buddy() {
    }

    public Buddy(int buddyCode, int memberCode, int regionCode, int buddyTypeCode, String buddyTitle, String buddyContents, String buddyCreate, String buddyStatus, String buddyImg, int buddyCount, String buddyAt, String buddyApply) {
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

    public String getBuddyApply() {
        return buddyApply;
    }

    public void setBuddyApply(String buddyApply) {
        this.buddyApply = buddyApply;
    }

    @Override
    public String toString() {
        return "Buddy{" +
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
