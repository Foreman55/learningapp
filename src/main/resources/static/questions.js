// ✅ questions.js (FINAL VERSION)
let correctCount = 0;
let wrongCount = 0;
let currentIndex = 0;
let currentExpectedRegex = "";
let currentTopic = "regex";
let totalQuestions = 0;
let stackSize = 10;
let currentStack = 0; // 0-based

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Questions script loaded!");
    fetchPracticeHistory();
    // If a topic is passed via URL, auto-load it
    const params = new URLSearchParams(window.location.search);
    const urlTopic = params.get("topic");
    const path = window.location.pathname || "";
    // Hide ONLY the global Topics dropdown when in Linux-only view
    if (path === "/linux-questions" || (urlTopic && urlTopic.startsWith("linux_"))) {
        const menu = document.getElementById('topicDropdown');
        if (menu) {
            const btn = menu.previousElementSibling; // the global Topics button
            if (btn) btn.style.display = 'none';
            menu.style.display = 'none';
        }
    }
    if (urlTopic) {
        loadQuestions(urlTopic);
    }
});

function loadQuestions(topic) {
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    currentTopic = topic;

    document.getElementById("topic").value = topic;
    document.getElementById("correctCount").innerText = 0;
    document.getElementById("wrongCount").innerText = 0;
    currentStack = 0;

    // Show sample tables only if topic is sql
    const sqlWrapper = document.getElementById("sqlWrapper");
    if (sqlWrapper) {
        sqlWrapper.style.display = (topic === "sql" || topic === "sql_query") ? "flex" : "none";
        if (!db && (topic === "sql" || topic === "sql_query")) {
            initSQL();
        }
    }


    fetch(`/api/get-questions?topic=${topic}`)
      .then(res => res.json())
      .then(data => {
          if (Array.isArray(data)) {
              totalQuestions = data.length;
          } else if (Array.isArray(data.questions)) {
              totalQuestions = data.questions.length;
          } else {
              totalQuestions = 0;
          }
          renderStackControls();
          goToStack(0);
      });
}

