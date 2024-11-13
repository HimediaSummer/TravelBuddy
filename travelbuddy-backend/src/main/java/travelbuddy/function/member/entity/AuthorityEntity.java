package travelbuddy.function.member.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_authority")
public class AuthorityEntity {

    @Id
    @Column(name = "authority_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authorityCode;

    @Column(name = "authority_code_name")
    private String authorityCodeName;

    public AuthorityEntity() {
    }

    public AuthorityEntity(int authorityCode, String authorityCodeName) {
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
        return "AuthorityEntity{" +
                "authorityCode=" + authorityCode +
                ", authorityCodeName='" + authorityCodeName + '\'' +
                '}';
    }
}
