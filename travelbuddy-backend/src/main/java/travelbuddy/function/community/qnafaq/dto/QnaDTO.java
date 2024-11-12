package travelbuddy.function.community.qnafaq.dto;

public class QnaDTO {

    private int qnaCode;    // 문의코드
    private int fqTypeCode; // fq_type_코드
    private String qnaTitle;    // 문의제목
    private String qnaContents; // 문의내용
    private String qnaCreate;   // 등록일시

    public QnaDTO() {
    }

    public QnaDTO(int fqTypeCode, int qnaCode, String qnaContents, String qnaCreate, String qnaTitle) {
        this.fqTypeCode = fqTypeCode;
        this.qnaCode = qnaCode;
        this.qnaContents = qnaContents;
        this.qnaCreate = qnaCreate;
        this.qnaTitle = qnaTitle;
    }

    public int getFqTypeCode() {
        return fqTypeCode;
    }

    public void setFqTypeCode(int fqTypeCode) {
        this.fqTypeCode = fqTypeCode;
    }

    public int getQnaCode() {
        return qnaCode;
    }

    public void setQnaCode(int qnaCode) {
        this.qnaCode = qnaCode;
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

    public String getQnaTitle() {
        return qnaTitle;
    }

    public void setQnaTitle(String qnaTitle) {
        this.qnaTitle = qnaTitle;
    }

    @Override
    public String toString() {
        return "QnaDTO{" +
                "fqTypeCode=" + fqTypeCode +
                ", qnaCode=" + qnaCode +
                ", qnaTitle='" + qnaTitle + '\'' +
                ", qnaContents='" + qnaContents + '\'' +
                ", qnaCreate='" + qnaCreate + '\'' +
                '}';
    }
}
