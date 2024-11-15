package travelbuddy.function.schedule.dto;

public class AccommodationDTO {

    private int accomCode;      // 숙소코드
    private String accomType;   // 숙소종류
    private String accomName;   // 숙소이름
    private String accomAddres; // 숙소주소
    private String accomImg;    // 숙소이미지경로
    private String accomThumbnailImg;   // 썸네일이미지경로

    public AccommodationDTO() {
    }

    public AccommodationDTO(String accomAddres, int accomCode, String accomImg, String accomName, String accomThumbnailImg, String accomType) {
        this.accomAddres = accomAddres;
        this.accomCode = accomCode;
        this.accomImg = accomImg;
        this.accomName = accomName;
        this.accomThumbnailImg = accomThumbnailImg;
        this.accomType = accomType;
    }

    public String getAccomAddres() {
        return accomAddres;
    }

    public void setAccomAddres(String accomAddres) {
        this.accomAddres = accomAddres;
    }

    public int getAccomCode() {
        return accomCode;
    }

    public void setAccomCode(int accomCode) {
        this.accomCode = accomCode;
    }

    public String getAccomImg() {
        return accomImg;
    }

    public void setAccomImg(String accomImg) {
        this.accomImg = accomImg;
    }

    public String getAccomName() {
        return accomName;
    }

    public void setAccomName(String accomName) {
        this.accomName = accomName;
    }

    public String getAccomThumbnailImg() {
        return accomThumbnailImg;
    }

    public void setAccomThumbnailImg(String accomThumbnailImg) {
        this.accomThumbnailImg = accomThumbnailImg;
    }

    public String getAccomType() {
        return accomType;
    }

    public void setAccomType(String accomType) {
        this.accomType = accomType;
    }

    @Override
    public String toString() {
        return "AccommodationDTO{" +
                "accomAddres='" + accomAddres + '\'' +
                ", accomCode=" + accomCode +
                ", accomType='" + accomType + '\'' +
                ", accomName='" + accomName + '\'' +
                ", accomImg='" + accomImg + '\'' +
                ", accomThumbnailImg='" + accomThumbnailImg + '\'' +
                '}';
    }
}
