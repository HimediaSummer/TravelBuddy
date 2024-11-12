package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "tbl_buddy")
public class BuddyAndType {

    @Id
    @Column(name = "buddy_code")
    private int buddyCode;

    @ManyToOne
    @JoinColumn(name = "buddy_code")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "region_code")
    private Region region;

    @ManyToOne
    @JoinColumn(name = "buddy_code")
    private BuddyType buddyType;

    @Column(name = "buddy_code")
    private String buddyTitle;

    @Column(name = "buddy_code")
    private String buddyContents;

    @Column(name = "buddy_code")
    private String buddyCreate;

    @Column(name = "buddy_code")
    private String buddyStatus;

    @Column(name = "buddy_code")
    private String buddyImg;

    @Column(name = "buddy_code")
    private int buddyCount;

    @Column(name = "buddy_code")
    private String buddyAt;

    @Column(name = "buddy_code")
    private String buddyApply;

    public BuddyAndType() {
    }

    public BuddyAndType(int buddyCode, Member member, Region region, BuddyType buddyType, String buddyTitle, String buddyContents, String buddyCreate, String buddyStatus, String buddyImg, int buddyCount, String buddyAt, String buddyApply) {
        this.buddyCode = buddyCode;
        this.member = member;
        this.region = region;
        this.buddyType = buddyType;
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

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public BuddyType getBuddyType() {
        return buddyType;
    }

    public void setBuddyType(BuddyType buddyType) {
        this.buddyType = buddyType;
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
        return "BuddyAndType{" +
                "buddyCode=" + buddyCode +
                ", member=" + member +
                ", region=" + region +
                ", buddyType=" + buddyType +
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