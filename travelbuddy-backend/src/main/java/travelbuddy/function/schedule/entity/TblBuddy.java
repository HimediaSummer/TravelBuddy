package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table(name = "tbl_buddy")
public class TblBuddy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buddy_code", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_code", nullable = false)
    private TblAccount memberCode;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "region_code", nullable = false)
    private TblRegion regionCode;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "buddy_type_code", nullable = false)
    private TblBuddyType buddyTypeCode;

    @Size(max = 50)
    @NotNull
    @Column(name = "buddy_title", nullable = false, length = 50)
    private String buddyTitle;

    @Size(max = 500)
    @NotNull
    @Column(name = "buddy_contents", nullable = false, length = 500)
    private String buddyContents;

    @NotNull
    @Column(name = "buddy_create", nullable = false)
    private Instant buddyCreate;

    @Size(max = 1)
    @NotNull
    @ColumnDefault("'N'")
    @Column(name = "buddy_status", nullable = false, length = 1)
    private String buddyStatus;

    @Lob
    @Column(name = "buddy_img")
    private String buddyImg;

    @NotNull
    @Column(name = "buddy_count", nullable = false)
    private Integer buddyCount;

    @Size(max = 1)
    @NotNull
    @ColumnDefault("'N'")
    @Column(name = "buddy_at", nullable = false, length = 1)
    private String buddyAt;

    @Size(max = 1)
    @NotNull
    @ColumnDefault("'N'")
    @Column(name = "buddy_apply", nullable = false, length = 1)
    private String buddyApply;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TblAccount getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(TblAccount memberCode) {
        this.memberCode = memberCode;
    }

    public TblRegion getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(TblRegion regionCode) {
        this.regionCode = regionCode;
    }

    public TblBuddyType getBuddyTypeCode() {
        return buddyTypeCode;
    }

    public void setBuddyTypeCode(TblBuddyType buddyTypeCode) {
        this.buddyTypeCode = buddyTypeCode;
    }

    public String getBuddyTitle() {
        return buddyTitle;
    }

    public void setBuddyTitle(String buddyTitle) {
        this.buddyTitle = buddyTitle;
    }

    public String getBuddyContents() {
        return buddyContents;
    }

    public void setBuddyContents(String buddyContents) {
        this.buddyContents = buddyContents;
    }

    public Instant getBuddyCreate() {
        return buddyCreate;
    }

    public void setBuddyCreate(Instant buddyCreate) {
        this.buddyCreate = buddyCreate;
    }

    public String getBuddyStatus() {
        return buddyStatus;
    }

    public void setBuddyStatus(String buddyStatus) {
        this.buddyStatus = buddyStatus;
    }

    public String getBuddyImg() {
        return buddyImg;
    }

    public void setBuddyImg(String buddyImg) {
        this.buddyImg = buddyImg;
    }

    public Integer getBuddyCount() {
        return buddyCount;
    }

    public void setBuddyCount(Integer buddyCount) {
        this.buddyCount = buddyCount;
    }

    public String getBuddyAt() {
        return buddyAt;
    }

    public void setBuddyAt(String buddyAt) {
        this.buddyAt = buddyAt;
    }

    public String getBuddyApply() {
        return buddyApply;
    }

    public void setBuddyApply(String buddyApply) {
        this.buddyApply = buddyApply;
    }

}