const quizData = [
    {
        question: 'Name the organelle that is most abundant on sperm cell',
        choices: ['RER', 'mitochondria', 'mitochondrion', 'centriole'],
        correct: "mitochondrion"
    }, {
        question: 'Select the odd one out',
        choices: ['Fungi', 'virus', 'bacteria', 'amoeba'],
        correct: 'virus'
    }, {
        question: 'The following hormones are required in human reproduction except',
        choices: ['LH','progesterone', 'ADH', 'oestrogen'],
        correct: 'ADH'
    }
];

let questionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const questionCounterEl = document.getElementById('question-counter');
const progressBarEl = document.getElementById('progress-bar');
const timerEl = document.getElementById('timer');
const startBtn = document.querySelector('.start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const quizContent = document.getElementById('quiz-container');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');

let randomQuestions = [];
let timeLeft = 30;
let timer;

startBtn.addEventListener('click', startQuiz);

// Function ya kuanzisha quiz
function startQuiz() {
    welcomeScreen.style.display = 'none';
    quizContent.style.display = 'block';
    randomQuestions = getRandomQuestions(10, []);
    questionIndex = 0;
    score = 0;
    timeLeft = 30;
    loadQuestion();
    resetTimer();
}

//Function ya kuload swali
function loadQuestion() {
    const currentQuestion = randomQuestions[questionIndex]; 
    questionEl.innerHTML = currentQuestion.question;
    choicesEl.innerHTML = '';
    currentQuestion.choices.forEach(choice =>{
        const button = document.createElement('button');
        button.innerHTML = choice;
        button.onclick = () => selectAnswer(button,currentQuestion.correct);
        choicesEl.appendChild(button);
        button.style.display = 'block';
        button.style.width = '100%';
        button.style.margin = '20px 0';
        button.style.padding = '10px';
        button.style.backgroundColor = 'rgba(47,47,100,0.5)';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '25px';
        button.style.cursor = 'pointer';
        button.style.height = '60px';
        button.style.fontSize = '20px';
    });
    updateProgress();
    resetTimer();
}

//Function ya ku-update progress bar na counter
function updateProgress() {
    const currentQuestionNumber = questionIndex + 1;
    questionCounterEl.innerHTML = `Question ${currentQuestionNumber} out of ${randomQuestions.length}`;
    const progressPercentage = (currentQuestionNumber /randomQuestions.length) * 100;
    progressBarEl.style.width = `${progressPercentage}%`;
    progressBarEl.innerHTML = `${progressPercentage.toFixed(0)}`;
}

function selectAnswer(button, correctAnswer) {
    if(button.innerText === correctAnswer) {
        score++;
        button.style.backgroundColor = 'rgb(122,184,11)';
    } else {
        button.style.backgroundColor = '#dc3545';
    }
    Array.from(choicesEl.children).forEach(child => {
        child.disabled = true;
    });
    nextBtn.style.display = 'block';
}


function nextQuestion(){
    questionIndex++;
    if(questionIndex < randomQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}


function showResults(){
    questionEl.innerHTML = `You scored ${score} out of ${randomQuestions.length}`;
    choicesEl.innerHTML = '';
    nextBtn.style.display = 'none';
    quizContent.style.display = 'none';
    resultsEl.style.display = 'block';
    progressBarEl.style.width = '100%';
    progressBarEl.innerHTML = '100%';
    scoreEl.innerHTML = `You scored ${score} out of ${randomQuestions.length}`;
}

// Function ya timer
function resetTimer(){
    clearInterval(timer);
    timeLeft = 30;
    timerEl.innerHTML = `Time left: 00:${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        if(timeLeft < 0){
            clearInterval(timer);
            nextQuestion();
        } else {
            timerEl.innerHTML = `Time left: 00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
        }
    }, 1000);
}

// Function to load questions from the JSON file
async function getQuestions() {
   try {
        const response = await fetch('questions.json');
        const questions = await response.json();
       
        addQuestions(questions);
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}


// Function to display the questions

function addQuestions(newQuestions) {
    newQuestions.forEach((questionObj, index) => {
     let quizes = {
            question: questionObj.question,
            choices: questionObj.options,
            correct: questionObj.answer
        };
        
        quizData.push(quizes);
    });   
    
}

getQuestions().then (() =>{
    console.log(quizData);
    //loadQuestion();

});


function getRandomQuestions(num, usedQuestions) {
    let availableQuestions = quizData.filter((_, index) => !usedQuestions.includes(index));
    const randomQuestions = [];
    while (randomQuestions.length < num && availableQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const questionIndex = quizData.indexOf(availableQuestions[randomIndex]);
        randomQuestions.push(quizData[questionIndex]);
        usedQuestions.push(questionIndex);
        availableQuestions = quizData.filter((_, index) => !usedQuestions.includes(index));
    }
    return randomQuestions;
}


const usedQuestions = [];

document.querySelectorAll('.quiz-btn').forEach((button) => {
    button.addEventListener('click', () => {
        randomQuestions = getRandomQuestions(10, usedQuestions);
       questionIndex = 0;
       score = 0;
        loadQuestion();
    });
});

nextBtn.addEventListener('click',nextQuestion);
