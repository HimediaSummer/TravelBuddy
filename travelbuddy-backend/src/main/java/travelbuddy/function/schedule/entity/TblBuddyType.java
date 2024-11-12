package travelbuddy.function.schedule.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tbl_buddy_type")
public class TblBuddyType {
    @Id
    @Column(name = "buddy_type_code", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "buddy_type_name", nullable = false, length = 50)
    private String buddyTypeName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBuddyTypeName() {
        return buddyTypeName;
    }

    public void setBuddyTypeName(String buddyTypeName) {
        this.buddyTypeName = buddyTypeName;
    }

}