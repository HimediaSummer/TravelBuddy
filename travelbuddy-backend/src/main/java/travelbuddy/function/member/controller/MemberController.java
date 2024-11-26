package travelbuddy.function.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelbuddy.common.ResponseDTO;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.repository.AccountRepository;
import travelbuddy.function.member.service.MemberService;

@RestController
@RequestMapping("/api/v1")
public class MemberController {

	private final MemberService memberService;
	private final AccountRepository accountRepository;
	
	public MemberController(MemberService memberService, AccountRepository accountRepository) {
		this.memberService = memberService;
		this.accountRepository = accountRepository;
	}
	
	@Operation(summary = "회원 조회 요청", description = "회원 한명이 조회됩니다.", tags = { "MemberController" })
	@GetMapping("/members/{memberName}")
	public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable String  memberName) {

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.selectMyInfo(memberName)));
	}

	@Operation(summary = "회원 번호 찾기", description = "회원 아이디로 회원 번호 조회",  tags = { "MemberController" })
	@GetMapping("/memberCode/{memberName}")
	public ResponseEntity<ResponseDTO> getMemberCode(@PathVariable String memberName) {

		int memberCode = memberService.findMemberCodeByMemberName(memberName);

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원번호 찾기 성공", memberCode));
	}
}
