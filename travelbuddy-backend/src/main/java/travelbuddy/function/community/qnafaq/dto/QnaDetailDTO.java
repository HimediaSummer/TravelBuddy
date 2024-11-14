package travelbuddy.function.community.qnafaq.dto;

public class QnaDetailDTO {

    private QnaDTO qnaDTO;      // qnaDTO 정보
    private QnaAnswerDTO qnaAnswerDTO;  // qnaAnswerDTO 정보

    public QnaDetailDTO() {
    }

    public QnaDetailDTO(QnaAnswerDTO qnaAnswerDTO, QnaDTO qnaDTO) {
        this.qnaAnswerDTO = qnaAnswerDTO;
        this.qnaDTO = qnaDTO;
    }

    public QnaAnswerDTO getQnaAnswerDTO() {
        return qnaAnswerDTO;
    }

    public void setQnaAnswerDTO(QnaAnswerDTO qnaAnswerDTO) {
        this.qnaAnswerDTO = qnaAnswerDTO;
    }

    public QnaDTO getQnaDTO() {
        return qnaDTO;
    }

    public void setQnaDTO(QnaDTO qnaDTO) {
        this.qnaDTO = qnaDTO;
    }

    @Override
    public String toString() {
        return "QnaDetailDTO{" +
                "qnaAnswerDTO=" + qnaAnswerDTO +
                ", qnaDTO=" + qnaDTO +
                '}';
    }
}
