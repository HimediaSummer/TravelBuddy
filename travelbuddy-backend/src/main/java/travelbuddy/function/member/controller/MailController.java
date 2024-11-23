package travelbuddy.function.member.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Check;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import travelbuddy.function.member.dto.EmailCheckDTO;
import travelbuddy.function.member.dto.EmailRequestDTO;
import travelbuddy.function.member.service.MailSendService;


@RestController
public class MailController {

    private final MailSendService mailService;

    public MailController(MailSendService mailService) {
        this.mailService = mailService;
    }

    @PostMapping ("/mailSend")
    public String mailSend(@RequestBody @Valid EmailRequestDTO emailRequestDTO){
        System.out.println("이메일 인증 이메일 :"+emailRequestDTO.getEmail());

        return mailService.joinEmail(emailRequestDTO.getEmail());
    }

    @PostMapping("/mailauthCheck")
    public String AuthCheck(@RequestBody @Valid EmailCheckDTO emailCheckDTO){
        Boolean Checked=mailService.CheckAuthNum(emailCheckDTO.getEmail(),emailCheckDTO.getAuthNum());
        if(Checked){
            return "ok";
        }
        else{
            throw new NullPointerException("뭔가 잘못!");
        }
    }
}