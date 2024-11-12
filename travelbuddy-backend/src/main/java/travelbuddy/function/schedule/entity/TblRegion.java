package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tbl_region")
public class TblRegion {
    @Id
    @Column(name = "region_code", nullable = false)
    private Integer id;

    @Size(max = 30)
    @NotNull
    @Column(name = "region_name", nullable = false, length = 30)
    private String regionName;

    @Size(max = 255)
    @NotNull
    @Column(name = "region_description", nullable = false)
    private String regionDescription;

    @Lob
    @Column(name = "region_img")
    private String regionImg;

    @Lob
    @Column(name = "region_thumbnail_img")
    private String regionThumbnailImg;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

}