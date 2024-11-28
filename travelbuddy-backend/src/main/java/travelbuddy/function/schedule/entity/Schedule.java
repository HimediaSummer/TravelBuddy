//package travelbuddy.function.schedule.entity;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name="tbl_schedule")
//@SecondaryTable(name="tbl_region", pkJoinColumns = @PrimaryKeyJoinColumn(name="region_code", referencedColumnName = "sche_code"))
//@SecondaryTable(name="tbl_account", pkJoinColumns = @PrimaryKeyJoinColumn(name="member_code", referencedColumnName = "sche_code"))
//@SecondaryTable(name="tbl_accommodation", pkJoinColumns = @PrimaryKeyJoinColumn(name="accom_code", referencedColumnName = "sche_code"))
//@SecondaryTable(name="tbl_member_answer", pkJoinColumns = @PrimaryKeyJoinColumn(name="member_answer_code", referencedColumnName = "sche_code"))
//public class Schedule {
//
//    @Id
//    @Column(name="sche_code")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int scheCode;
//
//    @Column(name="region_code")
//    private int regionCode;
//
//    @Column(name="region_name", table="tbl_region")
//    private String regionName;
//
//    @Column(name="region_description", table="tbl_region")
//    private String regionDescription;
//
//    @Column(name="region_img", table="tbl_region")
//    private String regionImg;
//
//    @Column(name="region_thumbnail_img", table="tbl_region")
//    private String regionThumbnailImg;
//
//    @Column(name="accom_code")
//    private int accomCode;
//
//    @Column(name="accom_type", table="tbl_accommodation")
//    private String accomType;
//
//    @Column(name="accom_name", table="tbl_accommodation")
//    private String accomName;
//
//    @Column(name="accom_addres", table="tbl_accommodation")
//    private String accomAddres;
//
//    @Column(name="accom_img", table="tbl_accommodation")
//    private String accomImg;
//
//    @Column(name="accom_thumbnail_img", table="tbl_accommodation")
//    private String accomThumbnailImg;
//
//    @Column(name="member_code")
//    private int memberCode;
//
//    @Column(name="authority_code", table="tbl_account")
//    private int authorityCode;
//
//    @Column(name="member_name", table="tbl_account")
//    private String memberName;
//
//    @Column(name="member_password", table="tbl_account")
//    private String memberPassword;
//
//    @Column(name="member_full_name", table="tbl_account")
//    private String memberFullName;
//
//    @Column(name="member_birthday", table="tbl_account")
//    private String memberBirthday;
//
//    @Column(name="member_email", table="tbl_account")
//    private String memberEmail;
//
//    @Column(name="member_phone", table="tbl_account")
//    private String memberPhone;
//
//    @Column(name="member_suspension", table="tbl_account")
//    private String memberSuspension;
//
//    @Column(name="member_deletion", table="tbl_account")
//    private String memberDeletion;
//
//    @Column(name="member_like", table="tbl_account")
//    private int memberLike;
//
//    @Column(name="member_img", table="tbl_account")
//    private String memberImg;
//
//    @Column(name="member_create", table="tbl_account")
//    private String memberCreate;
//
//    @Column(name="member_leave", table="tbl_account")
//    private String memberLeave;
//
//    @Column(name="member_answer_code")
//    private int memberAnswerCode;
//
//    @Column(name="quest_code", table="tbl_member_answer")
//    private int questCode;
//
//    @Column(name="answer_code", table="tbl_member_answer")
//    private int answerCode;
//
//    @Column(name="sche_list")
//    private String scheList;
//
//    @Column(name="sche_start_date")
//    private String scheStartDate;
//
//    @Column(name="sche_end_date")
//    private String scheEndDate;
//
//    @Column(name="sche_start_time")
//    private String scheStartTime;
//
//    @Column(name="sche_end_time")
//    private String scheEndTime;
//
//    @Column(name="travel_time")
//    private String travelTime;
//
//    @Column(name="sche_time")
//    private String scheTime;
//
//    public Schedule() {
//    }
//
//    public Schedule(int scheCode, int regionCode, String regionName, String regionDescription, String regionImg, String regionThumbnailImg, int accomCode, String accomType, String accomName, String accomAddres, String accomImg, String accomThumbnailImg, int memberCode, int authorityCode, String memberName, String memberPassword, String memberFullName, String memberBirthday, String memberEmail, String memberPhone, String memberSuspension, String memberDeletion, int memberLike, String memberImg, String memberCreate, String memberLeave, int memberAnswerCode, int questCode, int answerCode, String scheList, String scheStartDate, String scheEndDate, String scheStartTime, String scheEndTime, String travelTime, String scheTime) {
//        this.scheCode = scheCode;
//        this.regionCode = regionCode;
//        this.regionName = regionName;
//        this.regionDescription = regionDescription;
//        this.regionImg = regionImg;
//        this.regionThumbnailImg = regionThumbnailImg;
//        this.accomCode = accomCode;
//        this.accomType = accomType;
//        this.accomName = accomName;
//        this.accomAddres = accomAddres;
//        this.accomImg = accomImg;
//        this.accomThumbnailImg = accomThumbnailImg;
//        this.memberCode = memberCode;
//        this.authorityCode = authorityCode;
//        this.memberName = memberName;
//        this.memberPassword = memberPassword;
//        this.memberFullName = memberFullName;
//        this.memberBirthday = memberBirthday;
//        this.memberEmail = memberEmail;
//        this.memberPhone = memberPhone;
//        this.memberSuspension = memberSuspension;
//        this.memberDeletion = memberDeletion;
//        this.memberLike = memberLike;
//        this.memberImg = memberImg;
//        this.memberCreate = memberCreate;
//        this.memberLeave = memberLeave;
//        this.memberAnswerCode = memberAnswerCode;
//        this.questCode = questCode;
//        this.answerCode = answerCode;
//        this.scheList = scheList;
//        this.scheStartDate = scheStartDate;
//        this.scheEndDate = scheEndDate;
//        this.scheStartTime = scheStartTime;
//        this.scheEndTime = scheEndTime;
//        this.travelTime = travelTime;
//        this.scheTime = scheTime;
//    }
//
//    public int getScheCode() {
//        return scheCode;
//    }
//
//    public void setScheCode(int scheCode) {
//        this.scheCode = scheCode;
//    }
//
//    public int getRegionCode() {
//        return regionCode;
//    }
//
//    public void setRegionCode(int regionCode) {
//        this.regionCode = regionCode;
//    }
//
//    public String getRegionName() {
//        return regionName;
//    }
//
//    public void setRegionName(String regionName) {
//        this.regionName = regionName;
//    }
//
//    public String getRegionDescription() {
//        return regionDescription;
//    }
//
//    public void setRegionDescription(String regionDescription) {
//        this.regionDescription = regionDescription;
//    }
//
//    public String getRegionImg() {
//        return regionImg;
//    }
//
//    public void setRegionImg(String regionImg) {
//        this.regionImg = regionImg;
//    }
//
//    public String getRegionThumbnailImg() {
//        return regionThumbnailImg;
//    }
//
//    public void setRegionThumbnailImg(String regionThumbnailImg) {
//        this.regionThumbnailImg = regionThumbnailImg;
//    }
//
//    public int getAccomCode() {
//        return accomCode;
//    }
//
//    public void setAccomCode(int accomCode) {
//        this.accomCode = accomCode;
//    }
//
//    public String getAccomType() {
//        return accomType;
//    }
//
//    public void setAccomType(String accomType) {
//        this.accomType = accomType;
//    }
//
//    public String getAccomName() {
//        return accomName;
//    }
//
//    public void setAccomName(String accomName) {
//        this.accomName = accomName;
//    }
//
//    public String getAccomAddres() {
//        return accomAddres;
//    }
//
//    public void setAccomAddres(String accomAddres) {
//        this.accomAddres = accomAddres;
//    }
//
//    public String getAccomImg() {
//        return accomImg;
//    }
//
//    public void setAccomImg(String accomImg) {
//        this.accomImg = accomImg;
//    }
//
//    public String getAccomThumbnailImg() {
//        return accomThumbnailImg;
//    }
//
//    public void setAccomThumbnailImg(String accomThumbnailImg) {
//        this.accomThumbnailImg = accomThumbnailImg;
//    }
//
//    public int getMemberCode() {
//        return memberCode;
//    }
//
//    public void setMemberCode(int memberCode) {
//        this.memberCode = memberCode;
//    }
//
//    public int getAuthorityCode() {
//        return authorityCode;
//    }
//
//    public void setAuthorityCode(int authorityCode) {
//        this.authorityCode = authorityCode;
//    }
//
//    public String getMemberName() {
//        return memberName;
//    }
//
//    public void setMemberName(String memberName) {
//        this.memberName = memberName;
//    }
//
//    public String getMemberPassword() {
//        return memberPassword;
//    }
//
//    public void setMemberPassword(String memberPassword) {
//        this.memberPassword = memberPassword;
//    }
//
//    public String getMemberFullName() {
//        return memberFullName;
//    }
//
//    public void setMemberFullName(String memberFullName) {
//        this.memberFullName = memberFullName;
//    }
//
//    public String getMemberBirthday() {
//        return memberBirthday;
//    }
//
//    public void setMemberBirthday(String memberBirthday) {
//        this.memberBirthday = memberBirthday;
//    }
//
//    public String getMemberEmail() {
//        return memberEmail;
//    }
//
//    public void setMemberEmail(String memberEmail) {
//        this.memberEmail = memberEmail;
//    }
//
//    public String getMemberPhone() {
//        return memberPhone;
//    }
//
//    public void setMemberPhone(String memberPhone) {
//        this.memberPhone = memberPhone;
//    }
//
//    public String getMemberSuspension() {
//        return memberSuspension;
//    }
//
//    public void setMemberSuspension(String memberSuspension) {
//        this.memberSuspension = memberSuspension;
//    }
//
//    public String getMemberDeletion() {
//        return memberDeletion;
//    }
//
//    public void setMemberDeletion(String memberDeletion) {
//        this.memberDeletion = memberDeletion;
//    }
//
//    public int getMemberLike() {
//        return memberLike;
//    }
//
//    public void setMemberLike(int memberLike) {
//        this.memberLike = memberLike;
//    }
//
//    public String getMemberImg() {
//        return memberImg;
//    }
//
//    public void setMemberImg(String memberImg) {
//        this.memberImg = memberImg;
//    }
//
//    public String getMemberCreate() {
//        return memberCreate;
//    }
//
//    public void setMemberCreate(String memberCreate) {
//        this.memberCreate = memberCreate;
//    }
//
//    public String getMemberLeave() {
//        return memberLeave;
//    }
//
//    public void setMemberLeave(String memberLeave) {
//        this.memberLeave = memberLeave;
//    }
//
//    public int getMemberAnswerCode() {
//        return memberAnswerCode;
//    }
//
//    public void setMemberAnswerCode(int memberAnswerCode) {
//        this.memberAnswerCode = memberAnswerCode;
//    }
//
//    public int getQuestCode() {
//        return questCode;
//    }
//
//    public void setQuestCode(int questCode) {
//        this.questCode = questCode;
//    }
//
//    public int getAnswerCode() {
//        return answerCode;
//    }
//
//    public void setAnswerCode(int answerCode) {
//        this.answerCode = answerCode;
//    }
//
//    public String getScheList() {
//        return scheList;
//    }
//
//    public void setScheList(String scheList) {
//        this.scheList = scheList;
//    }
//
//    public String getScheStartDate() {
//        return scheStartDate;
//    }
//
//    public void setScheStartDate(String scheStartDate) {
//        this.scheStartDate = scheStartDate;
//    }
//
//    public String getScheEndDate() {
//        return scheEndDate;
//    }
//
//    public void setScheEndDate(String scheEndDate) {
//        this.scheEndDate = scheEndDate;
//    }
//
//    public String getScheStartTime() {
//        return scheStartTime;
//    }
//
//    public void setScheStartTime(String scheStartTime) {
//        this.scheStartTime = scheStartTime;
//    }
//
//    public String getScheEndTime() {
//        return scheEndTime;
//    }
//
//    public void setScheEndTime(String scheEndTime) {
//        this.scheEndTime = scheEndTime;
//    }
//
//    public String getTravelTime() {
//        return travelTime;
//    }
//
//    public void setTravelTime(String travelTime) {
//        this.travelTime = travelTime;
//    }
//
//    public String getScheTime() {
//        return scheTime;
//    }
//
//    public void setScheTime(String scheTime) {
//        this.scheTime = scheTime;
//    }
//
//    @Override
//    public String toString() {
//        return "Schedule{" +
//                "scheCode=" + scheCode +
//                ", regionCode=" + regionCode +
//                ", regionName='" + regionName + '\'' +
//                ", regionDescription='" + regionDescription + '\'' +
//                ", regionImg='" + regionImg + '\'' +
//                ", regionThumbnailImg='" + regionThumbnailImg + '\'' +
//                ", accomCode=" + accomCode +
//                ", accomType='" + accomType + '\'' +
//                ", accomName='" + accomName + '\'' +
//                ", accomAddres='" + accomAddres + '\'' +
//                ", accomImg='" + accomImg + '\'' +
//                ", accomThumbnailImg='" + accomThumbnailImg + '\'' +
//                ", memberCode=" + memberCode +
//                ", authorityCode=" + authorityCode +
//                ", memberName='" + memberName + '\'' +
//                ", memberPassword='" + memberPassword + '\'' +
//                ", memberFullName='" + memberFullName + '\'' +
//                ", memberBirthday='" + memberBirthday + '\'' +
//                ", memberEmail='" + memberEmail + '\'' +
//                ", memberPhone='" + memberPhone + '\'' +
//                ", memberSuspension='" + memberSuspension + '\'' +
//                ", memberDeletion='" + memberDeletion + '\'' +
//                ", memberLike=" + memberLike +
//                ", memberImg='" + memberImg + '\'' +
//                ", memberCreate='" + memberCreate + '\'' +
//                ", memberLeave='" + memberLeave + '\'' +
//                ", memberAnswerCode=" + memberAnswerCode +
//                ", questCode=" + questCode +
//                ", answerCode=" + answerCode +
//                ", scheList='" + scheList + '\'' +
//                ", scheStartDate='" + scheStartDate + '\'' +
//                ", scheEndDate='" + scheEndDate + '\'' +
//                ", scheStartTime='" + scheStartTime + '\'' +
//                ", scheEndTime='" + scheEndTime + '\'' +
//                ", travelTime='" + travelTime + '\'' +
//                ", scheTime='" + scheTime + '\'' +
//                '}';
//    }
//}

