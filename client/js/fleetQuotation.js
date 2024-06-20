let totalFleetQuestions = 4; // Total number of questions
let currentFleetQuestion = 1; // Current question index
let count = 0;

document.getElementById('email').addEventListener('input', updateNextButtonState);

function validateEmail(emailInputId, errorId) {
    const emailInput = document.getElementById(emailInputId);
    const emailError = document.getElementById(errorId);
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailPattern.test(email)) {
        emailError.style.display = 'none';
        return true;
    } else {
        emailError.style.display = 'block';
        return false;
    }
}
document.querySelectorAll('.fleet-question-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        card.classList.add('bounce-top');
        updateNextButtonState();
        setTimeout(() => {
            card.classList.remove('bounce-top'); 
        }, 1000);
    });
});


document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateNextButtonState();
    });
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentFleetQuestion < totalFleetQuestions) {
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'none';
        currentFleetQuestion++;
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'block';
        updateFleetProgressBar();
        updateNextButtonState();
        updateBackButtonState();
    } else {
        fleetsubmitForm(); 
    }
});

document.getElementById('back-btn').addEventListener('click', () => {
    if (currentFleetQuestion > 1) {
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'none';
        currentFleetQuestion--;
        document.getElementById(`question-${currentFleetQuestion}`).style.display = 'block';
        updateFleetProgressBar();
        updateNextButtonState();
        updateBackButtonState();
    }
});

function updateNextButtonState() {
    if (currentFleetQuestion === totalFleetQuestions) { // Check if it's the email question
        let emailInput = document.getElementById('email').value.trim();
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').disabled = emailInput === '';
        document.getElementById('submit-btn').style.display = '';
    } else {
        let selectedCards = document.querySelectorAll(`#question-${currentFleetQuestion} .question-card.selected`).length;
        let selectedRadio = document.querySelectorAll(`#question-${currentFleetQuestion} input[type="radio"]:checked`).length;
        document.getElementById('next-btn').disabled = selectedCards === 0 && selectedRadio === 0;
        document.getElementById('submit-btn').style.display = 'none';
    }
}

function updateFleetProgressBar() {
    let progressPercentage = ((currentFleetQuestion - 1) / totalFleetQuestions) * 100;
    document.getElementById('fleetprogress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('fleetprogress-text').innerText = `${Math.round(progressPercentage)}%`;
}

function updateBackButtonState() {
    const backButton = document.getElementById('back-btn');

    backButton.disabled = currentFleetQuestion === 1;
    if (currentFleetQuestion > 1 ) {
        backButton.classList.add('enabled');
        webdevBackButton.classList.add('enabled');
    } else {
        backButton.classList.remove('enabled');

    }
}

function fleetsubmitForm() {
    if (validateEmail('email', 'EmailError')) {
        document.getElementById('fleet-question-container').style.display = 'none';
        document.getElementById('fleetbuttons').style.display = 'none';

        document.getElementById('confirmation-section').style.display = 'block';
        currentFleetQuestion++;
        updateFleetProgressBar();
    } else {
        document.getElementById('EmailError').style.display = 'block';
        console.log('email error');
    }
}

function redirect() {
    window.location.href = '../index.html';
}

function showQuestions(service) {
    document.getElementById('service-container').classList.add('hidden'); // Hide the service options
    document.getElementById(service).classList.remove('hidden'); // Show the selected service section
    document.getElementById(`question-${currentFleetQuestion}`).style.display = 'block'; // Show the first question of Fleet
    document.getElementById(`webdev-question-${currentWebQuestion}`).style.display = 'block'; // Show the first question of WebDev
}

// Initial call to set progress and button state
updateFleetProgressBar();
updateNextButtonState();
updateBackButtonState();
