package com.william.LearningApp.repositories;

import com.william.LearningApp.model.Question;
import com.william.LearningApp.model.QuestionEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Custom query to find questions by evaluation
    List<Question> findByEvaluation(QuestionEvaluation evaluation);
}
