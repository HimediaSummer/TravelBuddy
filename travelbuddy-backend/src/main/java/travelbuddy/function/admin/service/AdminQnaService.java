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
import travelbuddy.function.admin.repository.AdminQnaRepository;
import travelbuddy.function.admin.repository.AdminfqTypeRepository;
import travelbuddy.function.admin.repository.AdminQnaAnswerRepository;
import travelbuddy.function.community.qnafaq.dto.FqTypeDTO;
import travelbuddy.function.community.qnafaq.dto.QnaAnswerDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDetailDTO;
import travelbuddy.function.community.qnafaq.entity.FqType;
import travelbuddy.function.community.qnafaq.entity.Qna;
import travelbuddy.function.community.qnafaq.entity.QnaAnswer;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminQnaService {

    private static Logger log = LoggerFactory.getLogger(AdminQnaService.class);
    private final AdminQnaRepository adminQnaRepository;
    private final AdminQnaAnswerRepository adminQnaAnswerRepository;
    private final AdminfqTypeRepository adminFqTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AdminQnaService(AdminQnaRepository adminQnaRepository, AdminQnaAnswerRepository adminQnaAnswerRepository, AdminfqTypeRepository adminFqTypeRepository, ModelMapper modelMapper) {
        this.adminQnaRepository = adminQnaRepository;
        this.adminQnaAnswerRepository = adminQnaAnswerRepository;
        this.adminFqTypeRepository = adminFqTypeRepository;
        this.modelMapper = modelMapper;
    }

    /*qna 총 개수를 찾는다.*/
    public int selectQnaTotal() {

        log.info("[AdminQnaService] selectQnaTotal() Start");

        /*페이징 처리 결과를 Page 타입으로 반환 받는다*/
        List<Qna> qnaList = adminQnaRepository.findAll();

        log.info("[AdminQnaService] selectQnaTotal() End");

        return qnaList.size();

    }
    /*qna 리스트와 paging 처리를 함께 한다.*/
    public Object selectQnaListWithPaging(Criteria cri) {

        log.info("[AdminQnaService] selectQnaListWithPaging() Start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("qnaCode").descending());

        Page<Qna> result = adminQnaRepository.findAll(paging);
        List<Qna> qnaList = (List<Qna>)result.getContent();

        log.info("[AdminQnaService] selectQnaListWithPaging() End");

        return qnaList.stream().map(qna -> {
            QnaDTO qnaDTO = modelMapper.map(qna, QnaDTO.class);
            qnaDTO.setMemberCode(qna.getAccount().getMemberCode());

            QnaAnswer qnaAnswer = adminQnaAnswerRepository.findByQna(qna);
            QnaAnswerDTO qnaAnswerDTO = modelMapper.map(qnaAnswer, QnaAnswerDTO.class);

            QnaDetailDTO qnaDetailDTO = new QnaDetailDTO(qnaAnswerDTO, qnaDTO);
            return qnaDetailDTO;
        }).collect(Collectors.toList());
    }

    /*전체 qna 리스트를 찾는다.*/
    public Object selectQnaList() {
        List<Qna> qnaList = adminQnaRepository.findAll();
        return qnaList.stream().map(Qna -> modelMapper.map(Qna, QnaDTO.class)).collect(Collectors.toList());
    }

    /*한개의 qna의 정보를 찾는다. 거기에 qna 와 qnaAnswer 두 DTO 정보를 찾는다.*/
    public Object selectQna(int qnaCode) {

        log.info("[AdminQnaService] selectQna() start");

        Qna qna = adminQnaRepository.findById(qnaCode).get();
        QnaAnswer qnaAnswer = adminQnaAnswerRepository.findByQna(qna);

        QnaDTO qnaDTO = modelMapper.map(qna , QnaDTO.class);
        qnaDTO.setMemberCode(qna.getAccount().getMemberCode());
        QnaAnswerDTO qnaAnswerDTO = modelMapper.map(qnaAnswer, QnaAnswerDTO.class);

        QnaDetailDTO qnaDetailDTO = new QnaDetailDTO(qnaAnswerDTO,qnaDTO);

        log.info("[AdminQnaService] selectQna() end");

        return qnaDetailDTO;
    }

    /*QnaAnswer 를 등록한다. 이미 존재하는 QnaAnswer 의 contents 와 create 에 null 값이 존재하여,
    데이터 삽입이 아닌 해당 code 들의 null 에 값을 update 해야한다. 유니크 중복이 걸려서 해당 qna 의 qna 코드는 지워야한다*/
    @Transactional
    public  Object insertQnaAnswer(int qnaCode, QnaAnswerDTO qnaAnswerDTO) {

        Qna qna = adminQnaRepository.findById(qnaCode).get();

        QnaAnswer deleteAnswer = adminQnaAnswerRepository.findByQna(qna);
        adminQnaAnswerRepository.delete(deleteAnswer);

        QnaAnswer qnaAnswer = modelMapper.map(qnaAnswerDTO, QnaAnswer.class);
        qnaAnswer.setQna(qna);
        adminQnaAnswerRepository.save(qnaAnswer);

        return modelMapper.map(qnaAnswer, QnaAnswerDTO.class);
    }

    /*QnaAnswer 를 수정한다.*/
    @Transactional
    public Object updateQnaAnswer(int qnaCode, QnaAnswerDTO qnaAnswerDTO) {

        QnaAnswer qnaAnswer = modelMapper.map(qnaAnswerDTO, QnaAnswer.class);

        Qna qna = adminQnaRepository.findById(qnaCode).get();

        qnaAnswer.setQna(qna);

        adminQnaAnswerRepository.save(qnaAnswer);

        return modelMapper.map(qnaAnswer, QnaAnswerDTO.class);
    }

    /*QnaAnswer 를 삭제한다. ( 다시 contents 와 create 를 null 로 변경한다.)*/
    @Transactional
    public Object deleteQnaAnswer(int qnaCode) {

        QnaAnswer qnaAnswer = adminQnaAnswerRepository.findById(qnaCode).get();
        qnaAnswer.setAnsContents(null);
        qnaAnswer.setAnsCreate(null);
        adminQnaAnswerRepository.save(qnaAnswer);

        return (qnaAnswer.getAnsContents() == null) ? "삭제 성공" : "삭제 실패";

    }

    public Object selectFqType() {
        List<FqType> fqTypeList = adminFqTypeRepository.findAll();
        return fqTypeList.stream().map(FqType ->modelMapper.map(FqType, FqTypeDTO.class)).collect(Collectors.toList());
    }
}
