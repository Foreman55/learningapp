package com.william.LearningApp.repositories;


import com.william.LearningApp.model.LearningSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface LearningSessionRepository extends JpaRepository<LearningSession, Long> {
    // You can add custom queries if needed, for example:
   List<LearningSession> findBySessionDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}

