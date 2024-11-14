package travelbuddy.function.member.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "tbl_verification")
@DynamicInsert
public class Verification {

    @Id
    @Column(name = "verification_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int verificationCode;

    @Column(name = "verification_number")
    private int verificationNumber;

    @Column(name = "is_verified")
    @ColumnDefault("false")
    private Boolean isVerified;

    @Column(name = "verification_time")
    private String  verificationTime;

    @ManyToOne
    @JoinColumn(name = "member_code")
    private Account account;

    public Verification() {
    }

    public Verification(Account account, Boolean isVerified, int verificationCode, int verificationNumber, String verificationTime) {
        this.account = account;
        this.isVerified = isVerified;
        this.verificationCode = verificationCode;
        this.verificationNumber = verificationNumber;
        this.verificationTime = verificationTime;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
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
        return "Verification{" +
                "account=" + account +
                ", verificationCode=" + verificationCode +
                ", verificationNumber=" + verificationNumber +
                ", isVerified=" + isVerified +
                ", verificationTime='" + verificationTime + '\'' +
                '}';
    }
}