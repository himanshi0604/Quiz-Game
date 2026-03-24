const question = [
    {
        question: "What is HTML?",
        answers:[
            {text:"Hyper Text Markup Language", correct:true},
            {text:"High Tech Modern Language", correct:false},
            {text:"Hyper Transfer Machine Language", correct:false},
            {text:"Home Tool Markup Language", correct:false},
        ]
    },
    {
        question: "Which tag is used to create the largest heading?",
        answers: [
            {text: "h6", correct:false},
            {text: "heading", correct:false},
            {text: "h1", correct:true},
            {text: "h9", correct:false},
        ]
    },
    {
        question: "Which attribute is used in <img> tag to specify image path?",
        answers: [
            {text: "link", correct:false},
            {text: "src", correct:true},
            {text: "href", correct:false},
            {text: "path", correct:false},
        ]
    },
    {
        question: "Which input type is used for passwords?",
        answers :[
            {text: "text", correct:false},
            {text: "password", correct:true},
            {text: "pass", correct:false},
            {text: "secure", correct:false},
        ]
    },
];

const timerE1 = document.querySelector(".timer");
const timeBar = document.getElementById("time-bar");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const playAgainBtn  = document.getElementById("playAgainBtn")
let questionNumber = document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;
let timeInterval = null;
let isAnswered = false;

function showAnswer(){
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
}

function startTime(){
    let timeLeft = 10;
    const totalTime = 10;

    timerE1.innerText = timeLeft;
    timeBar.style.transition = 'none'
    timeBar.style.width = '100%'

    void timeBar.offsetWidth;
    timeBar.style.transition = `width ${totalTime}s linear`
    timeBar.style.width = '0%'

    timeInterval = setInterval(()=>{
        timeLeft--;
        timerE1.innerText = timeLeft;

        if(timeLeft <= 0){
            clearInterval(timeInterval);
            timerE1.innerText = 0;
            showAnswer();
            setTimeout(showNextQuestion, 800);
        }
    }, 1000)
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true"

    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }

    showAnswer()
    isAnswered = true;
    setTimeout(showNextQuestion, 1000)
}

function showOptions(currentQuestion){
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function showQuestion(){
    resetState()
    isAnswered = false;
    startTime()

    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionNumber.innerHTML = `Q. ${questionNo} of ${question.length}`
    questionElement.innerHTML = currentQuestion.question

    showOptions(currentQuestion)
}

function showScore(){
    timerE1.style.visibility = "hidden"
    timeBar.style.visibility = "hidden"
    questionNumber.style.visibility = "hidden"

    clearInterval(timeInterval)

    resetState()
    questionElement.innerHTML = `Score: ${score}`
    playAgainBtn.style.display = 'block'
}

function showNextQuestion(){
    clearInterval(timeInterval)

    currentQuestionIndex++;

    if(currentQuestionIndex < question.length){
        showQuestion()
    }
    else{
        showScore()
    }
}

function startQuiz(){
    playAgainBtn.style.display = 'none'

    timerE1.style.visibility = "visible"
    timeBar.style.visibility = "visible"
    questionNumber.style.visibility = "visible"

    currentQuestionIndex = 0;
    score = 0;

    showQuestion()
}

playAgainBtn.addEventListener('click',startQuiz)

const startScreen = document.querySelector(".start-screen")
const startBtn = document.getElementById("start-btn")
const quiz = document.querySelector(".app")

quiz.style.display = "none";

startBtn.addEventListener("click",()=>{
    startScreen.style.display = "none";
    quiz.style.display = "block";
    startQuiz()
})