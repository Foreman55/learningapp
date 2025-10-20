package com.william.LearningApp.services;

import com.william.LearningApp.model.LearningSession;
import com.william.LearningApp.repositories.LearningSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LearningSessionService {

    @Autowired
    private LearningSessionRepository learningSessionRepository;

    // Save or update a learning session
    public LearningSession saveLearningSession(LearningSession learningSession) {
        return learningSessionRepository.save(learningSession);
    }

    // Get all learning sessions
    public List<LearningSession> getAllLearningSessions() {
        return learningSessionRepository.findAll();
    }

    // Find learning sessions by date range
    public List<LearningSession> getLearningSessionsByDateRange(LocalDateTime startDate, String endDate) {
        return learningSessionRepository.findBySessionDateBetween(startDate, LocalDateTime.parse(endDate));
    }
}

