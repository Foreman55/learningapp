package com.william.LearningApp.repositories;

import com.william.LearningApp.model.FlashcardSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardSessionRepository extends JpaRepository<FlashcardSession, Long> {}

