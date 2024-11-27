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
import org.springframework.transaction.annotation.Transactional;
import travelbuddy.common.Criteria;
import travelbuddy.function.admin.repository.AdminFaqRepository;
import travelbuddy.function.community.qnafaq.controller.QnaController;
import travelbuddy.function.community.qnafaq.dto.FaqDTO;
import travelbuddy.function.community.qnafaq.entity.Faq;
import travelbuddy.function.community.qnafaq.entity.FqType;
import travelbuddy.function.community.qnafaq.repository.FqTypeRepository;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminFaqService {

    private static final Logger log = LoggerFactory.getLogger(QnaController.class);
    private AdminFaqRepository adminFaqRepository;
    private FqTypeRepository fqTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AdminFaqService(ModelMapper modelMapper, FqTypeRepository fqTypeRepository, AdminFaqRepository adminFaqRepository) {
        this.modelMapper = modelMapper;
        this.fqTypeRepository = fqTypeRepository;
        this.adminFaqRepository = adminFaqRepository;
    }

    //    리스트의 총 합을 구한다.
    public  int selectFaqTotal() {
        log.info("[AdminFaqService] selectFaqTotal() Start");

        /*페이징 처리 결과를 Page 타입으로 반환 받는다*/
        List<Faq> faqList = adminFaqRepository.findAll();

        log.info("[AdminFaqService] selectFaqTotal() End");

        return faqList.size();
    }

    /*Faq 리스트와 paging 처리를 함께 한다.*/
    public Object selectFaqListWithPaging(Criteria cri) {
        log.info("[AdminFaqService] selectFaqListWithPaging() Start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("faqCode").descending());

        Page<Faq> result = adminFaqRepository.findAll(paging);
        List<Faq> faqList = (List<Faq>)result.getContent();

        log.info("[AdminFaqService] selectFaqListWithPaging() End");

        return faqList.stream().map(faq -> {
            FaqDTO faqDTO = modelMapper.map(faq, FaqDTO.class);
            faqDTO.setFqTypeCode(faq.getFqType().getFqTypeCode());
            return faqDTO;
        }).collect(Collectors.toList());
    }

    /*faq 1개를 상세 조회한다.*/
    public Object selectFaq(int faqCode) {
        Faq faq = adminFaqRepository.findById(faqCode).get();
        return modelMapper.map(faq, FaqDTO.class);
    }

    /*Faq 를 등록한다.*/
    @Transactional
    public Object insertFaq(FaqDTO faqDTO) {

//    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//    int memberCode = Integer.parseInt(userDetails.getUsername());
      FqType fqType = fqTypeRepository.findById(faqDTO.getFqTypeCode()).orElseThrow();
      Faq insertfaq = modelMapper.map(faqDTO, Faq.class);
      insertfaq.setFqType(fqType);
      adminFaqRepository.save(insertfaq);
      return (insertfaq != null)? "등록 성공" : "등록 실패";
    }

    /*문의 답변같은 수정으로 진행?*/
    public Object updateFaq(int faqCode, FaqDTO faqDTO) {

//        FqType fqType = fqTypeRepository.findById(faqDTO.getFqTypeCode()).orElseThrow();
        Faq foundFaq = adminFaqRepository.findById(faqCode).get();
        foundFaq.setFaqContents(faqDTO.getFaqContents());
//        foundFaq.setFqType(fqType);
        adminFaqRepository.save(foundFaq);
        return modelMapper.map(foundFaq, FaqDTO.class);
//                (foundFaq != null)? "수정 성공" : "수정 실패";
    }

    /*FAQ 를 삭제한다.*/
    @Transactional
    public Object deleteFaq(int faqCode) {

        int result = 0;
        Faq faq = adminFaqRepository.findById(faqCode).get();

        if(adminFaqRepository.findById(faqCode).isPresent()) {
            adminFaqRepository.delete(faq);
            result = 1;
        }
        return (result > 0) ? "삭제 성공" : "삭제 실패";
    }

    /*관리자가 Faq 제목으로 검색한다.*/
    public Object selectSearchFaqList(String search) {
        List<Faq> faqListWithSearchValue = adminFaqRepository.findByFaqTitleContaining(search);

        return faqListWithSearchValue.stream().map(Faq -> modelMapper.map(Faq, FaqDTO.class)).collect(Collectors.toList());
    }
}
