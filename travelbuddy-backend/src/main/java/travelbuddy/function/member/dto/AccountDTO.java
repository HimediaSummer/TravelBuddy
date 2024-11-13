package travelbuddy.function.member.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class AccountDTO implements UserDetails {

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
//======================================================================================
    /* 설명. UserDetails 상속
     *  UserDetails는 Spring Security에서 사용자 정보를 저장하는 인터페이스다.
     *  - 사용자의 유효성 여부(isEnabled, isAccountNonExpired 등)
     *  - 사용자 비밀번호, 사용자명
     *  - 사용자에게 부여된 권한(GrantedAuthority)
     *  ===========================================================================
     *  UserDetails를 상속받으면 필수로 오버라이딩 해야하는 추상 메소드들이 있다.
     *  단축키 'ctrl + O'를 입력해 오버라이딩 해야하는 메소드 7개를 모두 선택한다.
     *  물론, 이들 중 필요한 추상 메소드들만 재정의하여 사용할 것이다.
     * */

    /* 설명.
     *  여기서 authorities는 해당 사용자에게 부여된 권한의 집합을 저장한다.
     *  GrantedAuthority 인터페이스는 권한 표현을 위해 주로 SimpleGrantedAuthority 클래스를 사용해 구현한다.
     *  관리자, 일반 사용자, 방문자 등과 같은 역할을 나타내는 'ROLE_'으로 시작하는 문자열로 표현되곤 한다.
     *  권한이 여러 개인 경우 콤마(,)로 분리할 수 있다.
     * */
    private Collection<GrantedAuthority> authorities;

    /* 설명.
     *  해당 사용자에 권한 목록을 설정할 때 사용할 setter()를 추가해야 한다.
     *  Spring Security는 인증된 사용자가 요청하는 특정 자원에 대한 권한이 있는지를 이 권한 목록을 통해 판단한다.
     * */
    public void setAuthorities(Collection<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    /* 설명.
     *  현재 사용자가 부여받은 권한 컬렉션을 반환한다.(상속받은 UserDetails 인터페이스 사용)
     *  Spring Security는 이 정보(권한 컬렉션)를 사용해 접근 제어 결정을 판단한다.
     * */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    /* 설명.
     *  사용자의 비밀번호를 반환한다.
     *  (입력받은 사용자 비밀번호와 데이터베이스에 저장된 비밀번호를 비교하여 인증하는 데 사용)
     * */
    @Override
    public String getPassword() {
        return this.memberPassword;
    }

    /* 설명.
     *  사용자의 아이디(username)를 반환한다.
     *  (입력받은 사용자 아이디를 가지고 사용자를 검색하는데 사용)
     * */
    @Override
    public String getUsername() {
        return this.memberName;   // memberName이 아니라 memberId를 사용해야 한다는 것을 주의!
    }

    /* 설명. 이하 추상 메소드들은 그대로 두고 사용하지 않는다. */
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

}




