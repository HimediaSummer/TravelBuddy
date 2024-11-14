package travelbuddy.function.community.qnafaq.entity;


import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "tbl_faq")    // 테이블명
@DynamicInsert
public class Faq {


    @Id
    @Column(name = "faq_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int faqCode;        // faq 코드

    @JoinColumn(name = "fq_type_code")
    @ManyToOne(cascade = CascadeType.PERSIST)
    private FqType fqType;     // fq_type 참조

    @Column(name = "faq_title")
    private String faqTitle;    // faq 제목

    @Column(name = "faq_contents")
    private String faqContents;  // faq 내용

    @Column(name = "faq_at")
    @ColumnDefault("N")
    private String faqAt;       // 은폐여부

    public Faq() {
    }

    public Faq(String faqAt, int faqCode, String faqContents, String faqTitle, FqType fqType) {
        this.faqAt = faqAt;
        this.faqCode = faqCode;
        this.faqContents = faqContents;
        this.faqTitle = faqTitle;
        this.fqType = fqType;
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

    public FqType getFqType() {
        return fqType;
    }

    public void setFqType(FqType fqType) {
        this.fqType = fqType;
    }

    @Override
    public String toString() {
        return "Faq{" +
                "faqAt='" + faqAt + '\'' +
                ", faqCode=" + faqCode +
                ", fqType=" + fqType +
                ", faqTitle='" + faqTitle + '\'' +
                ", faqContents='" + faqContents + '\'' +
                '}';
    }
}
