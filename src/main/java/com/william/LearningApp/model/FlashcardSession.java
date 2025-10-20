package com.william.LearningApp.model;

import jakarta.persistence.PrePersist;
import jakarta.persistence.Id;
import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
public class FlashcardSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deck;
    private int correct;
    private int notSure;
    private int wrong;

    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    // Getters and setters
}

