package travelbuddy.function.member.dto;

import java.util.List;

public class AccountDTO {

    private int memberCode;
    private String memberName;
    private String memberPassword;
    private String memberFullName;
    private String  memberBirthday;
    private String memberEmail;
    private String memberPhone;
    private String memberSuspension;
    private String memberDeletion;
    private int memberLike;
    private String memberImg;
    private AuthorityDTO authority;
    private String memberCreate;
    private String memberLeave;

    public AccountDTO() {
    }

    public AccountDTO(AuthorityDTO authority, String memberBirthday, int memberCode, String memberCreate, String memberDeletion, String memberEmail, String memberFullName, String memberImg, String memberLeave, int memberLike, String memberName, String memberPassword, String memberPhone, String memberSuspension) {
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

    public AuthorityDTO getAuthority() {
        return authority;
    }

    public void setAuthority(AuthorityDTO authority) {
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
        return "AccountDTO{" +
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
