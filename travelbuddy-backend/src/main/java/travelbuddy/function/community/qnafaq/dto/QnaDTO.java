package travelbuddy.function.community.qnafaq.dto;

public class QnaDTO {

    private int qnaCode;    // 문의코드
    private int fqTypeCode; // fq_type_코드
    private int memberCode; // 회원코드
    private String qnaTitle;    // 문의제목
    private String qnaContents; // 문의내용
    private String qnaCreate;   // 등록일시

    public QnaDTO() {
    }

    public QnaDTO(int qnaCode, int fqTypeCode, int memberCode, String qnaTitle, String qnaContents, String qnaCreate) {
        this.qnaCode = qnaCode;
        this.fqTypeCode = fqTypeCode;
        this.memberCode = memberCode;
        this.qnaTitle = qnaTitle;
        this.qnaContents = qnaContents;
        this.qnaCreate = qnaCreate;
    }

    public int getQnaCode() {
        return qnaCode;
    }

    public void setQnaCode(int qnaCode) {
        this.qnaCode = qnaCode;
    }

    public int getFqTypeCode() {
        return fqTypeCode;
    }

    public void setFqTypeCode(int fqTypeCode) {
        this.fqTypeCode = fqTypeCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getQnaTitle() {
        return qnaTitle;
    }

    public void setQnaTitle(String qnaTitle) {
        this.qnaTitle = qnaTitle;
    }

    public String getQnaContents() {
        return qnaContents;
    }

    public void setQnaContents(String qnaContents) {
        this.qnaContents = qnaContents;
    }

    public String getQnaCreate() {
        return qnaCreate;
    }

    public void setQnaCreate(String qnaCreate) {
        this.qnaCreate = qnaCreate;
    }

    @Override
    public String toString() {
        return "QnaDTO{" +
                "qnaCode=" + qnaCode +
                ", fqTypeCode=" + fqTypeCode +
                ", memberCode=" + memberCode +
                ", qnaTitle='" + qnaTitle + '\'' +
                ", qnaContents='" + qnaContents + '\'' +
                ", qnaCreate='" + qnaCreate + '\'' +
                '}';
    }
}
