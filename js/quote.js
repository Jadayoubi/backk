let totalQuestions = 4; // Total number of questions
let currentQuestion = 1; // Current question index
document.getElementById('email').addEventListener('input', updateNextButtonState);

document.querySelectorAll('.question-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        updateNextButtonState();
    });
});

document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateNextButtonState();
    });
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestion < totalQuestions) {
        document.getElementById(`question-${currentQuestion}`).style.display = 'none';
        currentQuestion++;
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
        updateProgressBar();
        updateNextButtonState();
        updateBackButtonState(); 
    } else {
        submitForm(); // Submit the form if it's the last question
    }
});

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

function updateNextButtonState() {
    if (currentQuestion === 4) { // Check if it's the email question
        let emailInput = document.getElementById('email').value.trim();
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').disabled = emailInput === '';
        document.getElementById('submit-btn').style.display = '';
    } else {
        let selectedCards = document.querySelectorAll(`#question-${currentQuestion} .question-card.selected`).length;
        let selectedRadio = document.querySelectorAll(`#question-${currentQuestion} input[type="radio"]:checked`).length;
        document.getElementById('next-btn').disabled = selectedCards === 0 && selectedRadio === 0;
        document.getElementById('submit-btn').style.display = 'none';
    }
}


function updateProgressBar() {
    let progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-text').innerText = `${Math.round(progressPercentage)}%`;
}

function updateBackButtonState() {
    const backButton = document.getElementById('back-btn');
    backButton.disabled = currentQuestion === 1;
    if (currentQuestion > 1) {
        backButton.classList.add('enabled');
    } else {
        backButton.classList.remove('enabled');
    }
}

function submitForm() {
    // Here you can put your logic to submit the form data
    // For example, you can collect the data and send it to a server using AJAX
    // After submitting, you can show a success message or redirect the user
    alert('Form submitted successfully!');
}

// Initial call to set progress and button state
updateProgressBar();
updateNextButtonState();
updateBackButtonState();
