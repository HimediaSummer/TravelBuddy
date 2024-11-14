package travelbuddy.function.qestion.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tbl_answer")
public class TblAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_code", nullable = false)
    private Integer id;

    @NotNull
    @Lob
    @Column(name = "answer", nullable = false)
    private String answer;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "quest_code", nullable = false)
    private TblQuestionnaire questCode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public TblQuestionnaire getQuestCode() {
        return questCode;
    }

    public void setQuestCode(TblQuestionnaire questCode) {
        this.questCode = questCode;
    }

    public TblAnswer() {
    }

    public TblAnswer(Integer id, String answer, TblQuestionnaire questCode) {
        this.id = id;
        this.answer = answer;
        this.questCode = questCode;
    }

    @Override
    public String toString() {
        return "TblAnswer{" +
                "id=" + id +
                ", answer='" + answer + '\'' +
                ", questCode=" + questCode +
                '}';
    }
}