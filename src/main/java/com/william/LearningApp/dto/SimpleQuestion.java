package com.william.LearningApp.dto;

public class SimpleQuestion {
    private String text;
    private String answerRegex;
    private String expectedDisplay; // <-- NEW

    public SimpleQuestion(String text, String answerRegex) {
        this.text = text;
        this.answerRegex = answerRegex;
        this.expectedDisplay = null; // default
    }

    public SimpleQuestion(String text, String answerRegex, String expectedDisplay) {
        this.text = text;
        this.answerRegex = answerRegex;
        this.expectedDisplay = expectedDisplay;
    }

    public String getText() {
        return text;
    }

    public String getAnswerRegex() {
        return answerRegex;
    }

    public String getExpectedDisplay() {
        return expectedDisplay;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setAnswerRegex(String answerRegex) {
        this.answerRegex = answerRegex;
    }

    public void setExpectedDisplay(String expectedDisplay) {
        this.expectedDisplay = expectedDisplay;
    }
}
