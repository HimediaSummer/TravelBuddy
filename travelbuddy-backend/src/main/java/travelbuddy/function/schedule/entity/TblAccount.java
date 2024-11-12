package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_account")
public class TblAccount {
    @Id
    @Column(name = "member_code", nullable = false)
    private Integer id;

    @Size(max = 20)
    @NotNull
    @Column(name = "member_name", nullable = false, length = 20)
    private String memberName;

    @Size(max = 20)
    @NotNull
    @Column(name = "member_password", nullable = false, length = 20)
    private String memberPassword;

    @Size(max = 20)
    @NotNull
    @Column(name = "member_full_name", nullable = false, length = 20)
    private String memberFullName;

    @NotNull
    @Column(name = "member_birthday", nullable = false)
    private LocalDate memberBirthday;

    @Size(max = 50)
    @NotNull
    @Column(name = "member_email", nullable = false, length = 50)
    private String memberEmail;

    @Size(max = 15)
    @NotNull
    @Column(name = "member_phone", nullable = false, length = 15)
    private String memberPhone;

    @Size(max = 1)
    @NotNull
    @ColumnDefault("'N'")
    @Column(name = "member_suspension", nullable = false, length = 1)
    private String memberSuspension;

    @Size(max = 1)
    @NotNull
    @ColumnDefault("'N'")
    @Column(name = "member_deletion", nullable = false, length = 1)
    private String memberDeletion;

    @Column(name = "member_like")
    private Integer memberLike;

    @Lob
    @Column(name = "member_img")
    private String memberImg;

    @NotNull
    @Column(name = "member_create", nullable = false)
    private LocalDate memberCreate;

    @Column(name = "member_leave")
    private LocalDate memberLeave;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberPassword() {
        return memberPassword;
    }

    public void setMemberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
    }

    public String getMemberFullName() {
        return memberFullName;
    }

    public void setMemberFullName(String memberFullName) {
        this.memberFullName = memberFullName;
    }

    public LocalDate getMemberBirthday() {
        return memberBirthday;
    }

    public void setMemberBirthday(LocalDate memberBirthday) {
        this.memberBirthday = memberBirthday;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public String getMemberPhone() {
        return memberPhone;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone;
    }

    public String getMemberSuspension() {
        return memberSuspension;
    }

    public void setMemberSuspension(String memberSuspension) {
        this.memberSuspension = memberSuspension;
    }

    public String getMemberDeletion() {
        return memberDeletion;
    }

    public void setMemberDeletion(String memberDeletion) {
        this.memberDeletion = memberDeletion;
    }

    public Integer getMemberLike() {
        return memberLike;
    }

    public void setMemberLike(Integer memberLike) {
        this.memberLike = memberLike;
    }

    public String getMemberImg() {
        return memberImg;
    }

    public void setMemberImg(String memberImg) {
        this.memberImg = memberImg;
    }

    public LocalDate getMemberCreate() {
        return memberCreate;
    }

    public void setMemberCreate(LocalDate memberCreate) {
        this.memberCreate = memberCreate;
    }

    public LocalDate getMemberLeave() {
        return memberLeave;
    }

    public void setMemberLeave(LocalDate memberLeave) {
        this.memberLeave = memberLeave;
    }

}