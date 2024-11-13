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
import travelbuddy.function.member.entity.AccountEntity;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminAccountService {

    private static final Logger log = LoggerFactory.getLogger(AdminAccountService.class);
    private final AdminAccountRepository adminAccountRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AdminAccountService(AdminAccountRepository adminAccountRepository, ModelMapper modelMapper) {
        this.adminAccountRepository = adminAccountRepository;
        this.modelMapper = modelMapper;
    }

    /*회원의 총 수를 찾는다.*/
    public int selectMemberTotal() {
        log.info("[AdminAccountService] selectMemberTotal() Start");

        /*페이징 처리 결과를 Page 타입으로 반환 받는다*/
        List<AccountEntity> memberList = adminAccountRepository.findBymemberDeletion("N");

        log.info("[AdminAccountService] selectMemberTotal() End");

        return memberList.size();

    }

    /*회원의 리스트 와 paging 처리를 함께 한다.*/
    public Object selectMemberListWithPaging(Criteria cri) {

        log.info("[AdminAccountService] selectMemberListWithPaging() Start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("productCode").descending());

        Page<AccountEntity> result = adminAccountRepository.findBymemberDeletion("N", paging);
        List<AccountEntity> memberList = (List<AccountEntity>)result.getContent();

        log.info("[AdminAccountService] selectMemberListWithPaging() End");

        return memberList.stream().map(AccountEntity -> modelMapper.map(AccountEntity, AccountDTO.class)).collect(Collectors.toList());
    }

    /*전체 회원 리스트를 찾는다.*/
    public Object selectMemberList() {
        List<AccountEntity> memberList = adminAccountRepository.findBymemberDeletion("N");
        return memberList.stream().map(AccountEntity -> modelMapper.map(AccountEntity, AccountDTO.class)).collect(Collectors.toList());
    }

    /*한명의 회원의 정보를 찾는다.*/
    public  Object selectMember(int memberCode) {

        log.info("[AdminAccountService] selectMember() start");

        AccountEntity member = adminAccountRepository.findById(memberCode).get();

        log.info("[AdminAccountService] selectMember() end");

        return modelMapper.map(member, AccountEntity.class);
    }
}
