package com.william.LearningApp;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class LearningAppApplication {

	private static final Logger logger = LoggerFactory.getLogger(LearningAppApplication.class);

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(LearningAppApplication.class);
		Environment env = app.run(args).getEnvironment();
		logger.info("Active profiles: {}", String.join(", ", env.getActiveProfiles()));
		logger.info("openai.api.key from environment: {}", env.getProperty("openai.api.key"));
	}
}
