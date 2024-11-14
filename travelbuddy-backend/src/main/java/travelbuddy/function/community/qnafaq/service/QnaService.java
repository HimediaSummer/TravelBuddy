package travelbuddy.function.community.qnafaq.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.qnafaq.dto.QnaDTO;
import travelbuddy.function.community.qnafaq.entity.Qna;
import travelbuddy.function.community.qnafaq.repository.QnaRepository;

import java.util.List;

@Service
public class QnaService {

    private QnaRepository qnaRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public QnaService(QnaRepository qnaRepository,
                      ModelMapper modelMapper) {
        this.qnaRepository = qnaRepository;
        this.modelMapper = modelMapper;
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

        return null;
    }
}
