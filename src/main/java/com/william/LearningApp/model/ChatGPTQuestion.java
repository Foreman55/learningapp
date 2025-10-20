package com.william.LearningApp.model;
import jakarta.persistence.Id;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chatgpt_questions")  // Ensure the table name matches
public class ChatGPTQuestion {

    @Id  // Mark this field as the primary key for the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-generate values for the ID
    private Long id;

    private String topic;
    private String questionText;
    private String userAnswer;

    @Enumerated(EnumType.STRING)
    private QuestionEvaluation evaluation;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public QuestionEvaluation getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(QuestionEvaluation evaluation) {
        this.evaluation = evaluation;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
