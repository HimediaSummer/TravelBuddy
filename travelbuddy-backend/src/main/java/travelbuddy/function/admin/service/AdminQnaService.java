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
import travelbuddy.function.admin.controller.AdminQnaController;
import travelbuddy.function.admin.repository.AdminQnaRepository;
import travelbuddy.function.admin.repository.AdminqnaAnswerRepository;
import travelbuddy.function.community.qnafaq.dto.QnaAnswerDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDetailDTO;
import travelbuddy.function.community.qnafaq.entity.Qna;
import travelbuddy.function.community.qnafaq.entity.QnaAnswer;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminQnaService {

    private static Logger log = LoggerFactory.getLogger(AdminQnaService.class);
    private AdminQnaRepository adminQnaRepository;
    private AdminqnaAnswerRepository adminqnaAnswerRepository;
    private ModelMapper modelMapper;

    @Autowired
    public AdminQnaService(AdminqnaAnswerRepository adminqnaAnswerRepository, AdminQnaRepository adminQnaRepository, ModelMapper modelMapper) {
        this.adminqnaAnswerRepository = adminqnaAnswerRepository;
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

    /*한개의 qna의 정보를 찾는다. 거기에 qna 와 qnaAnswer 두 DTO 정보를 찾는다.*/
    public Object selectQna(int qnaCode) {

        log.info("[AdminQnaService] selectQna() start");

        Qna qna = adminQnaRepository.findById(qnaCode).get();
        QnaAnswer qnaAnswer = adminqnaAnswerRepository.findById(qnaCode).orElse(null);
            QnaDTO qnaDTO = modelMapper.map(qna , QnaDTO.class);
            QnaAnswerDTO qnaAnswerDTO = modelMapper.map(qnaAnswer, QnaAnswerDTO.class);

        if (qnaAnswer != null) {
            qnaAnswer.setQna(qna);
        } else {
            qnaAnswer = null;
        }

            QnaDetailDTO qnaDetailDTO = new QnaDetailDTO(qnaAnswerDTO,qnaDTO);

        log.info("[AdminQnaService] selectQna() end");

        return qnaDetailDTO;
    }

    /*QnaAnswer 를 등록한다.*/
    @Transactional
    public  Object insertQnaAnswer(int qnaCode, QnaAnswerDTO qnaAnswerDTO) {

        QnaAnswer qnaAnswer = modelMapper.map(qnaAnswerDTO, QnaAnswer.class);

        Qna qna = adminQnaRepository.findById(qnaCode).get();

        qnaAnswer.setQna(qna);

        adminqnaAnswerRepository.save(qnaAnswer);

        return modelMapper.map(qnaAnswer, QnaAnswerDTO.class);
    }

    /*QnaAnswer 를 수정한다.*/
    @Transactional
    public Object updateQnaAnswer(int qnaCode, QnaAnswerDTO qnaAnswerDTO) {

        QnaAnswer qnaAnswer = modelMapper.map(qnaAnswerDTO, QnaAnswer.class);

        Qna qna = adminQnaRepository.findById(qnaCode).get();

        qnaAnswer.setQna(qna);

        adminqnaAnswerRepository.save(qnaAnswer);

        return modelMapper.map(qnaAnswer, QnaAnswerDTO.class);
    }

    /*QnaAnswer 를 삭제한다.*/
    @Transactional
    public Object deleteQnaAnswer(int qnaCode) {

        QnaAnswer qnaAnswer = adminqnaAnswerRepository.findById(qnaCode).get();
        adminqnaAnswerRepository.delete(qnaAnswer);

        return (qnaAnswer != null) ? "삭제 성공" : "삭제 실패";

    }
}
