// ✅ flashcards.js (UPDATED to log session)
let correctCount = 0;
let wrongCount = 0;
let notSureCount = 0;
let currentDeck = [];
let currentCardIndex = 0;
let showingBack = false;
let currentTopic = "";

function loadFlashcards(topic) {
    currentTopic = topic;
    fetch(`/api/flashcards?topic=${topic}`)
        .then(res => res.json())
        .then(data => {
            if (!Array.isArray(data)) throw new Error("Flashcards not loaded as an array");
            currentDeck = data;
            currentCardIndex = 0;
            showingBack = false;
            correctCount = 0;
            wrongCount = 0;
            notSureCount = 0;
            displayFlashcard();
        })
        .catch(err => {
            console.error("❌ Failed to load flashcards:", err);
            document.getElementById("flashcardFront").innerText = "❌ Error loading deck.";
            document.getElementById("flashcardBack").style.display = "none";
        });
}

function displayFlashcard() {
    const card = currentDeck[currentCardIndex];
    if (!card || !card.frontSide || !card.backSide) {
        document.getElementById("flashcardFront").innerText = "❌ No flashcards loaded.";
        document.getElementById("flashcardBack").style.display = "none";
        return;
    }
    document.getElementById("flashcardFront").innerText = card.frontSide;
    document.getElementById("flashcardBack").innerText = card.backSide;
    document.getElementById("flashcardBack").style.display = "none";
    showingBack = false;
}

function flipFlashcard() {
    showingBack = !showingBack;
    document.getElementById("flashcardBack").style.display = showingBack ? "block" : "none";
}

function nextFlashcard() {
    if (currentCardIndex < currentDeck.length - 1) {
        currentCardIndex++;
        displayFlashcard();
    } else {
        alert("🎉 You've reached the end of the deck!");
        saveFlashcardSession(currentTopic, correctCount, notSureCount, wrongCount);
        logFlashcardSession(currentTopic, correctCount, currentDeck.length);
    }
}

function rateFlashcard(score) {
    if (score === "correct") correctCount++;
    else if (score === "wrong") wrongCount++;
    else if (score === "unsure") notSureCount++;

    nextFlashcard();
}

function saveFlashcardSession(deck, correct, notSure, wrong) {
    fetch('/api/flashcard-sessions/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            deck: deck,
            correct: correct,
            notSure: notSure,
            wrong: wrong
        })
    }).then(res => {
        if (res.ok) {
            console.log("✅ Flashcard session saved");
        } else {
            console.warn("⚠️ Could not save flashcard session");
        }
    });
}

function logFlashcardSession(topic, correctCount, totalQuestions) {
    fetch('/api/practice-sessions/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            topic: "flashcards-" + topic,
            totalQuestions: totalQuestions,
            correctAnswers: correctCount
        })
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Flashcard script loaded!");
});