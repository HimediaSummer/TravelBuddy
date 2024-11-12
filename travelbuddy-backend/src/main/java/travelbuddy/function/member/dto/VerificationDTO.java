package travelbuddy.function.member.dto;


import java.util.List;

public class VerificationDTO {

  private int verificationCode;
  private int verificationNumber;
  private Boolean isVerified;
  private String  verificationTime;
  private AccountDTO Account;

  public VerificationDTO() {
  }

  public VerificationDTO(AccountDTO account, Boolean isVerified, int verificationCode, int verificationNumber, String verificationTime) {
    Account = account;
    this.isVerified = isVerified;
    this.verificationCode = verificationCode;
    this.verificationNumber = verificationNumber;
    this.verificationTime = verificationTime;
  }

  public AccountDTO getAccount() {
    return Account;
  }

  public void setAccount(AccountDTO account) {
    Account = account;
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
    return "VerificationDTO{" +
            "Account=" + Account +
            ", verificationCode=" + verificationCode +
            ", verificationNumber=" + verificationNumber +
            ", isVerified=" + isVerified +
            ", verificationTime='" + verificationTime + '\'' +
            '}';
  }
}
