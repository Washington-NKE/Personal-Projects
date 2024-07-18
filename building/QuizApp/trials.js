import { getQuestions,addQuestions, quizData } from "./quiz.js";

const randomizer = Math.random();
console.log(randomizer);

let qnElement;

qnElement = document.querySelector('.random-qn');
qnElement.innerHTML = quizData.question;


let selectQuestion = '';
quizData.forEach((maswali) => {
 //console.log(maswali.question);
 selectQuestion += maswali.question;
});

console.log(selectQuestion);

let displayQuestion = '';

function randomQuestion(){
    if(0 < randomizer < 2/3 ) {
    question
    }
}