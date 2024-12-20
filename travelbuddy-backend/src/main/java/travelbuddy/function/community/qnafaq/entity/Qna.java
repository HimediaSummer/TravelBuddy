package travelbuddy.function.community.qnafaq.entity;


import jakarta.persistence.*;
import travelbuddy.function.member.entity.Account;

import java.util.Optional;

@Entity
@Table(name = "tbl_qna")    // 테이블명
public class Qna {

    @Id
    @Column(name = "qna_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qnaCode;    // 문의코드

    @JoinColumn(name = "fq_type_code")
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private FqType fqType; // fq_type 참조

    @JoinColumn(name = "member_code")
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private Account account; // Account 참조

    @Column(name = "qna_title")
    private String qnaTitle;    // 문의제목

    @Column(name = "qna_contents")
    private String qnaContents; // 문의내용

    @Column(name = "qna_create")
    private String qnaCreate;   // 등록일시

    public Qna() {
    }

    public Qna(Account account, FqType fqType, int qnaCode, String qnaContents, String qnaCreate, String qnaTitle) {
        this.account = account;
        this.fqType = fqType;
        this.qnaCode = qnaCode;
        this.qnaContents = qnaContents;
        this.qnaCreate = qnaCreate;
        this.qnaTitle = qnaTitle;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public FqType getFqType() {
        return fqType;
    }

    public void setFqType(FqType fqType) {
        this.fqType = fqType;
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
        return "Qna{" +
                "account=" + account +
                ", qnaCode=" + qnaCode +
                ", fqType=" + fqType +
                ", qnaTitle='" + qnaTitle + '\'' +
                ", qnaContents='" + qnaContents + '\'' +
                ", qnaCreate='" + qnaCreate + '\'' +
                '}';
    }
}