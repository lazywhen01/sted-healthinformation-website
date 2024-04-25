const questions = [
    {
        question: 'What is the name of the air that we breathe in?',
        answers: [
            { text: 'Carbon dioxide', correct: false},
            { text: 'Oxygen', correct: true},
            { text: 'Nitrogen', correct: false},
            { text: 'All of the Above', correct: false},
        ]
    },
    {
        question: 'What is the name of the air that we breathe out?',
        answers: [
            { text: 'Nitrogen', correct: false},
            { text: 'Oxygen', correct: false},
            { text: 'Carbon dioxide', correct: true},
            { text: 'All of the Above', correct: false},
        ]
    },
    {
        question: 'What is the name of the tiny air sacs in the lungs?',
        answers: [
            { text: 'Alveoli ', correct: true},
            { text: 'Trachea', correct: false},
            { text: 'Nasal Passageway', correct: false},
            { text: 'Diaphragm', correct: false},
        ]
    },
    {
        question: 'What is a synonym for the windpipe?',
        answers: [
            { text: 'Nasal Passageway', correct: false},
            { text: 'Alveoli', correct: false},
            { text: 'Diaphragm', correct: false},
            { text: 'Trachea', correct: true},
        ]
    },
    {
        question: 'What is another name for breathing in?',
        answers: [
            { text: 'Exhale', correct: false},
            { text: 'Inhale ', correct: true},
            { text: 'Circulatory', correct: false},
            { text: 'Trachea', correct: false},
        ]
    },
]

const questionElement = document.getElementById('question') 
const answerElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

startQuiz = () => {
    currentQuestionIndex = 0
    score = 0 
    nextButton.innerHTML = 'Next';
    showQuestion();
} 
showQuestion = () => {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = + questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerElement.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    }) 
}
resetState = () => {
    nextButton.style.display = 'none'
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild)
    }
}

selectAnswer = (e) => {
    const selectBtn = e.target
    const isCorrect = selectBtn.dataset.correct === 'true'
    if(isCorrect){
        selectBtn.classList.add('correct')
        score++
    }else{
        selectBtn.classList.add('incorrect')
    }
    Array.from(answerElement.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextButton.style.display = 'block'
}
showScore = () => {
    resetState()
    questionElement.innerHTML = `You score ${score} out of ${questions.length}`
    nextButton.innerHTML = 'Play again'
    nextButton.style.display = 'block'
}
handleNextButton = () => {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
nextButton.addEventListener('click', ()=>{
     if(currentQuestionIndex < questions.length){
        handleNextButton()
     }else{
        startQuiz()
     }
})

startQuiz()