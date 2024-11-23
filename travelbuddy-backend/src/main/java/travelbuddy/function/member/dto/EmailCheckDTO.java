package travelbuddy.function.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;



@Data
public class EmailCheckDTO {
    @Email
    @NotEmpty(message = "이메일을 입력해 주세요")
    private String email;

    @NotEmpty(message = "인증 번호를 입력해 주세요")
    private String authNum;

    public EmailCheckDTO() {
    }

    public EmailCheckDTO(String email, String authNum) {
        this.email = email;
        this.authNum = authNum;
    }

    public @Email @NotEmpty(message = "이메일을 입력해 주세요") String getEmail() {
        return email;
    }

    public void setEmail(@Email @NotEmpty(message = "이메일을 입력해 주세요") String email) {
        this.email = email;
    }

    public @NotEmpty(message = "인증 번호를 입력해 주세요") String getAuthNum() {
        return authNum;
    }

    public void setAuthNum(@NotEmpty(message = "인증 번호를 입력해 주세요") String authNum) {
        this.authNum = authNum;
    }

    @Override
    public String toString() {
        return "EmailCheckDTO{" +
                "email='" + email + '\'' +
                ", authNum='" + authNum + '\'' +
                '}';
    }
}