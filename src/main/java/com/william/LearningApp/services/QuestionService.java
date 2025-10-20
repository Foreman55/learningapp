package com.william.LearningApp.services;

import com.william.LearningApp.dto.SimpleQuestion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    private static final Logger logger = LoggerFactory.getLogger(QuestionService.class);
    private static final String ANSWER_LOG_CSV_FILE_PATH = "questions.csv";

    public boolean checkAnswer(String regex, String userAnswer) {
        if (regex == null || userAnswer == null) return false;
        return userAnswer.matches(regex);
    }

    public void saveQuestionAnswer(String topic, String answer) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(ANSWER_LOG_CSV_FILE_PATH, true))) {
            writer.write(String.join(",", topic, answer));
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

        public List<SimpleQuestion> loadQuestionsFromCSV(String topic) {
        List<SimpleQuestion> questions = new ArrayList<>();
        String resourcePath = "questions/" + topic + ".csv";
        if (topic.startsWith("linux_")) {
            resourcePath = "questions/linux/" + topic + ".csv";
        } else if (topic.startsWith("german_")) {
            resourcePath = "questions/german/" + topic + ".csv";
        }

        logger.info("📁 Loading CSV for topic: {} from classpath: {}", topic, resourcePath);

        InputStream questionsStream = getClass().getClassLoader().getResourceAsStream(resourcePath);

        // If german questions file is missing, fall back to flashcards CSV and convert rows to questions
        if (questionsStream == null && topic.startsWith("german_")) {
            String flashcardPath = "flashcards/" + topic + ".csv";
            logger.warn("❓ Questions file missing for topic '{}'. Falling back to flashcards at {}", topic, flashcardPath);
            InputStream flashcardStream = getClass().getClassLoader().getResourceAsStream(flashcardPath);
            if (flashcardStream == null) {
                logger.error("❌ Neither questions nor flashcards CSV found for topic: {}", topic);
                return questions;
            }
            return loadQuestionsFromFlashcardsStream(flashcardStream, topic);
        }

        if (questionsStream == null) {
            logger.error("❌ Questions CSV not found on classpath: {}", resourcePath);
            return questions;
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(questionsStream))) {
            String line;
            int lineNumber = 0;

            while ((line = reader.readLine()) != null) {
                lineNumber++;

                // Skip header if it's the first line
                if (lineNumber == 1 && line.toLowerCase().contains("question")) {
                    logger.info("⏭️ Skipping header line");
                    continue;
                }

                // Allow 2 or 3 columns: question, answerRegex, [optionalDisplay]
                String[] row = parseCSVLine(line);
                if (row.length < 2 || row[0].trim().isEmpty() || row[1].trim().isEmpty()) {
                    logger.warn("⚠️ Skipping malformed line {}: '{}'", lineNumber, line);
                    continue;
                }

                SimpleQuestion question;
                if (topic.startsWith("german_") && row.length == 2) {
                    // For German 2-column CSVs, treat second column as display and build exact-match regex
                    String expected = row[1].trim();
                    String regex = "^" + expected
                            .replace("\\", "\\\\")
                            .replace(".", "\\.")
                            .replace("[", "\\[")
                            .replace("]", "\\]")
                            .replace("(", "\\(")
                            .replace(")", "\\)")
                            .replace("?", "\\?")
                            .replace("+", "\\+")
                            .replace("*", "\\*")
                            .replace("^", "\\^")
                            .replace("$", "\\$")
                            + "$";
                    question = new SimpleQuestion(row[0].trim(), regex, expected);
                } else {
                    question = new SimpleQuestion(row[0].trim(), row[1].trim());
                }

                if (row.length > 2 && !row[2].trim().isEmpty()) {
                    question.setExpectedDisplay(row[2].trim());
                }

                questions.add(question);
            }

            logger.info("✅ Loaded {} questions for topic: {}", questions.size(), topic);

        } catch (IOException e) {
            logger.error("❌ Failed to load questions from {}", resourcePath, e);
        }

        return questions;
    }

    private List<SimpleQuestion> loadQuestionsFromFlashcardsStream(InputStream is, String topic) {
        List<SimpleQuestion> questions = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
            String line;
            int lineNumber = 0;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                String trimmed = line.trim();
                if (trimmed.isEmpty()) continue;
                // Skip header variants like front,back
                String lowered = trimmed.toLowerCase();
                if (lowered.startsWith("front,")) continue;

                String[] parts = line.split(",", 2);
                if (parts.length != 2) {
                    logger.warn("⚠️ [{}] Skipping malformed flashcard line {} for topic {}: '{}'", topic, lineNumber, topic, line);
                    continue;
                }
                String front = parts[0].trim().replaceAll("^\"|\"$", "");
                String back = parts[1].trim().replaceAll("^\"|\"$", "");

                // Treat back as the exact expected answer; also include display
                String regex = "^" + back.replace("\\", "\\\\").replace(".", "\\.").replace("[", "\\[")
                        .replace("]", "\\]").replace("(", "\\(").replace(")", "\\)")
                        .replace("?", "\\?").replace("+", "\\+").replace("*", "\\*").replace("^", "\\^")
                        .replace("$", "\\$") + "$";

                SimpleQuestion q = new SimpleQuestion(front, regex, back);
                questions.add(q);
            }
        } catch (IOException e) {
            logger.error("❌ Error reading flashcards stream for topic: {}", topic, e);
        }
        logger.info("✅ Converted {} flashcards to questions for topic: {}", questions.size(), topic);
        return questions;
    }

    private String[] parseCSVLine(String line) {
        List<String> fields = new ArrayList<>();
        boolean inQuotes = false;
        StringBuilder currentField = new StringBuilder();
        
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                fields.add(currentField.toString().trim());
                currentField = new StringBuilder();
            } else {
                currentField.append(c);
            }
        }
        
        // Add the last field
        fields.add(currentField.toString().trim());
        
        return fields.toArray(new String[0]);
    }
}
