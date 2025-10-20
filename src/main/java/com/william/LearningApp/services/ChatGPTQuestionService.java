package com.william.LearningApp.services;

import com.william.LearningApp.model.ChatGPTQuestion;
import com.william.LearningApp.repositories.ChatGPTRepository;  // <-- Updated repository import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatGPTQuestionService {
    @Value("${openai.api.key}")
    private String apiKey;
    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    private final ChatGPTRepository chatGPTRepository;  // <-- Corrected repository type

    // Constructor injection to avoid the field not being assigned
    @Autowired
    public ChatGPTQuestionService(ChatGPTRepository chatGPTRepository) {
        this.chatGPTRepository = chatGPTRepository;
    }

    // Save or update a ChatGPT question
    public ChatGPTQuestion saveChatGPTQuestion(ChatGPTQuestion chatGPTQuestion) {
        return chatGPTRepository.save(chatGPTQuestion);  // <-- Corrected repository usage
    }

    // Get all ChatGPT questions
    public List<ChatGPTQuestion> getAllChatGPTQuestions() {
        return chatGPTRepository.findAll();  // <-- Corrected repository usage
    }

    // Find ChatGPT questions by topic
    public List<ChatGPTQuestion> getChatGPTQuestionsByTopic(String topic) {
        return chatGPTRepository.findByTopic(topic);  // <-- Corrected repository usage
    }
    public String askOpenAI(String topic, String answer) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        String prompt = "The user wrote an answer to a programming question on the topic '" + topic +
                "'. Please evaluate the following answer and give feedback:\n\n" + answer;

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));
        requestBody.put("max_tokens", 300);
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, entity, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            return "Error contacting OpenAI: " + e.getMessage();
        }
    }
}
