package travelbuddy.function.community.qnafaq.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "tbl_qna_answer")
public class QnaAnswer {

    @Id
    @Column(name = "ans_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ansCode;        // 문의 답변 코드

    @JoinColumn(name = "qna_code")
    @OneToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    private Qna qna;            // 문의 참조

    @Column(name = "ans_contents")
    private String ansContents; // 문의 답변 내용

    @Column(name = "ans_create")
    private String ansCreate;   // 문의답변 등록일

    public QnaAnswer() {
    }

    public QnaAnswer(int ansCode, String ansContents, String ansCreate, Qna qna) {
        this.ansCode = ansCode;
        this.ansContents = ansContents;
        this.ansCreate = ansCreate;
        this.qna = qna;
    }

    public int getAnsCode() {
        return ansCode;
    }

    public void setAnsCode(int ansCode) {
        this.ansCode = ansCode;
    }

    public String getAnsContents() {
        return ansContents;
    }

    public void setAnsContents(String ansContents) {
        this.ansContents = ansContents;
    }

    public String getAnsCreate() {
        return ansCreate;
    }

    public void setAnsCreate(String ansCreate) {
        this.ansCreate = ansCreate;
    }

    public Qna getQna() {
        return qna;
    }

    public void setQna(Qna qna) {
        this.qna = qna;
    }

    @Override
    public String toString() {
        return "QnaAnswer{" +
                "ansCode=" + ansCode +
                ", qna=" + qna +
                ", ansContents='" + ansContents + '\'' +
                ", ansCreate='" + ansCreate + '\'' +
                '}';
    }
}
