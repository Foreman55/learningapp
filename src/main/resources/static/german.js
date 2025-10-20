let germanQuestions = [];
let currentGermanIndex = 0;
let currentGermanCategory = '';

function toggleGermanDropdown() {
    const dropdown = document.getElementById('germanDropdown');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

function loadGermanFlashcards(category) {
    currentGermanCategory = category;
    currentGermanIndex = 0;

    // Preload to get total and prime pagination/controls if needed later
    fetch(`/api/get-questions?topic=${category}`)
        .then(res => res.json())
        .then(() => {
            // Immediately load the first item via get-question
            loadNextGermanQuestion();
            document.getElementById('showAnswerBtn').style.display = 'inline-block';
            document.getElementById('nextBtn').style.display = 'inline-block';
        })
        .catch(err => {
            console.error('Error loading German questions:', err);
            document.getElementById('flashcardFront').innerText = 'Error loading questions';
            document.getElementById('showAnswerBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
        });
}

function loadNextGermanQuestion() {
    fetch(`/api/get-question?topic=${currentGermanCategory}&index=${currentGermanIndex}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('flashcardFront').innerText = data.text || '';
            document.getElementById('flashcardBack').innerText = data.expectedDisplay || '';
            document.getElementById('flashcardBack').style.display = 'none';
        })
        .catch(err => {
            console.error('Error fetching next German question:', err);
            document.getElementById('flashcardFront').innerText = 'Error loading question';
            document.getElementById('showAnswerBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
        });
}

function showGermanAnswer() {
    document.getElementById('flashcardBack').style.display = 'block';
}

function nextGermanFlashcard() {
    currentGermanIndex = currentGermanIndex + 1;
    loadNextGermanQuestion();
}

function getGermanCategoryName(category) {
    const names = {
        'german_people': 'People & Behavior',
        'german_emotions': 'Emotions & Character',
        'german_gestures': 'Physical Actions & Gestures',
        'german_driving': 'Auto / Driving Vocabulary',
        'german_tools': 'Tools & Workshop',
        'german_kitchen': 'Kitchen Vocabulary',
        'german_household': 'Household & Hygiene',
        'german_body': 'Body & Appearance',
        'german_grammar': 'Grammar & Abstract Vocabulary',
        'german_misc': 'Miscellaneous Actions & Phrases',
        'german_literary': 'Advanced Vocabulary & Literary Expressions'
    };
    return names[category] || category;
}
