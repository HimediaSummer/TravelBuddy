package travelbuddy.function.community.qnafaq.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.qnafaq.dto.QnaAnswerDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;
import travelbuddy.function.community.qnafaq.dto.QnaDetailDTO;
import travelbuddy.function.community.qnafaq.entity.FqType;
import travelbuddy.function.community.qnafaq.entity.Qna;
import travelbuddy.function.community.qnafaq.entity.QnaAnswer;
import travelbuddy.function.community.qnafaq.repository.FqTypeRepository;
import travelbuddy.function.community.qnafaq.repository.QnaAnswerRepository;
import travelbuddy.function.community.qnafaq.repository.QnaRepository;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.AccountRepository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QnaService {

    private final static Logger log = LoggerFactory.getLogger(QnaService.class);
    private QnaRepository qnaRepository;
    private FqTypeRepository fqTypeRepository;
    private QnaAnswerRepository qnaAnswerRepository;
    private AccountRepository accountRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public QnaService(ModelMapper modelMapper, AccountRepository accountRepository, FqTypeRepository fqTypeRepository, QnaAnswerRepository qnaAnswerRepository, QnaRepository qnaRepository) {
        this.modelMapper = modelMapper;
        this.accountRepository = accountRepository;
        this.fqTypeRepository = fqTypeRepository;
        this.qnaAnswerRepository = qnaAnswerRepository;
        this.qnaRepository = qnaRepository;
    }
//    리스트의 총 합을 구한다.
    public int selectQnaTotal() {
        log.info("[QnaService] selectQnaTotal() Start");

        /*페이징 처리 결과를 Page 타입으로 반환 받는다*/
        List<Qna> qnaList = qnaRepository.findAll();

        log.info("[QnaService] selectQnaTotal() End");

        return qnaList.size();
    }

    /*qna 리스트와 paging 처리를 함께 한다.*/
    public Object selectQnaListWithPaging(Criteria cri) {
        log.info("[AdminQnaService] selectQnaListWithPaging() Start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("qnaCode").descending());

        Page<Qna> result = qnaRepository.findAll(paging);
        List<Qna> qnaList = (List<Qna>)result.getContent();

        log.info("[QnaService] selectQnaListWithPaging() End");

        return qnaList.stream().map(qna -> {
            QnaDTO qnaDTO = modelMapper.map(qna, QnaDTO.class);
            qnaDTO.setMemberCode(qna.getAccount().getMemberCode());


            QnaAnswer qnaAnswer = qnaAnswerRepository.findByQna(qna);
            QnaAnswerDTO qnaAnswerDTO = modelMapper.map(qnaAnswer, QnaAnswerDTO.class);

            QnaDetailDTO qnaDetailDTO = new QnaDetailDTO(qnaAnswerDTO, qnaDTO);
            return qnaDetailDTO;
        }).collect(Collectors.toList());
    }

    // 그냥 값 뽑기 테스트용 메소드
    public Object selectQnaList() {
        List<Qna> qnaList = qnaRepository.findAll();
        return qnaList.stream().map((Qna) -> modelMapper.map(Qna, QnaDTO.class));
    }

    /*문의 1개의 상세 정보를 확인한다.*/
    public Object selectQna(int qnaCode) {

        log.info("[QnaService] selectQna start");

        Qna qna = qnaRepository.findById(qnaCode).get();
        QnaAnswer qnaAnswer = qnaAnswerRepository.findByQna(qna);
        QnaDTO qnaDTO = modelMapper.map(qna , QnaDTO.class);
        QnaAnswerDTO qnaAnswerDTO = modelMapper.map(qnaAnswer, QnaAnswerDTO.class);

        qnaDTO.setMemberCode(qna.getAccount().getMemberCode());

        QnaDetailDTO qnaDetailDTO = new QnaDetailDTO(qnaAnswerDTO,qnaDTO);

        log.info("[AdminQnaService] selectQna() end");

        return qnaDetailDTO;

    }

    /*qna 을 등록한다. 근데 qnaanswer 도 qna code 기준 null (기본값) 로 세팅한다.*/
    @Transactional
    public Object insertQna(QnaDTO qnaDTO) {

//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        int memberCode = Integer.parseInt(userDetails.getUsername());
        FqType fqType = fqTypeRepository.findById(qnaDTO.getFqTypeCode()).orElseThrow();
        Account account = accountRepository.findById(qnaDTO.getMemberCode()).orElseThrow();
        Qna insertqna = modelMapper.map(qnaDTO, Qna.class);
        insertqna.setFqType(fqType);
        insertqna.setAccount(account);
        qnaRepository.save(insertqna);

        QnaAnswer qnaAnswer = new QnaAnswer();
        qnaAnswer.setQna(insertqna);
        qnaAnswer.setAnsContents(null);
        qnaAnswerRepository.save(qnaAnswer);

        return "QnA 입력 성공";

    }

    /*qna 작성글의 내용과 작성일을 수정한다.*/
    @Transactional
    public Object updateQna(int qnaCode, QnaDTO qnaDTO) {

        Qna qna = modelMapper.map(qnaDTO, Qna.class);
        Qna foundQna = qnaRepository.findById(qnaCode).orElse(null);

        foundQna.setQnaContents(qna.getQnaContents());
        foundQna.setQnaCreate(qna.getQnaCreate());

        qnaRepository.save(foundQna);

        return modelMapper.map(foundQna,QnaDTO.class);
    }

    /*본인이 작성한 qna 를 삭제한다. 다만 answer 에 null 이 아닐 경우에는 삭제 할수 없다.*/
    public Object deleteQna(int qnaCode) {

        Qna qna = qnaRepository.findById(qnaCode).get();
        QnaAnswer qnaAnswer = qnaAnswerRepository.findByQna(qna);

        if (qnaAnswer.getAnsCreate() == null) {
            qnaAnswerRepository.delete(qnaAnswer);
            qnaRepository.delete(qna);

            return "문의가 정상적으로 삭제되었습니다.";
        }

        return "답변이 존재하여 삭제가 되지 않습니다.";
    }
}