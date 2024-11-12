package travelbuddy.function.community.qnafaq.dto;

public class QnaAnswerDTO {

    private int ansCode;        // 문의 답변 코드
    private int qnaCode;        // 문의 코드
    private String ansContents; // 문의 답변 내용
    private String ansCreate;   // 문의답변 등록일

    public QnaAnswerDTO() {
    }

    public QnaAnswerDTO(int ansCode, String ansContents, String ansCreate, int qnaCode) {
        this.ansCode = ansCode;
        this.ansContents = ansContents;
        this.ansCreate = ansCreate;
        this.qnaCode = qnaCode;
    }

    public int getQnaCode() {
        return qnaCode;
    }

    public void setQnaCode(int qnaCode) {
        this.qnaCode = qnaCode;
    }

    public String getAnsCreate() {
        return ansCreate;
    }

    public void setAnsCreate(String ansCreate) {
        this.ansCreate = ansCreate;
    }

    public String getAnsContents() {
        return ansContents;
    }

    public void setAnsContents(String ansContents) {
        this.ansContents = ansContents;
    }

    public int getAnsCode() {
        return ansCode;
    }

    public void setAnsCode(int ansCode) {
        this.ansCode = ansCode;
    }

    @Override
    public String toString() {
        return "QnaAnswerDTO{" +
                "ansCode=" + ansCode +
                ", qnaCode=" + qnaCode +
                ", ansContents='" + ansContents + '\'' +
                ", ansCreate='" + ansCreate + '\'' +
                '}';
    }
}
