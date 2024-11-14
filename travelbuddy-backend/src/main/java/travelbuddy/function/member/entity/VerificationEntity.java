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

    @ManyToOne
    @JoinColumn(name = "member_code")
    private AccountEntity account;

    public VerificationEntity() {
    }

    public VerificationEntity(AccountEntity account, Boolean isVerified, int verificationCode, int verificationNumber, String verificationTime) {
        this.account = account;
        this.isVerified = isVerified;
        this.verificationCode = verificationCode;
        this.verificationNumber = verificationNumber;
        this.verificationTime = verificationTime;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
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

    public String getVerificationTime() {
        return verificationTime;
    }

    public void setVerificationTime(String verificationTime) {
        this.verificationTime = verificationTime;
    }

    @Override
    public String toString() {
        return "VerificationEntity{" +
                "account=" + account +
                ", verificationCode=" + verificationCode +
                ", verificationNumber=" + verificationNumber +
                ", isVerified=" + isVerified +
                ", verificationTime='" + verificationTime + '\'' +
                '}';
    }
}
