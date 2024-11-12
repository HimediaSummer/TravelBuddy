package travelbuddy.function.community.qnafaq.dto;

public class FaqDTO {

    private int faqCode;        // faq 코드
    private int fqTypeCode;     // fq_type 코드
    private String faqTitle;    // faq 제목
    private String faqContents;  // faq 내용
    private String faqAt;       // 은폐여부

    public FaqDTO() {
    }

    public FaqDTO(String faqAt, int faqCode, String faqContents, String faqTitle, int fqTypeCode) {
        this.faqAt = faqAt;
        this.faqCode = faqCode;
        this.faqContents = faqContents;
        this.faqTitle = faqTitle;
        this.fqTypeCode = fqTypeCode;
    }

    public String getFaqAt() {
        return faqAt;
    }

    public void setFaqAt(String faqAt) {
        this.faqAt = faqAt;
    }

    public int getFaqCode() {
        return faqCode;
    }

    public void setFaqCode(int faqCode) {
        this.faqCode = faqCode;
    }

    public String getFaqContents() {
        return faqContents;
    }

    public void setFaqContents(String faqContents) {
        this.faqContents = faqContents;
    }

    public String getFaqTitle() {
        return faqTitle;
    }

    public void setFaqTitle(String faqTitle) {
        this.faqTitle = faqTitle;
    }

    public int getFqTypeCode() {
        return fqTypeCode;
    }

    public void setFqTypeCode(int fqTypeCode) {
        this.fqTypeCode = fqTypeCode;
    }

    @Override
    public String toString() {
        return "FaqDTO{" +
                "faqAt='" + faqAt + '\'' +
                ", faqCode=" + faqCode +
                ", fqTypeCode=" + fqTypeCode +
                ", faqTitle='" + faqTitle + '\'' +
                ", faqContents='" + faqContents + '\'' +
                '}';
    }
}
