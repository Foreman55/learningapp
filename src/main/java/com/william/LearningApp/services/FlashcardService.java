package com.william.LearningApp.services;

import com.william.LearningApp.model.Flashcard;
import com.william.LearningApp.model.FlashcardEvaluation;
import com.william.LearningApp.repositories.FlashcardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class FlashcardService {
    private static final Logger logger = LoggerFactory.getLogger(FlashcardService.class);
    
    @Autowired
    private FlashcardRepository flashcardRepository;
    // Save or update a flashcard
    public Flashcard saveFlashcard(Flashcard flashcard) {
        return flashcardRepository.save(flashcard);
    }

    // Get all flashcards
    public List<Flashcard> getAllFlashcards() {
        return flashcardRepository.findAll();
    }
    // Find flashcards by evaluation status
    public List<Flashcard> loadFlashcardsFromCSV(String topic) {
        List<Flashcard> flashcards = new ArrayList<>();
        String filePath = "flashcards/" + topic + ".csv"; // relative to resources folder

        logger.info("📂 Trying to load: {}", filePath);

        InputStream is = getClass().getClassLoader().getResourceAsStream(filePath);
        if (is == null) {
            logger.error("❌ File not found in resources: {}", filePath);
            return flashcards; // Return empty list to avoid null
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Skip header rows like "front,back" or "Front,Back"
                String lowered = line.trim().toLowerCase();
                if (lowered.startsWith("front,") || lowered.startsWith("" + "frontside")) {
                    continue;
                }
                String[] parts = line.split(",", 2);
                if (parts.length == 2) {
                    String front = parts[0].trim().replaceAll("^\"|\"$", "");
                    String back = parts[1].trim().replaceAll("^\"|\"$", "");
                    flashcards.add(new Flashcard(front, back));
                } else {
                    logger.warn("⚠️ Invalid line (missing comma): {}", line);
                }
            }
        } catch (IOException e) {
            logger.error("❌ Error reading file: {}", filePath, e);
        }

        logger.info("✅ Loaded {} flashcards for topic: {}", flashcards.size(), topic);
        return flashcards;
    }
    public List<Flashcard> getFlashcardsByTopic(String topic) {
        return loadFlashcardsFromCSV(topic);
    }
}