package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.entity.MemberAnswer;

@Entity
@Table(name="tbl_schedule")
public class Schedule {

    @Id
    @Column(name="sche_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheCode;

    @ManyToOne
    @JoinColumn(name="region_code", referencedColumnName = "region_code")
    private Region region;

    @ManyToOne
    @JoinColumn(name="accom_code", referencedColumnName = "accom_code")
    private Accommodation accommodation;

    @ManyToOne
    @JoinColumn(name="member_code", referencedColumnName = "member_code")
    private Account account;

    @OneToOne
    @JoinColumn(name="member_answer_code", referencedColumnName = "member_answer_code")
    private MemberAnswer memberAnswer;

    @Column(name="sche_list")
    private String scheList;

    @Column(name="sche_start_date")
    private String scheStartDate;

    @Column(name="sche_end_date")
    private String scheEndDate;

    @Column(name="sche_start_time")
    private String scheStartTime;

    @Column(name="sche_end_time")
    private String scheEndTime;

    @Column(name="travel_time")
    private String travelTime;

    @Column(name="sche_time")
    private String scheTime;

    public Schedule() {
    }

    public Schedule(int scheCode, Region region, Accommodation accommodation, Account account, MemberAnswer memberAnswer, String scheList, String scheStartDate, String scheEndDate, String scheStartTime, String scheEndTime, String travelTime, String scheTime) {
        this.scheCode = scheCode;
        this.region = region;
        this.accommodation = accommodation;
        this.account = account;
        this.memberAnswer = memberAnswer;
        this.scheList = scheList;
        this.scheStartDate = scheStartDate;
        this.scheEndDate = scheEndDate;
        this.scheStartTime = scheStartTime;
        this.scheEndTime = scheEndTime;
        this.travelTime = travelTime;
        this.scheTime = scheTime;
    }

    public int getScheCode() {
        return scheCode;
    }

    public void setScheCode(int scheCode) {
        this.scheCode = scheCode;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Accommodation getAccommodation() {
        return accommodation;
    }

    public void setAccommodation(Accommodation accommodation) {
        this.accommodation = accommodation;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public MemberAnswer getMemberAnswer() {
        return memberAnswer;
    }

    public void setMemberAnswer(MemberAnswer memberAnswer) {
        this.memberAnswer = memberAnswer;
    }

    public String getScheList() {
        return scheList;
    }

    public void setScheList(String scheList) {
        this.scheList = scheList;
    }

    public String getScheStartDate() {
        return scheStartDate;
    }

    public void setScheStartDate(String scheStartDate) {
        this.scheStartDate = scheStartDate;
    }

    public String getScheEndDate() {
        return scheEndDate;
    }

    public void setScheEndDate(String scheEndDate) {
        this.scheEndDate = scheEndDate;
    }

    public String getScheStartTime() {
        return scheStartTime;
    }

    public void setScheStartTime(String scheStartTime) {
        this.scheStartTime = scheStartTime;
    }

    public String getScheEndTime() {
        return scheEndTime;
    }

    public void setScheEndTime(String scheEndTime) {
        this.scheEndTime = scheEndTime;
    }

    public String getTravelTime() {
        return travelTime;
    }

    public void setTravelTime(String travelTime) {
        this.travelTime = travelTime;
    }

    public String getScheTime() {
        return scheTime;
    }

    public void setScheTime(String scheTime) {
        this.scheTime = scheTime;
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "scheCode=" + scheCode +
                ", region=" + region +
                ", accommodation=" + accommodation +
                ", account=" + account +
                ", memberAnswer=" + memberAnswer +
                ", scheList='" + scheList + '\'' +
                ", scheStartDate='" + scheStartDate + '\'' +
                ", scheEndDate='" + scheEndDate + '\'' +
                ", scheStartTime='" + scheStartTime + '\'' +
                ", scheEndTime='" + scheEndTime + '\'' +
                ", travelTime='" + travelTime + '\'' +
                ", scheTime='" + scheTime + '\'' +
                '}';
    }
}