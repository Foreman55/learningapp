package com.william.LearningApp.repositories;


import com.william.LearningApp.model.Flashcard;
import com.william.LearningApp.model.FlashcardEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
     List<Flashcard> findByEvaluation(FlashcardEvaluation evaluation);
}

