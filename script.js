const questions = [
    {
        question: "What house at Hogwarts does Harry belong to?",
        options: ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"],
        answer: "Gryffindor"
    },
    {
        question: "Who is the Headmaster of Hogwarts?",
        options: ["Severus Snape", "Albus Dumbledore", "Minerva McGonagall", "Rubeus Hagrid"],
        answer: "Albus Dumbledore"
    },
    {
        question: "Who kills Severus Snape?",
        options: ["Dumbledore", "Hagrid", "Voldemort", "Bellatrix Lestrange"],
        answer: "Voldemort"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionButton = null;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const quizBox = document.getElementById('quiz-box');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

function displayQuestion() {
    resetOptions();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option');
        optionsElement.appendChild(optionButton);
        
        // Add event listener for selecting an answer
        optionButton.addEventListener('click', () => selectAnswer(optionButton, option));
    });
}

function resetOptions() {
    nextButton.style.display = 'none';
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
    selectedOptionButton = null;  // Reset selected option
}

function selectAnswer(optionButton, selectedOption) {
    // Remove 'selected' class from previously selected button
    if (selectedOptionButton) {
        selectedOptionButton.classList.remove('selected');
    }

    // Add 'selected' class to the newly selected button
    optionButton.classList.add('selected');
    selectedOptionButton = optionButton;  // Update the currently selected option

    // Store the user's answer
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    nextButton.style.display = 'block';
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    scoreElement.textContent = `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    resultBox.classList.add('hidden');
    quizBox.classList.remove('hidden');
    displayQuestion();
}

// Event listeners
nextButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Initialize quiz
displayQuestion();
