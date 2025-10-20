package com.william.LearningApp.model;
import jakarta.persistence.Id;
import jakarta.persistence.*;


import java.time.LocalDateTime;

@Entity
@Table(name = "learning_sesssions")  // Ensure the table name matches

public class LearningSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime sessionDate = LocalDateTime.now();
    private Integer flashcardsReviewed = 0;
    private Integer questionsAnswered = 0;
    private Integer chatgptQuestionsAnswered = 0;
    private Integer timeSpent;  // in minutes

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDateTime sessionDate) {
        this.sessionDate = sessionDate;
    }

    public Integer getFlashcardsReviewed() {
        return flashcardsReviewed;
    }

    public void setFlashcardsReviewed(Integer flashcardsReviewed) {
        this.flashcardsReviewed = flashcardsReviewed;
    }

    public Integer getQuestionsAnswered() {
        return questionsAnswered;
    }

    public void setQuestionsAnswered(Integer questionsAnswered) {
        this.questionsAnswered = questionsAnswered;
    }

    public Integer getChatgptQuestionsAnswered() {
        return chatgptQuestionsAnswered;
    }

    public void setChatgptQuestionsAnswered(Integer chatgptQuestionsAnswered) {
        this.chatgptQuestionsAnswered = chatgptQuestionsAnswered;
    }

    public Integer getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(Integer timeSpent) {
        this.timeSpent = timeSpent;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

