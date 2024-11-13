package travelbuddy.function.community.qnafaq.dto;

public class FqTypeDTO {

    private int fqTypeCode;     // fq_type 코드
    private String fqTypeName;  // fq_type 이름

    public FqTypeDTO() {
    }

    public FqTypeDTO(int fqTypeCode, String fqTypeName) {
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
        return "FqTypeDTO{" +
                "fqTypeCode=" + fqTypeCode +
                ", fqTypeName='" + fqTypeName + '\'' +
                '}';
    }
}
