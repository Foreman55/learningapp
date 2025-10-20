package com.william.LearningApp.controllers;

import com.william.LearningApp.model.FlashcardSession;
import com.william.LearningApp.services.FlashcardSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class TemplateController {
    @Autowired
    private FlashcardSessionService flashcardSessionService;
    @GetMapping("/chatgpt-questions")
    public String showChatGPTPage() {
        return "chatgpt-questions"; // must match a `chatgpt-questions.html` file
    }
    @GetMapping("/questions")
    public String showQuestionsPage() {
        return "questions";  // this matches templates/questions.html
    }
    @GetMapping("/summaries")
    public String showSummariesPage() {
        return "summaries";  // this matches templates/summaries.html
    }
    @PostMapping("/api/flashcard-sessions/save")
    public ResponseEntity<?> saveFlashcardSession(@RequestBody FlashcardSession session) {
        return ResponseEntity.ok(flashcardSessionService.saveSession(session));
    }
    @GetMapping("/api/flashcard-sessions/history")
    public List<FlashcardSession> getFlashcardSessionHistory() {
        return flashcardSessionService.getAllSessions();
    }
    @GetMapping("/flashcards")
    public String showFlashcardPage() {
        return "flashcards"; // No ".html" extension here
    }

    @GetMapping("/practice-history")
    public String showPracticeHistory() {
        return "practice-history"; // No ".html" extension here
    }

    @GetMapping("/german")
    public String showGermanPage() {
        return "german"; // No ".html" extension here
    }

    @GetMapping("/linux")
    public String showLinuxPage() {
        return "linux"; // No ".html" extension here
    }

    @GetMapping("/linux-questions")
    public String showLinuxQuestionsPage() {
        return "linux-questions"; // No ".html" extension here
    }

    @GetMapping("/sql-sandbox")
    public String showSqlSandboxPage() {
        return "sql-sandbox"; // No ".html" extension here
    }

}
