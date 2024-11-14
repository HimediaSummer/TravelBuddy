package travelbuddy.function.schedule.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.entity.MemberAnswer;

import java.sql.Time;
import java.util.Date;

@Entity
@Table(name="tbl_schedule")
public class Schedule {

    @Id
    @Column(name="sche_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheCode;

    @ManyToOne
    @JoinColumn(name="region_code")
    private Region region;

    @ManyToOne
    @JoinColumn(name="accom_code")
    private Accommodation accommodation;

    @ManyToOne
    @JoinColumn(name="member_code")
    private Account account;

    @ManyToOne
    @JoinColumn(name="member_answer_code")
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

}