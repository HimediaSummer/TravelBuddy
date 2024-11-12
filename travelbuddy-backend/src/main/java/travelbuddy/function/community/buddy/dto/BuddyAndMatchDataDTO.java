package travelbuddy.function.community.buddy.dto;

import travelbuddy.function.community.buddy.entity.Buddy;

public class BuddyAndMatchDataDTO {
    private int buddyMatchCode;
    private Buddy buddy;
    private String applyId;

    public BuddyAndMatchDataDTO() {
    }

    public BuddyAndMatchDataDTO(int buddyMatchCode, Buddy buddy, String applyId) {
        this.buddyMatchCode = buddyMatchCode;
        this.buddy = buddy;
        this.applyId = applyId;
    }

    public int getBuddyMatchCode() {
        return buddyMatchCode;
    }

    public void setBuddyMatchCode(int buddyMatchCode) {
        this.buddyMatchCode = buddyMatchCode;
    }

    public Buddy getBuddy() {
        return buddy;
    }

    public void setBuddy(Buddy buddy) {
        this.buddy = buddy;
    }

    public String getApplyId() {
        return applyId;
    }

    public void setApplyId(String applyId) {
        this.applyId = applyId;
    }

    @Override
    public String toString() {
        return "BuddyAndMatchDataDTO{" +
                "buddyMatchCode=" + buddyMatchCode +
                ", buddy=" + buddy +
                ", applyId='" + applyId + '\'' +
                '}';
    }
}
