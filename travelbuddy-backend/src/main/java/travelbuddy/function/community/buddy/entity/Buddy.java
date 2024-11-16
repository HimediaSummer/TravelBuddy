package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.schedule.entity.Region;

@Entity
@Table(name = "tbl_buddy")  // 테이블 명
@DynamicInsert
public class Buddy {

    @Id
    @Column(name = "buddy_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int buddyCode;          // 버디코드 PK

    @ManyToOne
    @JoinColumn(name = "member_code")
    private Account account;  // 회원코드 FK

    @ManyToOne
    @JoinColumn(name = "region_code")
    private Region region;          // 지역코드 FK

    @ManyToOne
    @JoinColumn(name = "buddy_type_code")
    private BuddyType buddyType;    // 버디타입코드 FK

    @Column(name = "buddy_title")
    private String buddyTitle;      // 게시글제목

    @Column(name = "buddy_contents")
    private String buddyContents;   // 게시글내용

    @Column(name = "buddy_create")
    private String buddyCreate;     // 작성일

    @Column(name = "buddy_status")
    @ColumnDefault("N")
    private String buddyStatus;     // 매칭상태

    @Column(name = "buddy_img")
    private String buddyImg;        // 이미지경로

    @Column(name = "buddy_count")
    private int buddyCount;         // 조회수

    @Column(name = "buddy_at")
    @ColumnDefault("N")
    private String buddyAt;         // 은폐여부

    public Buddy() {
    }

    public Buddy(Account account, String buddyAt, int buddyCode, String buddyContents, int buddyCount, String buddyCreate, String buddyImg, String buddyStatus, String buddyTitle, BuddyType buddyType, Region region) {
        this.account = account;
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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
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
                "account=" + account +
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
                '}';
    }

    public void setRegion(int regionCode) {
    }

    public void setBuddyType(int buddyTypeCode) {

    }
}
