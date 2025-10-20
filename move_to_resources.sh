#!/bin/bash

# Paths
SOURCE_QUESTIONS="./questions"
SOURCE_FLASHCARDS="./flashcards"
TARGET_DIR="./src/main/resources"

# Ensure target directory exists
mkdir -p "$TARGET_DIR"

# Move folders
echo "🚚 Moving 'questions' and 'flashcards' to $TARGET_DIR ..."
mv "$SOURCE_QUESTIONS" "$TARGET_DIR/" 2>/dev/null && echo "✅ Moved 'questions'" || echo "⚠️ 'questions' folder not found or already moved"
mv "$SOURCE_FLASHCARDS" "$TARGET_DIR/" 2>/dev/null && echo "✅ Moved 'flashcards'" || echo "⚠️ 'flashcards' folder not found or already moved"

echo "🎉 Done!"

