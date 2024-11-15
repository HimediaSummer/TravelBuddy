package travelbuddy.function.community.notice.entity;


import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_notice") // 테이블명
@DynamicInsert
public class Notice {

    @Id
    @Column(name = "notice_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeCode;         // 공지코드

    @Column(name = "notice_title")
    private String noticeTitle;     // 공지제목

    @Column(name = "notice_contents")
    private String noticeContents;  //공지내용

    @Column(name = "notice_create")
    private String noticeCreate;    //등록일시

    @Column(name = "notice_count")
    private int noticeCount;        //조회수

    @Column(name = "notice_img")
    private String noticeImg;       //이미지경로

    @Column(name = "notice_at")
    @ColumnDefault("N")
    private String noticeAt;        //은폐여부

    public Notice() {
    }

    public Notice(String noticeAt, int noticeCode, String noticeContents, int noticeCount, String noticeCreate, String noticeImg, String noticeTitle) {
        this.noticeAt = noticeAt;
        this.noticeCode = noticeCode;
        this.noticeContents = noticeContents;
        this.noticeCount = noticeCount;
        this.noticeCreate = noticeCreate;
        this.noticeImg = noticeImg;
        this.noticeTitle = noticeTitle;
    }

    public String getNoticeAt() {
        return noticeAt;
    }

    public void setNoticeAt(String noticeAt) {
        this.noticeAt = noticeAt;
    }

    public int getNoticeCode() {
        return noticeCode;
    }

    public void setNoticeCode(int noticeCode) {
        this.noticeCode = noticeCode;
    }

    public String getNoticeContents() {
        return noticeContents;
    }

    public void setNoticeContents(String noticeContents) {
        this.noticeContents = noticeContents;
    }

    public int getNoticeCount() {
        return noticeCount;
    }

    public void setNoticeCount(int noticeCount) {
        this.noticeCount = noticeCount;
    }

    public String getNoticeCreate() {
        return noticeCreate;
    }

    public void setNoticeCreate(String noticeCreate) {
        this.noticeCreate = noticeCreate;
    }

    public String getNoticeImg() {
        return noticeImg;
    }

    public void setNoticeImg(String noticeImg) {
        this.noticeImg = noticeImg;
    }

    public String getNoticeTitle() {
        return noticeTitle;
    }

    public void setNoticeTitle(String noticeTitle) {
        this.noticeTitle = noticeTitle;
    }

    @Override
    public String toString() {
        return "Notice{" +
                "noticeAt='" + noticeAt + '\'' +
                ", noticeCode=" + noticeCode +
                ", noticeTitle='" + noticeTitle + '\'' +
                ", noticeContents='" + noticeContents + '\'' +
                ", noticeCreate='" + noticeCreate + '\'' +
                ", noticeCount=" + noticeCount +
                ", noticeImg='" + noticeImg + '\'' +
                '}';
    }
}
