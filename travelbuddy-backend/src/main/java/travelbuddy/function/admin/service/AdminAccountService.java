package travelbuddy.function.admin.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import travelbuddy.common.Criteria;
import travelbuddy.function.admin.repository.AdminAccountRepository;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.AccountRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminAccountService {

    private static final Logger log = LoggerFactory.getLogger(AdminAccountService.class);
    private final AdminAccountRepository adminAccountRepository;
    private final ModelMapper modelMapper;
    private final AccountRepository accountRepository;

    @Autowired
    public AdminAccountService(AdminAccountRepository adminAccountRepository, ModelMapper modelMapper, AccountRepository accountRepository) {
        this.adminAccountRepository = adminAccountRepository;
        this.modelMapper = modelMapper;
        this.accountRepository = accountRepository;
    }


    /*회원의 총 수를 찾는다.*/
    public int selectMemberTotal() {
        log.info("[AdminAccountService] selectMemberTotal() Start");

        /*페이징 처리 결과를 Page 타입으로 반환 받는다*/
        List<Account> memberList = adminAccountRepository.findBymemberDeletion("N");

        log.info("[AdminAccountService] selectMemberTotal() End");

        return memberList.size();

    }

    /*회원의 리스트 와 paging 처리를 함께 한다.*/
    public Object selectMemberListWithPaging(Criteria cri) {

        log.info("[AdminAccountService] selectMemberListWithPaging() Start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("memberCode").descending());

        Page<Account> result = adminAccountRepository.findAll(paging);
        List<Account> memberList = (List<Account>)result.getContent();

        log.info("[AdminAccountService] selectMemberListWithPaging() End");

        return memberList.stream().map(Account -> modelMapper.map(Account, AccountDTO.class)).collect(Collectors.toList());
    }

    /*전체 회원 리스트를 찾는다.*/
    public Object selectMemberList() {
        List<Account> memberList = adminAccountRepository.findBymemberDeletion("N");
        return memberList.stream().map(Account -> modelMapper.map(Account, AccountDTO.class)).collect(Collectors.toList());
    }

    /*한명의 회원의 정보를 찾는다.*/
    public  Object selectMember(int memberCode) {

        log.info("[AdminAccountService] selectMember() start");

        Account member = adminAccountRepository.findById(memberCode).get();

        log.info("[AdminAccountService] selectMember() end");

        return modelMapper.map(member, AccountDTO.class);
    }

    /*상태정보들을 가져오려고 만들었는데 아직 미정상태.*/
    public Object checkMemberStatus() {

        log.info("[AdminAccountService] checkMemberStatus() start");


        log.info("[AdminAccountService] checkMemberStatus() end");

        return null;
    }
    /* 상세페이지 안의 [정지] 버튼을 눌렀을때  Y , N  변화시킬 메소드 */
    public  Object toggleMemberSuspension(int memberCode) {

        log.info("[AdminAccountService] selectMemberSuspension() start");

        Account member = adminAccountRepository.findById(memberCode).orElse(null);

        /*update 를 위한 엔티티 값 수정*/
        if (member != null) {
            if ("Y".equals((member.getMemberSuspension()))) {
                member.setMemberSuspension("N");
            } else {
                member.setMemberSuspension("Y");
            }
            adminAccountRepository.save(member);
        }
        log.info("[AdminAccountService] selectMemberSuspension() end");

        return modelMapper.map(member, AccountDTO.class);
    }

    /* 상세페이지 안의 [탈퇴] 버튼을 눌렀을때 Y , N  변화시킬 메소드 */
    public Object toggleMemberDelesion(int memberCode) {

        log.info("[AdminAccountService] selectMemberDelesion() start");

        Account member = adminAccountRepository.findById(memberCode).orElse(null);

        /*update 를 위한 엔티티 값 수정*/
        if (member != null) {
            if ("Y".equals((member.getMemberDeletion()))) {
                member.setMemberDeletion("N");
            } else {
                member.setMemberDeletion("Y");
            }
            adminAccountRepository.save(member);
        }
        log.info("[AdminAccountService] toggleMemberDelesion() end");

        return modelMapper.map(member, AccountDTO.class);
    }

//    관리자가 이름으로 회원을 검색한다.
//    public Object selectSearchMemberList(String search) {
//
//        List<Account> memberListWithSearchValue = accountRepository.findByMemberFullNameContaining(search);
//
//        return memberListWithSearchValue.stream().map(Account -> modelMapper.map(Account, AccountDTO.class)).collect(Collectors.toList());
//    }
}
