package com.william.LearningApp.controllers;

import com.william.LearningApp.dto.SimpleQuestion;
import com.william.LearningApp.model.Flashcard;
import com.william.LearningApp.model.PracticeSession;
import com.william.LearningApp.services.ChatGPTQuestionService;
import com.william.LearningApp.services.FlashcardService;
import com.william.LearningApp.services.PracticeSessionService;
import com.william.LearningApp.services.QuestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LearningController {

    private static final Logger logger = LoggerFactory.getLogger(LearningController.class);

    @Value("${openai.api.key:}")
    private String openaiApiKey;

    @Autowired
    private QuestionService questionService;
    @Autowired
    private PracticeSessionService practiceSessionService;
    @Autowired
    private FlashcardService flashcardService;
    @Autowired
    private ChatGPTQuestionService chatGPTQuestionService;

    // Removed insecure test endpoints that exposed API keys

    @PostMapping("/openai/chat")
    public ResponseEntity<?> callOpenAI(@RequestBody Map<String, Object> request) {
        try {
            // Do not log API keys
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", "Bearer " + openaiApiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
            logger.info("Sending request to OpenAI: {}", request);

            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            logger.info("Received response from OpenAI: {}", response.getBody());

            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException e) {
            logger.error("OpenAI API request failed with status code {}: {}", e.getStatusCode(), e.getResponseBodyAsString());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "OpenAI API request failed");
            errorResponse.put("status", e.getStatusCode().value());
            errorResponse.put("message", e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        } catch (Exception e) {
            logger.error("Unexpected error while calling OpenAI API", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Unexpected server error");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/get-questions")
    public ResponseEntity<Map<String, Object>> getQuestions(@RequestParam String topic) {
        List<SimpleQuestion> questions = questionService.loadQuestionsFromCSV(topic);

        // Extract just the question text if needed
        List<String> questionTexts = questions.stream()
                .map(SimpleQuestion::getText)
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("questions", questionTexts); // or send `questions` directly if frontend supports full structure

        return ResponseEntity.ok(response);
    }


    @PostMapping("/submit-answer")
    public ResponseEntity<Map<String, String>> submitAnswer(@RequestBody Map<String, String> payload) {
        String answer = payload.get("answer");
        String topic = payload.get("topic");

        boolean isCorrect = questionService.checkAnswer(topic, answer);
        String message = isCorrect ? "Correct answer!" : "Incorrect answer.";

        questionService.saveQuestionAnswer(topic, answer);

        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/generate-questions")
    public List<String> generateQuestions(@RequestParam String topic) {
        List<String> questions = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            questions.add("Question " + i + " about " + topic);
        }
        return questions;
    }

    @GetMapping("/generate")
    public List<String> generateChatGPTQuestions(@RequestParam String topic) {
        return List.of("What is Rust?", "How is ownership handled in Rust?");
    }

    @GetMapping("/get-question")
    public Map<String, String> getNextQuestion(@RequestParam String topic, @RequestParam int index) {
        List<SimpleQuestion> questions = questionService.loadQuestionsFromCSV(topic);

        Map<String, String> result = new HashMap<>();
        if (questions.isEmpty()) {
            result.put("text", "No questions available");
            result.put("answerRegex", ".*");
            return result;
        }

        SimpleQuestion q = questions.get(index % questions.size());
        result.put("text", q.getText());
        result.put("answerRegex", q.getAnswerRegex());

        logger.info("🔍 Question {}: text='{}', regex='{}', display='{}'", index, q.getText(), q.getAnswerRegex(), q.getExpectedDisplay());

        if (q.getExpectedDisplay() != null && !q.getExpectedDisplay().isBlank()) {
            result.put("expectedDisplay", q.getExpectedDisplay());
        }

        return result;
    }


    @PostMapping("/evaluate")
    public Map<String, Object> evaluateAnswer(@RequestBody Map<String, String> payload) {
        String userAnswer = payload.get("answer");
        String regex = payload.get("expected");

        logger.info("🔍 Evaluating: userAnswer='{}', regex='{}'", userAnswer, regex);
        boolean correct = userAnswer.matches(regex);
        logger.info("🔍 Result: {}", correct);

        Map<String, Object> result = new HashMap<>();
        result.put("correct", correct);
        return result;
    }

    @PostMapping("/practice-sessions/save")
    public ResponseEntity<?> saveSession(@RequestBody PracticeSession session) {
        return ResponseEntity.ok(practiceSessionService.saveSession(session));
    }

    @GetMapping("/practice-sessions/history")
    public List<PracticeSession> getPracticeHistory() {
        return practiceSessionService.getAllSessions();
    }

    @GetMapping("/flashcards")
    public List<Flashcard> getFlashcardsByTopic(@RequestParam String topic) {
        return flashcardService.getFlashcardsByTopic(topic);
    }
    @PostMapping("/chatgpt")
    public ResponseEntity<String> getChatGPTResponse(@RequestBody Map<String, String> request) {
        String topic = request.get("topic");
        String answer = request.get("answer");

        String response = chatGPTQuestionService.askOpenAI(topic, answer);
        return ResponseEntity.ok(response);
    }
}