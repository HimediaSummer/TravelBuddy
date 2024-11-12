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
    private List<AuthorityDTO> authorityCode;
    private String memberCreate;
    private String memberLeave;

    public AccountDTO() {
    }

    public AccountDTO(int memberCode, String memberName, String memberPassword, String memberFullName, String memberBirthday, String memberEmail, String memberPhone, String memberSuspension, String memberDeletion, int memberLike, String memberImg, List<AuthorityDTO> authorityCode, String memberCreate, String memberLeave) {
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
        this.authorityCode = authorityCode;
        this.memberCreate = memberCreate;
        this.memberLeave = memberLeave;
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

    public List<AuthorityDTO> getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(List<AuthorityDTO> authorityCode) {
        this.authorityCode = authorityCode;
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

    @Override
    public String toString() {
        return "AccountDTO{" +
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
                ", authorityCode=" + authorityCode +
                ", memberCreate='" + memberCreate + '\'' +
                ", memberLeave='" + memberLeave + '\'' +
                '}';
    }
}
