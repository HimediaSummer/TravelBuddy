package travelbuddy.function.member.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@DynamicInsert
@Table(name = "tbl_account")
public class Account {

    @Id
    @Column(name = "member_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberCode;


    @Column(name = "member_name")
    private String memberName;

    @Column(name = "member_password")
    private String memberPassword;

    @Column(name = "member_full_name")
    private String memberFullName;

    @Column(name = "member_birthday")
    private String memberBirthday;

    @Column(name = "member_email")
    private String memberEmail;

    @Column(name = "member_phone")
    private String memberPhone;

    @Column(name = "member_suspension")
    @ColumnDefault("N")
    private String memberSuspension;

    @Column(name = "member_deletion")
    @ColumnDefault("N")
    private String memberDeletion;

    @Column(name = "member_like")
    private int memberLike;

    @Column(name = "member_img")
    private String memberImg;

    @Column(name = "member_create")
//    private String memberCreate;
    private LocalDateTime memberCreate;

    @Column(name = "member_leave")
    private String memberLeave;

    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @ColumnDefault("일반 사용자")
    @JoinColumn(name ="authority_code")
    private Authority authority;

    @PreUpdate
    @PrePersist
    private void updateMemberLeave() {
        if ("Y".equalsIgnoreCase(memberDeletion)) {
            this.memberLeave = String.valueOf(LocalDate.now());
        } else {
            this.memberLeave = null;
        }
    }

    public Account() {
    }


    public Account(Authority authority, String memberBirthday, int memberCode, LocalDateTime memberCreate, String memberDeletion, String memberEmail, String memberFullName, String memberImg, String memberLeave, int memberLike, String memberName, String memberPassword, String memberPhone, String memberSuspension) {
        this.authority = authority;
        this.memberBirthday = memberBirthday;
        this.memberCode = memberCode;
        this.memberCreate = memberCreate;
        this.memberDeletion = memberDeletion;
        this.memberEmail = memberEmail;
        this.memberFullName = memberFullName;
        this.memberImg = memberImg;
        this.memberLeave = memberLeave;
        this.memberLike = memberLike;
        this.memberName = memberName;
        this.memberPassword = memberPassword;
        this.memberPhone = memberPhone;
        this.memberSuspension = memberSuspension;
    }

    public Authority getAuthority() {
        return authority;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    public String getMemberBirthday() {
        return memberBirthday;
    }

    public void setMemberBirthday(String memberBirthday) {
        this.memberBirthday = memberBirthday;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }


    public LocalDateTime getMemberCreate() {
        return memberCreate;
    }

    public void setMemberCreate(LocalDateTime memberCreate) {

        this.memberCreate = memberCreate;
    }

    public String getMemberDeletion() {
        return memberDeletion;
    }

    public void setMemberDeletion(String memberDeletion) {
        this.memberDeletion = memberDeletion;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public String getMemberFullName() {
        return memberFullName;
    }

    public void setMemberFullName(String memberFullName) {
        this.memberFullName = memberFullName;
    }

    public String getMemberImg() {
        return memberImg;
    }

    public void setMemberImg(String memberImg) {
        this.memberImg = memberImg;
    }

    public String getMemberLeave() {
        return memberLeave;
    }

    public void setMemberLeave(String memberLeave) {
        this.memberLeave = memberLeave;
    }

    public int getMemberLike() {
        return memberLike;
    }

    public void setMemberLike(int memberLike) {
        this.memberLike = memberLike;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberPassword() {
        return memberPassword;
    }

    public void setMemberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
    }

    public String getMemberPhone() {
        return memberPhone;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone;
    }

    public String getMemberSuspension() {
        return memberSuspension;
    }

    public void setMemberSuspension(String memberSuspension) {
        this.memberSuspension = memberSuspension;
    }

    @Override
    public String toString() {
        return "Account{" +
                "authority=" + authority +
                ", memberCode=" + memberCode +
                ", memberName='" + memberName + '\'' +
                ", memberPassword='" + memberPassword + '\'' +
                ", memberFullName='" + memberFullName + '\'' +
                ", memberBirthday='" + memberBirthday + '\'' +
                ", memberEmail='" + memberEmail + '\'' +
                ", memberPhone='" + memberPhone + '\'' +
                ", memberSuspension='" + memberSuspension + '\'' +
                ", memberDeletion='" + memberDeletion + '\'' +
                ", memberLike=" + memberLike +
                ", memberImg='" + memberImg + '\'' +
                ", memberCreate='" + memberCreate + '\'' +
                ", memberLeave='" + memberLeave + '\'' +
                '}';
    }
}
