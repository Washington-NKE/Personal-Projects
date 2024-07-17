// Function to load questions from the JSON file
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const questions = await response.json();
        displayQuestions(questions);
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

// Function to display the questions
function displayQuestions(questions) {
    const quizContainer = document.getElementById('quiz-container');
    questions.forEach((questionObj, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        const questionText = document.createElement('h3');
        questionText.textContent = questionObj.question;
        questionElement.appendChild(questionText);

        questionObj.options.forEach((option, i) => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question${index}`;
            optionInput.value = option;

            optionLabel.appendChild(optionInput);
            optionLabel.append(option);

            questionElement.appendChild(optionLabel);
            questionElement.appendChild(document.createElement('br'));
        });

        quizContainer.appendChild(questionElement);
    });
}

// Load questions when the page is loaded
document.addEventListener('DOMContentLoaded', loadQuestions);
