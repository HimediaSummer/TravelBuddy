package travelbuddy.function.member.entity;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "tbl_account")
public class AccountEntity {

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
    private String memberSuspension;

    @Column(name = "member_deletion")
    private String memberDeletion;

    @Column(name = "member_like")
    private int memberLike;

    @Column(name = "member_img")
    private String memberImg;

    @Column(name = "member_create")
    private String memberCreate;

    @Column(name = "member_leave")
    private String memberLeave;

    @ManyToOne
    @JoinColumn(name ="authority_code")
    private AuthorityEntity authority;

    public AccountEntity() {
    }

    public AccountEntity(AuthorityEntity authority, String memberBirthday, int memberCode, String memberCreate, String memberDeletion, String memberEmail, String memberFullName, String memberImg, String memberLeave, int memberLike, String memberName, String memberPassword, String memberPhone, String memberSuspension) {
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

    public AuthorityEntity getAuthority() {
        return authority;
    }

    public void setAuthority(AuthorityEntity authority) {
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

    public String getMemberCreate() {
        return memberCreate;
    }

    public void setMemberCreate(String memberCreate) {
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
        return "AccountEntity{" +
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
