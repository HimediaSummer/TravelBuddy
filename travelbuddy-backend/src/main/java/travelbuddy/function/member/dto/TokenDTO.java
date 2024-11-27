package travelbuddy.function.member.dto;

public class TokenDTO {

	private String grantType;            // 토큰 타입
	private String memberName;            // 인증받은 회원 이름
	private String accessToken;        // 액세스 토큰
	private Long accessTokenExpiresIn;    // Long 형의 만료 시간

	private Integer memberCode;    // 회원코드

	public TokenDTO() {
	}

	public TokenDTO(String grantType, String memberName, String accessToken, Long accessTokenExpiresIn, Integer memberCode) {
		this.grantType = grantType;
		this.memberName = memberName;
		this.accessToken = accessToken;
		this.accessTokenExpiresIn = accessTokenExpiresIn;
		this.memberCode = memberCode;
	}

	public String getGrantType() {
		return grantType;
	}

	public void setGrantType(String grantType) {
		this.grantType = grantType;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public Long getAccessTokenExpiresIn() {
		return accessTokenExpiresIn;
	}

	public void setAccessTokenExpiresIn(Long accessTokenExpiresIn) {
		this.accessTokenExpiresIn = accessTokenExpiresIn;
	}

	public Integer getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(Integer memberCode) {
		this.memberCode = memberCode;
	}

	@Override
	public String toString() {
		return "TokenDTO{" +
				"grantType='" + grantType + '\'' +
				", memberName='" + memberName + '\'' +
				", accessToken='" + accessToken + '\'' +
				", accessTokenExpiresIn=" + accessTokenExpiresIn +
				", memberCode=" + memberCode +
				'}';
	}
}
