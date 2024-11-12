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

    @OneToMany
    @JoinColumn(name ="authority_code")
    private List<AuthorityEntity> authorityCode;

    public AccountEntity() {
    }

    public AccountEntity(int memberCode, String memberName, String memberPassword, String memberFullName, String memberBirthday, String memberEmail, String memberPhone, String memberSuspension, String memberDeletion, int memberLike, String memberImg, String memberCreate, String memberLeave, List<AuthorityEntity> authorityCode) {
        this.memberCode = memberCode;
        this.memberName = memberName;
        this.memberPassword = memberPassword;
        this.memberFullName = memberFullName;
        this.memberBirthday = memberBirthday;
        this.memberEmail = memberEmail;
        this.memberPhone = memberPhone;
        this.memberSuspension = memberSuspension;
        this.memberDeletion = memberDeletion;
        this.memberLike = memberLike;
        this.memberImg = memberImg;
        this.memberCreate = memberCreate;
        this.memberLeave = memberLeave;
        this.authorityCode = authorityCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
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

    public String getMemberFullName() {
        return memberFullName;
    }

    public void setMemberFullName(String memberFullName) {
        this.memberFullName = memberFullName;
    }

    public String getMemberBirthday() {
        return memberBirthday;
    }

    public void setMemberBirthday(String memberBirthday) {
        this.memberBirthday = memberBirthday;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
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

    public String getMemberDeletion() {
        return memberDeletion;
    }

    public void setMemberDeletion(String memberDeletion) {
        this.memberDeletion = memberDeletion;
    }

    public int getMemberLike() {
        return memberLike;
    }

    public void setMemberLike(int memberLike) {
        this.memberLike = memberLike;
    }

    public String getMemberImg() {
        return memberImg;
    }

    public void setMemberImg(String memberImg) {
        this.memberImg = memberImg;
    }

    public String getMemberCreate() {
        return memberCreate;
    }

    public void setMemberCreate(String memberCreate) {
        this.memberCreate = memberCreate;
    }

    public String getMemberLeave() {
        return memberLeave;
    }

    public void setMemberLeave(String memberLeave) {
        this.memberLeave = memberLeave;
    }

    public List<AuthorityEntity> getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(List<AuthorityEntity> authorityCode) {
        this.authorityCode = authorityCode;
    }

    @Override
    public String toString() {
        return "AccountEntity{" +
                "memberCode=" + memberCode +
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
                ", authorityCode=" + authorityCode +
                '}';
    }
}
