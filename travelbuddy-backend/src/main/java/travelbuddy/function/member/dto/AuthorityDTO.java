package travelbuddy.function.member.dto;


public class AuthorityDTO {

  private int authorityCode;
  private String authorityCodeName;

  public AuthorityDTO() {
  }

  public AuthorityDTO(int authorityCode, String authorityCodeName) {
    this.authorityCode = authorityCode;
    this.authorityCodeName = authorityCodeName;
  }

  public int getAuthorityCode() {
    return authorityCode;
  }

  public void setAuthorityCode(int authorityCode) {
    this.authorityCode = authorityCode;
  }


  public String getAuthorityCodeName() {
    return authorityCodeName;
  }

  public void setAuthorityCodeName(String authorityCodeName) {
    this.authorityCodeName = authorityCodeName;
  }

  @Override
  public String toString() {
    return "AuthorityDTO{" +
            "authorityCode=" + authorityCode +
            ", authorityCodeName='" + authorityCodeName + '\'' +
            '}';
  }
}
