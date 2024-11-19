package travelbuddy.function.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.MemberRepository;

@Service
public class MemberService {

	private static final Logger log = LoggerFactory.getLogger(MemberService.class);
	private final MemberRepository memberRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public MemberService(MemberRepository memberRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.modelMapper = modelMapper;
	}
	
	public Object selectMyInfo(String memberName) {
		log.info("[MemberService] getMyInfo Start =======================");

		Account account = memberRepository.findByMemberName(memberName);


		AccountDTO accountDTO = modelMapper.map(account, AccountDTO.class);

		log.info("[MemberService] getMyInfo End =========================");


		return accountDTO;
	}
}
