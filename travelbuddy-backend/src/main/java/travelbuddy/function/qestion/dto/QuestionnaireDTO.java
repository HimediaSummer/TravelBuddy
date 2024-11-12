package travelbuddy.function.qestion.dto;

public class QuestionnaireDTO {

    private int questCode;
    private String question;
    private int themeCode;

    public QuestionnaireDTO() {
    }

    public QuestionnaireDTO(int questCode, String question, int themeCode) {
        this.questCode = questCode;
        this.question = question;
        this.themeCode = themeCode;
    }

    public int getQuestCode() {
        return questCode;
    }

    public void setQuestCode(int questCode) {
        this.questCode = questCode;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getThemeCode() {
        return themeCode;
    }

    public void setThemeCode(int themeCode) {
        this.themeCode = themeCode;
    }

    @Override
    public String toString() {
        return "QuestionnaireDTO{" +
                "questCode=" + questCode +
                ", question='" + question + '\'' +
                ", themeCode=" + themeCode +
                '}';
    }
}
