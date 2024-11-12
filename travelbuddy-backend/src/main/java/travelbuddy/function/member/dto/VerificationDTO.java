package travelbuddy.function.member.dto;


import java.util.List;

public class VerificationDTO {

  private int verificationCode;
  private int verificationNumber;
  private Boolean isVerified;
  private String  verificationTime;
  private List<AccountDTO> memberCode;


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


  public Boolean getIsVerified() {
    return isVerified;
  }

  public void setIsVerified(Boolean isVerified) {
    this.isVerified = isVerified;
  }


  public String getVerificationTime() {
    return verificationTime;
  }

  public void setVerificationTime(String verificationTime) {
    this.verificationTime = verificationTime;
  }


  public List<AccountDTO> getMemberCode() {
    return memberCode;
  }

  public void setMemberCode(List<AccountDTO> memberCode) {
    this.memberCode = memberCode;
  }

}
