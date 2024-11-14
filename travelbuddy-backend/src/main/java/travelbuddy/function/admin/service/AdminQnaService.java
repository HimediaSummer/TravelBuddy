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
import travelbuddy.function.admin.controller.AdminQnaController;
import travelbuddy.function.admin.repository.AdminQnaRepository;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;
import travelbuddy.function.community.qnafaq.entity.Qna;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminQnaService {

    private static Logger log = LoggerFactory.getLogger(AdminQnaService.class);
    private AdminQnaRepository adminQnaRepository;
    private ModelMapper modelMapper;

    @Autowired
    public AdminQnaService(AdminQnaRepository adminQnaRepository, ModelMapper modelMapper) {
        this.adminQnaRepository = adminQnaRepository;
        this.modelMapper = modelMapper;
    }

    /*qna 총 개수를 찾는다.*/
    public int selectQnaTotal() {

        log.info("[AdminQnaService] selectQnaTotal() Start");

        /*페이징 처리 결과를 Page 타입으로 반환 받는다*/
        List<Qna> memberList = adminQnaRepository.findAll();

        log.info("[AdminQnaService] selectQnaTotal() End");

        return memberList.size();

    }
    /*qna 리스트와 paging 처리를 함께 한다.*/
    public Object selectQnaListWithPaging(Criteria cri) {

        log.info("[AdminQnaService] selectQnaListWithPaging() Start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("productCode").descending());

        Page<Qna> result = adminQnaRepository.findAll(paging);
        List<Qna> memberList = (List<Qna>)result.getContent();

        log.info("[AdminQnaService] selectQnaListWithPaging() End");

        return memberList.stream().map(Qna -> modelMapper.map(Qna, QnaDTO.class)).collect(Collectors.toList());
    }

    /*전체 qna 리스트를 찾는다.*/
    public Object selectQnaList() {
        List<Qna> qnaList = adminQnaRepository.findAll();
        System.out.println("qnaList = " + qnaList);
        return qnaList.stream().map(Qna -> modelMapper.map(Qna, QnaDTO.class)).collect(Collectors.toList());
    }

    /*한개의 qna의 정보를 찾는다.*/
    public Object selectQna(int qnaCode) {

        log.info("[AdminQnaService] selectQna() start");

        Qna qna = adminQnaRepository.findById(qnaCode).get();

        log.info("[AdminQnaService] selectQna() end");

        return modelMapper.map(qna, QnaDTO.class);
    }
}
