package travelbuddy.function.community.notice.dto;

public class NoticeDTO {

    private int noticeCode;         // 공지코드
    private String noticeTitle;     // 공지제목
    private String noticeContents;  //공지내용
    private String noticeCreate;    //등록일시
    private int noticeCount;        //조회수
    private String noticeImg;       //이미지경로
    private String noticeAt;        //은폐여부

    public NoticeDTO() {
    }

    public NoticeDTO(String noticeAt, int noticeCode, String noticeContents, int noticeCount, String noticeCreate, String noticeImg, String noticeTitle) {
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
        return "NoticeDTO{" +
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
