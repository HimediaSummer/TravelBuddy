package travelbuddy.function.member.entity;

import jakarta.persistence.*;
import travelbuddy.function.member.dto.AccountDTO;

import java.util.List;

@Entity
@Table(name = "tbl_verification")
public class VerificationEntity {

    @Id
    @Column(name = "verification_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int verificationCode;

    @Column(name = "verification_number")
    private int verificationNumber;

    @Column(name = "is_verified")
    private Boolean isVerified;

    @Column(name = "verification_time")
    private String  verificationTime;

    @OneToMany
    @JoinColumn(name = "member_code")
    private List<AccountEntity> memberCode;

    public VerificationEntity() {
    }

    public VerificationEntity(int verificationCode, int verificationNumber, Boolean isVerified, String verificationTime, List<AccountEntity> memberCode) {
        this.verificationCode = verificationCode;
        this.verificationNumber = verificationNumber;
        this.isVerified = isVerified;
        this.verificationTime = verificationTime;
        this.memberCode = memberCode;
    }

    public int getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(int verificationCode) {
        this.verificationCode = verificationCode;
    }

    public int getVerificationNumber() {
        return verificationNumber;
    }

    public void setVerificationNumber(int verificationNumber) {
        this.verificationNumber = verificationNumber;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }

    public String getVerificationTime() {
        return verificationTime;
    }

    public void setVerificationTime(String verificationTime) {
        this.verificationTime = verificationTime;
    }

    public List<AccountEntity> getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(List<AccountEntity> memberCode) {
        this.memberCode = memberCode;
    }

    @Override
    public String toString() {
        return "VerificationEntity{" +
                "verificationCode=" + verificationCode +
                ", verificationNumber=" + verificationNumber +
                ", isVerified=" + isVerified +
                ", verificationTime='" + verificationTime + '\'' +
                ", memberCode=" + memberCode +
                '}';
    }
}
