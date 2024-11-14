package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_accommodation")  //테이블명
public class Accommodation {

    @Id
    @Column(name = "accom_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accomCode;      // 숙소코드

    @Column(name = "accom_type")
    private String accomType;   // 숙소종류

    @Column(name = "accom_name")
    private String accomName;   // 숙소이름

    @Column(name = "accom_addres")
    private String accomAddres; // 숙소주소

    @Column(name = "accom_img")
    private String accomImg;    // 숙소이미지경로

    @Column(name = "accom_thumbnail_img")
    private String accomThumbnailImg;   // 썸네일이미지경로

    public Accommodation() {
    }

    public Accommodation(String accomAddres, int accomCode, String accomImg, String accomName, String accomThumbnailImg, String accomType) {
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
        return "Accommodation{" +
                "accomAddres='" + accomAddres + '\'' +
                ", accomCode=" + accomCode +
                ", accomType='" + accomType + '\'' +
                ", accomName='" + accomName + '\'' +
                ", accomImg='" + accomImg + '\'' +
                ", accomThumbnailImg='" + accomThumbnailImg + '\'' +
                '}';
    }
}
