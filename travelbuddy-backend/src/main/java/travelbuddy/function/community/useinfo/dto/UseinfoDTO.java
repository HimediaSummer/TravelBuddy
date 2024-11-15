package travelbuddy.function.community.useinfo.dto;

public class UseinfoDTO {

    private int useinfoCode;            // 사용설명서코드
    private String useinfoTitle;        // 사용설명서제목
    private String useinfoContents;     // 사용설명서내용
    private String useinfoCreate;       // 등록일시
    private int useinfoCount;           // 조회수
    private String useinfoImg;          // 이미지경로
    private String useinfoAt;           // 은폐여부

    public UseinfoDTO() {
    }

    public UseinfoDTO(String useinfoAt, int useinfoCode, String useinfoContents, int useinfoCount, String useinfoCreate, String useinfoImg, String useinfoTitle) {
        this.useinfoAt = useinfoAt;
        this.useinfoCode = useinfoCode;
        this.useinfoContents = useinfoContents;
        this.useinfoCount = useinfoCount;
        this.useinfoCreate = useinfoCreate;
        this.useinfoImg = useinfoImg;
        this.useinfoTitle = useinfoTitle;
    }

    public String getUseinfoAt() {
        return useinfoAt;
    }

    public void setUseinfoAt(String useinfoAt) {
        this.useinfoAt = useinfoAt;
    }

    public int getUseinfoCode() {
        return useinfoCode;
    }

    public void setUseinfoCode(int useinfoCode) {
        this.useinfoCode = useinfoCode;
    }

    public String getUseinfoContents() {
        return useinfoContents;
    }

    public void setUseinfoContents(String useinfoContents) {
        this.useinfoContents = useinfoContents;
    }

    public int getUseinfoCount() {
        return useinfoCount;
    }

    public void setUseinfoCount(int useinfoCount) {
        this.useinfoCount = useinfoCount;
    }

    public String getUseinfoCreate() {
        return useinfoCreate;
    }

    public void setUseinfoCreate(String useinfoCreate) {
        this.useinfoCreate = useinfoCreate;
    }

    public String getUseinfoImg() {
        return useinfoImg;
    }

    public void setUseinfoImg(String useinfoImg) {
        this.useinfoImg = useinfoImg;
    }

    public String getUseinfoTitle() {
        return useinfoTitle;
    }

    public void setUseinfoTitle(String useinfoTitle) {
        this.useinfoTitle = useinfoTitle;
    }

    @Override
    public String toString() {
        return "UseinfoDTO{" +
                "useinfoAt='" + useinfoAt + '\'' +
                ", useinfoCode=" + useinfoCode +
                ", useinfoTitle='" + useinfoTitle + '\'' +
                ", useinfoContents='" + useinfoContents + '\'' +
                ", useinfoCreate='" + useinfoCreate + '\'' +
                ", useinfoCount=" + useinfoCount +
                ", useinfoImg='" + useinfoImg + '\'' +
                '}';
    }
}
