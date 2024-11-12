package travelbuddy.function.schedule.dto;

public class RegionDTO {

    private int regionCode;
    private String regionName;
    private String regionDescription;
    private String regionImg;
    private String regionThumbnailImg;

    public RegionDTO() {
    }

    public RegionDTO(int regionCode, String regionName, String regionDescription, String regionImg, String regionThumbnailImg) {
        this.regionCode = regionCode;
        this.regionName = regionName;
        this.regionDescription = regionDescription;
        this.regionImg = regionImg;
        this.regionThumbnailImg = regionThumbnailImg;
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

    @Override
    public String toString() {
        return "RegionDTO{" +
                "regionCode=" + regionCode +
                ", regionName='" + regionName + '\'' +
                ", regionDescription='" + regionDescription + '\'' +
                ", regionImg='" + regionImg + '\'' +
                ", regionThumbnailImg='" + regionThumbnailImg + '\'' +
                '}';
    }
}