function loadNextQuestion() {
    fetch(`/api/get-question?topic=${currentTopic}&index=${currentIndex}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("questionBox").innerText = data.text;
            document.getElementById("expectedAnswer").value = data.answerRegex;
            document.getElementById("expectedAnswer").setAttribute("data-display", data.expectedDisplay || "");
            document.getElementById("answer").value = "";
            document.getElementById("evaluateResult").innerText = "";
            hideNextButton();
        });
}

function renderStackControls() {
    const container = document.getElementById("stackControls");
    if (!container) return;
    container.innerHTML = "";
    const numStacks = Math.max(1, Math.ceil(totalQuestions / stackSize));
    for (let s = 0; s < numStacks; s++) {
        const btn = document.createElement("button");
        btn.textContent = `Stack ${s + 1}`;
        btn.style.padding = "6px 10px";
        btn.style.borderRadius = "4px";
        btn.style.border = "1px solid #666";
        btn.style.background = s === currentStack ? "#444" : "#222";
        btn.style.color = "#fff";
        btn.onclick = () => goToStack(s);
        container.appendChild(btn);
    }
}

function goToStack(stackIndex) {
    currentStack = stackIndex;
    const start = currentStack * stackSize;
    currentIndex = start;
    renderStackControls();
    loadNextQuestion();
}

function submitAnswer() {
    const userAnswer = document.getElementById("answer").value;
    const expected = document.getElementById("expectedAnswer").value;

    // SQL Query Answer Mode
    if (currentTopic === "sql_query") {
        try {
            const userResult = db.exec(userAnswer);
            const expectedResult = db.exec(expected);

            const correct = JSON.stringify(userResult) === JSON.stringify(expectedResult);

            let feedback = correct
                ? "✅ Correct!"
                : "❌ Incorrect.\n✅ Expected Result:\n" + formatSQLResult(expectedResult);
            document.getElementById("evaluateResult").innerText = feedback;

            correct ? correctCount++ : wrongCount++;
            document.getElementById("correctCount").innerText = correctCount;
            document.getElementById("wrongCount").innerText = wrongCount;

            currentIndex++;
            const endCurrentStack = (currentStack + 1) * stackSize;
            if (currentIndex >= Math.min(totalQuestions, endCurrentStack)) {
                logSessionResult();
                document.getElementById("evaluateResult").innerText += "\n🎉 Stack completed!";
                showNextButton();
            } else {
                showNextButton();
            }
        } catch (e) {
            document.getElementById("evaluateResult").innerText =
                "❌ Error running your query: " + e.message;
        }
        return;
    }

    // fallback for non-SQL topics (regex-based)
    fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: userAnswer, expected: expected })
    })
        .then(res => res.json())
        .then(data => {
            const result = data.correct;

            // 💡 Use the expectedDisplay stored earlier (from loadNextQuestion)
            const display = document
                .getElementById("expectedAnswer")
                .getAttribute("data-display") || expected;

            const feedback = result
                ? "✅ Correct!"
                : `❌ Incorrect.\n✅ Correct answer: ${display}`;

            document.getElementById("evaluateResult").innerText = feedback;

            result ? correctCount++ : wrongCount++;
            document.getElementById("correctCount").innerText = correctCount;
            document.getElementById("wrongCount").innerText = wrongCount;

            currentIndex++;
            const endCurrentStack2 = (currentStack + 1) * stackSize;
            if (currentIndex >= Math.min(totalQuestions, endCurrentStack2)) {
                logSessionResult();
                document.getElementById("evaluateResult").innerText += "\n🎉 Stack completed!";
                showNextButton();
            } else {
                showNextButton();
            }
        });
}


function logSessionResult() {
    fetch('/api/practice-sessions/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            topic: currentTopic,
            totalQuestions: correctCount + wrongCount,
            correctAnswers: correctCount
        })
    });
}

document.getElementById("answer").addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const nextBtn = document.getElementById('nextQuestionBtn');
        if (nextBtn && nextBtn.style.display === 'block') {
            loadNextQuestion();
            hideNextButton();
        } else {
            submitAnswer();
        }
    }
});

function showNextButton() {
    const submitBtn = document.querySelector('button[onclick="submitAnswer()"]');
    if (submitBtn) submitBtn.style.display = 'none';
    let nextBtn = document.getElementById('nextQuestionBtn');
    if (!nextBtn) {
        nextBtn = document.createElement('button');
        nextBtn.id = 'nextQuestionBtn';
        nextBtn.textContent = 'Next Question';
        nextBtn.style.marginTop = '10px';
        nextBtn.style.padding = '8px 16px';
        nextBtn.style.backgroundColor = '#007bff';
        nextBtn.style.color = 'white';
        nextBtn.style.border = 'none';
        nextBtn.style.borderRadius = '4px';
        nextBtn.style.cursor = 'pointer';
        nextBtn.onclick = function() { loadNextQuestion(); hideNextButton(); };
        const evaluateResult = document.getElementById("evaluateResult");
        evaluateResult.parentNode.insertBefore(nextBtn, evaluateResult.nextSibling);
    }
    nextBtn.style.display = 'block';
}

function hideNextButton() {
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) nextBtn.style.display = 'none';
    const submitBtn = document.querySelector('button[onclick="submitAnswer()"]');
    if (submitBtn) submitBtn.style.display = 'inline-block';
}

// === Practice History (FINAL FIXED VERSION) ===
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
let db = null;

async function initSQL() {
    const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });
    db = new SQL.Database();

    // Create users table
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT
        );
        INSERT INTO users VALUES
            (1, 'Alice', 'alice@example.com'),
            (2, 'Bob', 'bob@example.com'),
            (3, 'Charlie', 'charlie@example.com');
    `);

    // Create orders table
    db.run(`
        CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            product TEXT,
            amount REAL
        );
        INSERT INTO orders VALUES
            (1, 1, 'Book', 20.00),
            (2, 1, 'Pen', 2.00),
            (3, 2, 'Backpack', 45.00),
            (4, 3, 'Laptop', 900.00);
    `);
}

function runSQL() {
    const sql = document.getElementById("queryBox").value;
    try {
        const result = db.exec(sql);
        if (result.length === 0) {
            document.getElementById("queryResult").innerText = "✅ Query ran successfully (no rows returned).";
            return;
        }

        const cols = result[0].columns;
        const rows = result[0].values;
        let output = cols.join(" | ") + "\n";
        output += "-".repeat(output.length) + "\n";
        for (const row of rows) {
            output += row.join(" | ") + "\n";
        }
        document.getElementById("queryResult").innerText = output;
    } catch (e) {
        document.getElementById("queryResult").innerText = "❌ " + e.message;
    }
}
function formatSQLResult(result) {
    if (!result || result.length === 0) return "(no rows)";
    const { columns, values } = result[0];
    let out = columns.join(" | ") + "\n";
    out += "-".repeat(out.length) + "\n";
    values.forEach(row => {
        out += row.join(" | ") + "\n";
    });
    return out;
}
