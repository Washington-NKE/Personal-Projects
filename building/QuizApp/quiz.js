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
]

let questionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');

function loadQuestion() {
    const currentQuestion = quizData[questionIndex]; 
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
    nextBtn.style.display = 'relative';
}

function nextQuestion(){
    questionIndex++;
    if(questionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
        nextBtn.style.display = 'none';
    }
    
}

function showResults(){
    questionEl.innerHTML = `You scored ${score} out of ${quizData.length}`;
    choicesEl.innerHTML = '';
    nextBtn.style.display = 'none';
}

loadQuestion();



// Function to load questions from the JSON file
async function getQuestions() {
   try {
        const response = await fetch('questions.json');
        const questions = await response.json();
        console.log(questions);
        showQuestions(questions);
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

getQuestions();
// Function to display the questions

function showQuestions(questions) {
    questions.forEach((questionObj, index) => {
     let quizes = {
            question: questionObj.question,
            choices: questionObj.options,
            correct: questionObj.answer
        }
        
        quizData.push(quizes);
    });   
    console.log(quizData);
}




