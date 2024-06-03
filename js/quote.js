let totalQuestions = 4; // Total number of questions
let currentQuestion = 1; // Current question index

document.querySelectorAll('.question-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        updateNextButtonState();
    });
});

document.getElementById('submit-btn').addEventListener('click', () => {
    if (currentQuestion < totalQuestions) {
        document.getElementById(`question-${currentQuestion}`).style.display = 'none';
        currentQuestion++;
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
        updateProgressBar();
        updateNextButtonState();
        updateBackButtonState(); 
    } else {
        alert('Survey completed!');
    }
});

function updateNextButtonState() {
    let selectedCards = document.querySelector(`#question-${currentQuestion}`).querySelectorAll('.question-card.selected').length;
    document.getElementById('submit-btn').disabled = selectedCards === 0;
}

function updateProgressBar() {
    let progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-text').innerText = `${Math.round(progressPercentage)}%`;
}
document.getElementById('back-btn').addEventListener('click', () => {
    if (currentQuestion > 1) {
        document.getElementById(`question-${currentQuestion}`).style.display = 'none';
        currentQuestion--;
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
        updateProgressBar();
        updateNextButtonState();
        updateBackButtonState();
    }
});

function updateBackButtonState() {
    const backButton = document.getElementById('back-btn');
    backButton.disabled = currentQuestion === 1;
    if (currentQuestion > 1) {
        backButton.classList.add('enabled');
    } else {
        backButton.classList.remove('enabled');
    }
}
// Initial call to set progress and button state
updateProgressBar();
updateNextButtonState();
updateBackButtonState();