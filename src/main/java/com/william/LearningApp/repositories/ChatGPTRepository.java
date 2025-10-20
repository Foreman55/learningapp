package com.william.LearningApp.repositories;


import com.william.LearningApp.model.ChatGPTQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatGPTRepository extends JpaRepository<ChatGPTQuestion, Long> {
    // You can add custom queries if needed, for example:
    List<ChatGPTQuestion> findByTopic(String topic);
}

