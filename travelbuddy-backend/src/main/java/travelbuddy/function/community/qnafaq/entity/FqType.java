package travelbuddy.function.community.qnafaq.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_fq_type")    // 테이블명
public class FqType {

    @Id
    @Column(name = "fq_type_code")
    private int fqTypeCode;     // fq_type 코드

    @Column(name = "fq_type_name")
    private String fqTypeName;  // fq_type 이름

    public FqType() {
    }

    public FqType(int fqTypeCode, String fqTypeName) {
        this.fqTypeCode = fqTypeCode;
        this.fqTypeName = fqTypeName;
    }

    public int getFqTypeCode() {
        return fqTypeCode;
    }

    public void setFqTypeCode(int fqTypeCode) {
        this.fqTypeCode = fqTypeCode;
    }

    public String getFqTypeName() {
        return fqTypeName;
    }

    public void setFqTypeName(String fqTypeName) {
        this.fqTypeName = fqTypeName;
    }

    @Override
    public String toString() {
        return "FqType{" +
                "fqTypeCode=" + fqTypeCode +
                ", fqTypeName='" + fqTypeName + '\'' +
                '}';
    }
}
