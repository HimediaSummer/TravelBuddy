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

    int scheCode;
    Region region;
    Accommodation accommodation;
    Account account;
    MemberAnswer memberAnswer;
    String scheList;
    String scheStartDate;
    String scheEndDate;
    String travelTime;
    String scheTime;

}