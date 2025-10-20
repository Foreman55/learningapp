async function fetchChatGPTQuestions(topic) {
    const url = '/api/openai/chat';

    const prompt = `
Generate a medium-sized programming question in ${topic}.
The question should ask the student to implement a system or logic using multiple classes or functions.
It should require real thinking and be suitable for practice.
`;

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7
    };

    try {
        const response = await axios.post(url, data);
        const question = response.data.choices[0].message.content.trim();
        document.getElementById("questionPlaceholder").innerText = question;
    } catch (error) {
        console.error("❌ Error fetching question:", error);
        document.getElementById("questionPlaceholder").innerText = "❌ Failed to fetch question.";
    }
}

async function submitAnswer() {
    const question = document.getElementById("questionPlaceholder").innerText;
    const answer = document.getElementById("answer").value;
    const topic = document.getElementById("topic").value;

    if (!question || !answer || !topic) {
        alert("Fill in both the question, your answer, and topic.");
        return;
    }

    const url = '/api/openai/chat';

    const prompt = `
You are a programming teacher. A student answered this question:

Question: ${question}

Answer:
${answer}

Please evaluate it constructively. Suggest corrections or improvements if needed.
`;

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7
    };

    try {
        const response = await axios.post(url, data);
        const feedback = response.data.choices[0].message.content.trim();

        let feedbackBox = document.getElementById("feedbackBox");
        if (!feedbackBox) {
            feedbackBox = document.createElement("div");
            feedbackBox.id = "feedbackBox";
            feedbackBox.style.marginTop = "20px";
            feedbackBox.style.whiteSpace = "pre-wrap";
            document.querySelector(".content").appendChild(feedbackBox);
        }
        feedbackBox.innerText = feedback;

        // ✅ Log session to unified history
        logChatGPTSession(topic);

    } catch (error) {
        console.error("❌ Error evaluating answer:", error);
        let errorMessage = "❌ Failed to evaluate answer.";
        if (error.response?.data?.message) {
            errorMessage += ` Details: ${error.response.data.message}`;
        }
        let feedbackBox = document.getElementById("feedbackBox");
        if (feedbackBox) {
            feedbackBox.innerText = errorMessage;
        }
    }
}


// Wire them to global window
window.fetchQuestions = async function () {
    const topic = document.getElementById("topic").value;
    if (!topic) {
        alert("Please enter a topic.");
        return;
    }
    await fetchChatGPTQuestions(topic);
};

window.submitAnswer = submitAnswer;
function logChatGPTSession(topic) {
    fetch('/api/practice-sessions/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            topic: "chatgpt-" + topic,
            totalQuestions: 1,
            correctAnswers: 1
        })
    });
}

