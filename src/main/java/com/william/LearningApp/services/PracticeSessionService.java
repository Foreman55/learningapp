package com.william.LearningApp.services;

import com.william.LearningApp.model.PracticeSession;
import com.william.LearningApp.repositories.PracticeSessionRepository;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PracticeSessionService {

    @Autowired
    private PracticeSessionRepository repository;



    public PracticeSession saveSession(PracticeSession session) {
        return repository.save(session);
    }
    public List<PracticeSession> getAllSessions() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
    }

}

