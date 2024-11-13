package travelbuddy.function.community.buddy.dto;

public class BuddyTypeDTO {
    private int buddyTypeCode;
    private String buddyTypeName;

    public BuddyTypeDTO() {
    }

    public BuddyTypeDTO(int buddyTypeCode, String buddyTypeName) {
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
        return "BuddyTypeDTO{" +
                "buddyTypeCode=" + buddyTypeCode +
                ", buddyTypeName='" + buddyTypeName + '\'' +
                '}';
    }
}
