let linuxFlashcards = [];
let currentLinuxIndex = 0;
let currentLinuxCategory = '';

function toggleLinuxDropdown() {
    const dropdown = document.getElementById('linuxDropdown');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

function loadLinuxFlashcards(category) {
    currentLinuxCategory = category;
    currentLinuxIndex = 0;
    
    fetch(`/api/flashcards?topic=${category}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                linuxFlashcards = data;
            } else if (Array.isArray(data.flashcards)) {
                linuxFlashcards = data.flashcards;
            } else {
                linuxFlashcards = [];
            }
            
            if (linuxFlashcards.length > 0) {
                showLinuxFlashcard();
                document.getElementById('showAnswerBtn').style.display = 'inline-block';
                document.getElementById('nextBtn').style.display = 'inline-block';
            } else {
                document.getElementById('flashcardFront').innerText = 'No flashcards available for this category';
                document.getElementById('showAnswerBtn').style.display = 'none';
                document.getElementById('nextBtn').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error loading Linux flashcards:', error);
            document.getElementById('flashcardFront').innerText = 'Error loading flashcards';
            document.getElementById('showAnswerBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
        });
}

function showLinuxFlashcard() {
    if (linuxFlashcards.length === 0) return;
    
    const flashcard = linuxFlashcards[currentLinuxIndex];
    document.getElementById('flashcardFront').innerText = flashcard.front;
    document.getElementById('flashcardBack').innerText = flashcard.back;
    document.getElementById('flashcardBack').style.display = 'none';
}

function showLinuxAnswer() {
    document.getElementById('flashcardBack').style.display = 'block';
}

function nextLinuxFlashcard() {
    currentLinuxIndex = (currentLinuxIndex + 1) % linuxFlashcards.length;
    showLinuxFlashcard();
}

function getLinuxCategoryName(category) {
    const names = {
        'linux_basics': 'Linux Basics',
        'linux_commands': 'Common Commands',
        'linux_advanced': 'Advanced Topics'
    };
    return names[category] || category;
}

