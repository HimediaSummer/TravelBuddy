package travelbuddy.function.community.qnafaq.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;
import travelbuddy.function.community.qnafaq.entity.FqType;
import travelbuddy.function.community.qnafaq.entity.Qna;
import travelbuddy.function.community.qnafaq.repository.FqTypeRepository;
import travelbuddy.function.community.qnafaq.repository.QnaRepository;

import java.util.List;

@Service
public class QnaService {

    private final static Logger log = LoggerFactory.getLogger(QnaService.class);
    private QnaRepository qnaRepository;
    private FqTypeRepository fqTypeRepository;
    private final ModelMapper modelMapper;

    public QnaService(ModelMapper modelMapper, FqTypeRepository fqTypeRepository, QnaRepository qnaRepository) {
        this.modelMapper = modelMapper;
        this.fqTypeRepository = fqTypeRepository;
        this.qnaRepository = qnaRepository;
    }

    public int selectQnaTotal() {
       return 0;
    }

    public Object selectQnaListWithPaging(Criteria cri) {
        return null;
    }

    public Object selectQnaList() {
        List<Qna> qnaList = qnaRepository.findAll();
        return qnaList.stream().map((Qna) -> modelMapper.map(Qna, QnaDTO.class));
    }

    /*공지 1개의 세부 정보를 확인한다.*/
    public Object selectQna(int qnaCode) {

        log.info("[QnaService] selectQna start");

        Qna qna = qnaRepository.findById(qnaCode).get();

        log.info("[QnaService] selectQna end");

        return modelMapper.map(qna, QnaDTO.class);
    }

    @Transactional
    public Object insertQna(QnaDTO qnaDTO) {

        System.out.println("[insertQna] qnaDTO = " + qnaDTO);

        Qna insertqna = modelMapper.map(qnaDTO, Qna.class);

        FqType fqType = fqTypeRepository.findById(qnaDTO.getFqTypeCode()).orElseThrow(() -> new RuntimeException(("FqType not found")));

        insertqna.setFqType(fqType);
        qnaRepository.save(insertqna);

        return modelMapper.map(insertqna, QnaDTO.class);

    }
}
