package travelbuddy.function.community.buddy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_buddy_type")
public class BuddyType {

    @Id
    @Column(name = "buddy_type_code")
    private int buddyTypeCode;

    @Column(name = "buddy_type_name")
    private String buddyTypeName;

    public BuddyType() {
    }

    public BuddyType(int buddyTypeCode, String buddyTypeName) {
        this.buddyTypeCode = buddyTypeCode;
        this.buddyTypeName = buddyTypeName;
    }

    public int getBuddyTypeCode() {
        return buddyTypeCode;
    }

    public void setBuddyTypeCode(int buddyTypeCode) {
        this.buddyTypeCode = buddyTypeCode;
    }

    public String getBuddyTypeName() {
        return buddyTypeName;
    }

    public void setBuddyTypeName(String buddyTypeName) {
        this.buddyTypeName = buddyTypeName;
    }

    @Override
    public String toString() {
        return "BuddyType{" +
                "buddyTypeCode=" + buddyTypeCode +
                ", buddyTypeName='" + buddyTypeName + '\'' +
                '}';
    }
}
