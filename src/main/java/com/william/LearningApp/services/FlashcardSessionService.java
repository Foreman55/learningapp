package com.william.LearningApp.services;

import com.william.LearningApp.model.FlashcardSession;
import com.william.LearningApp.repositories.FlashcardSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashcardSessionService {
    @Autowired
    private FlashcardSessionRepository repository;

    public FlashcardSession save(FlashcardSession session) {
        return repository.save(session);
    }

    public List<FlashcardSession> getAll() {
        return repository.findAll();
    }


    public FlashcardSession saveSession(FlashcardSession session) {
        return repository.save(session);
    }

    public List<FlashcardSession> getAllSessions() {
        return repository.findAll();
    }
}

