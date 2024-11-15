package travelbuddy.function.member.dto;

public class AccountDTO {

    private int memberCode;         // 회원코드
    private String memberName;      // 회원아이디
    private String memberPassword;  // 회원비밀번호
    private String memberFullName;  // 회원이름
    private String  memberBirthday; // 회원생년월일
    private String memberEmail;     // 회원이메일
    private String memberPhone;     // 회원연락처
    private String memberSuspension;    // 회원정지상태여부
    private String memberDeletion;      // 회원탈퇴상태여부
    private int memberLike;         // 좋아요
    private String memberImg;        // 이미지경로
    private AuthorityDTO authority;     // 권한
    private String memberCreate;        // 회원생성일
    private String memberLeave;         // 회원탈퇴일

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
