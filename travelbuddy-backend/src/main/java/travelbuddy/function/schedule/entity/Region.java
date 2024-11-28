package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;

@Entity
@Table(name="tbl_region")
public class Region {

    @Id
    @Column(name="region_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int regionCode;

    @Column(name="region_name")
    private String regionName;

    @Column(name="region_description")
    private String regionDescription;

    @Column(name="region_img")
    private String regionImg;

    @Column(name="region_thumbnail_img")
    private String regionThumbnailImg;

    @Column(name="region_user_detail")
    private String regionUserDetail;

    public Region() {
    }

    public Region(int regionCode, String regionName, String regionDescription, String regionImg, String regionThumbnailImg, String regionUserDetail) {
        this.regionCode = regionCode;
        this.regionName = regionName;
        this.regionDescription = regionDescription;
        this.regionImg = regionImg;
        this.regionThumbnailImg = regionThumbnailImg;
        this.regionUserDetail = regionUserDetail;
    }

    public int getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(int regionCode) {
        this.regionCode = regionCode;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getRegionDescription() {
        return regionDescription;
    }

    public void setRegionDescription(String regionDescription) {
        this.regionDescription = regionDescription;
    }

    public String getRegionImg() {
        return regionImg;
    }

    public void setRegionImg(String regionImg) {
        this.regionImg = regionImg;
    }

    public String getRegionThumbnailImg() {
        return regionThumbnailImg;
    }

    public void setRegionThumbnailImg(String regionThumbnailImg) {
        this.regionThumbnailImg = regionThumbnailImg;
    }

    public String getRegionUserDetail() {
        return regionUserDetail;
    }

    public void setRegionUserDetail(String regionUserDetail) {
        this.regionUserDetail = regionUserDetail;
    }

    @Override
    public String toString() {
        return "Region{" +
                "regionCode=" + regionCode +
                ", regionName='" + regionName + '\'' +
                ", regionDescription='" + regionDescription + '\'' +
                ", regionImg='" + regionImg + '\'' +
                ", regionThumbnailImg='" + regionThumbnailImg + '\'' +
                ", regionUserDetail='" + regionUserDetail + '\'' +
                '}';
    }
}