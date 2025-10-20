// === Dropdown Logic ===
function toggleDropdown() {
    const dropdown = document.getElementById("topicDropdown");
    if (dropdown) {
        dropdown.style.display = (dropdown.style.display === "flex") ? "none" : "flex";
    }
}

// Close dropdown when clicking outside
window.addEventListener("click", function (event) {
    const dropdown = document.getElementById("topicDropdown");
    const dropdownBtn = document.querySelector(".dropdown-btn");
    if (dropdown && !dropdown.contains(event.target) && !dropdownBtn.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

// === Practice History (used by both questions & flashcards, optional) ===
function fetchPracticeHistory() {
    fetch('/api/practice-sessions/history')
        .then(response => response.json())
        .then(data => {
            const box = document.getElementById("historyBox");
            if (!data.length) {
                box.innerText = "No sessions found.";
                return;
            }

            let html = "<ul>";
            data.forEach(session => {
                const total = session.totalQuestions;
                const correct = session.correctAnswers;
                const wrong = total - correct;
                const accuracy = ((correct / total) * 100).toFixed(1);
                const date = new Date(session.timestamp).toLocaleString();

                html += `<li><strong>${date}</strong> — ${session.topic} ➜ ✅ ${correct} / ❌ ${wrong} (${accuracy}%)</li>`;
            });
            html += "</ul>";
            box.innerHTML = html;
        })
        .catch(err => {
            console.error("❌ Error loading history:", err);
            const box = document.getElementById("historyBox");
            if (box) box.innerText = "Failed to load history.";
        });
}
