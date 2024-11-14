package travelbuddy.function.member.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_authority")
public class Authority {

    @Id
    @Column(name = "authority_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authorityCode;

    @Column(name = "authority_name")
    private String authorityName;

    public Authority() {
    }

    public Authority(int authorityCode, String authorityName) {
        this.authorityCode = authorityCode;
        this.authorityName = authorityName;
    }

    public int getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(int authorityCode) {
        this.authorityCode = authorityCode;
    }

    public String getAuthorityName() {
        return authorityName;
    }

    public void setAuthorityName(String authorityName) {
        this.authorityName = authorityName;
    }

    @Override
    public String toString() {
        return "Authority{" +
                "authorityCode=" + authorityCode +
                ", authorityName='" + authorityName + '\'' +
                '}';
    }
}
