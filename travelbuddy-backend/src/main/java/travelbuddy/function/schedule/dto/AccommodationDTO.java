package travelbuddy.function.schedule.dto;

public class AccommodationDTO {

    private int accomCode;      // 숙소코드
    private String accomType;   // 숙소종류
    private String accomName;   // 숙소이름
    private String accomAddres; // 숙소주소
    private String accomImg;    // 숙소이미지경로
    private String accomThumbnailImg;   // 썸네일이미지경로
    private String accomUserDetail;

    public AccommodationDTO() {
    }

    public AccommodationDTO(int accomCode, String accomType, String accomName, String accomAddres, String accomImg, String accomThumbnailImg, String accomUserDetail) {
        this.accomCode = accomCode;
        this.accomType = accomType;
        this.accomName = accomName;
        this.accomAddres = accomAddres;
        this.accomImg = accomImg;
        this.accomThumbnailImg = accomThumbnailImg;
        this.accomUserDetail = accomUserDetail;
    }

    public int getAccomCode() {
        return accomCode;
    }

    public void setAccomCode(int accomCode) {
        this.accomCode = accomCode;
    }

    public String getAccomType() {
        return accomType;
    }

    public void setAccomType(String accomType) {
        this.accomType = accomType;
    }

    public String getAccomName() {
        return accomName;
    }

    public void setAccomName(String accomName) {
        this.accomName = accomName;
    }

    public String getAccomAddres() {
        return accomAddres;
    }

    public void setAccomAddres(String accomAddres) {
        this.accomAddres = accomAddres;
    }

    public String getAccomImg() {
        return accomImg;
    }

    public void setAccomImg(String accomImg) {
        this.accomImg = accomImg;
    }

    public String getAccomThumbnailImg() {
        return accomThumbnailImg;
    }

    public void setAccomThumbnailImg(String accomThumbnailImg) {
        this.accomThumbnailImg = accomThumbnailImg;
    }

    public String getAccomUserDetail() {
        return accomUserDetail;
    }

    public void setAccomUserDetail(String accomUserDetail) {
        this.accomUserDetail = accomUserDetail;
    }

    @Override
    public String toString() {
        return "AccommodationDTO{" +
                "accomCode=" + accomCode +
                ", accomType='" + accomType + '\'' +
                ", accomName='" + accomName + '\'' +
                ", accomAddres='" + accomAddres + '\'' +
                ", accomImg='" + accomImg + '\'' +
                ", accomThumbnailImg='" + accomThumbnailImg + '\'' +
                ", accomUserDetail='" + accomUserDetail + '\'' +
                '}';
    }
}
