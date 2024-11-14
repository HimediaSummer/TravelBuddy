package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import travelbuddy.function.member.entity.AccountEntity;
import travelbuddy.function.schedule.entity.Region;

@Entity
@Table(name = "tbl_buddy")
public class Buddy {

    @Id
    @Column(name = "buddy_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int buddyCode;

    @ManyToOne
    @JoinColumn(name = "member_code")
    private AccountEntity memberCode;

    @ManyToOne
    @JoinColumn(name = "region_code")
    private Region region;

    @ManyToOne
    @JoinColumn(name = "buddy_type_code")
    private BuddyType buddyType;

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

    public Buddy(AccountEntity memberCode, String buddyApply, String buddyAt, int buddyCode, String buddyContents, int buddyCount, String buddyCreate, String buddyImg, String buddyStatus, String buddyTitle, BuddyType buddyType, Region region) {
        this.memberCode = memberCode;
        this.buddyApply = buddyApply;
        this.buddyAt = buddyAt;
        this.buddyCode = buddyCode;
        this.buddyContents = buddyContents;
        this.buddyCount = buddyCount;
        this.buddyCreate = buddyCreate;
        this.buddyImg = buddyImg;
        this.buddyStatus = buddyStatus;
        this.buddyTitle = buddyTitle;
        this.buddyType = buddyType;
        this.region = region;
    }

    public AccountEntity getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(AccountEntity memberCode) {
        this.memberCode = memberCode;
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

    public BuddyType getBuddyType() {
        return buddyType;
    }

    public void setBuddyType(BuddyType buddyType) {
        this.buddyType = buddyType;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    @Override
    public String toString() {
        return "Buddy{" +
                "memberCode=" + memberCode +
                ", buddyCode=" + buddyCode +
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
