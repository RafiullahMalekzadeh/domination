// Quiz data array containing all questions, options, and correct answers
const quizData = [
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var x = 5;", "variable x = 5;", "v x = 5;", "declare x = 5;"],
        answer: 0  // Index of correct answer (0-based)
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0
    },
    {
        question: "What is the result of typeof null?",
        options: ["null", "undefined", "object", "number"],
        answer: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "function => myFunction()"],
        answer: 0
    },
    {
        question: "What does the === operator check for?",
        options: ["Value equality", "Value and type equality", "Type equality only", "Reference equality"],
        answer: 1
    },
];

// Quiz state variables to track current progress and user responses
let currentQuestionIndex = 0;        // Current question being displayed
let userAnswers = [];               // Array to store user's selected answers
let score = 0;                      // Current score (number of correct answers)
let randomizedQuestions = [];       // Array to store questions in random order

// DOM element references for easy access throughout the application
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const startButton = document.getElementById('start-button');

// Initialize the quiz when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners for all interactive buttons
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
});

/**
 * Starts the quiz by randomizing questions and showing the first question
 */
function startQuiz() {
    // Randomize the order of questions using Fisher-Yates shuffle
    randomizedQuestions = [...quizData].sort(() => Math.random() - 0.5);

    // Reset all quiz state variables to initial values
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;

    // Hide the start screen and show the quiz interface
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';

    // Load and display the first question
    loadQuestion();
}

/**
 * Loads and displays the current question with its options
 */
function loadQuestion() {
    // Get the current question from the randomized array
    const currentQuestion = randomizedQuestions[currentQuestionIndex];

    // Display the question number and text
    questionContainer.innerHTML = `<h2>Question ${currentQuestionIndex + 1} of ${randomizedQuestions.length}</h2>
                                  <p>${currentQuestion.question}</p>`;

    // Clear any existing option buttons
    optionsContainer.innerHTML = '';

    // Create buttons for each answer option
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option-btn';
        optionButton.textContent = option;
        optionButton.dataset.index = index;
        // Add click event listener to handle option selection
        optionButton.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionButton);
    });

    // Disable the next button until user selects an answer
    nextButton.disabled = true;
    // Change button text based on whether this is the last question
    nextButton.textContent = currentQuestionIndex === randomizedQuestions.length - 1 ? 'Submit Quiz' : 'Next Question';
}

/**
 * Handles user selection of an answer option
 * @param {number} selectedIndex - The index of the selected option
 */
function selectOption(selectedIndex) {
    // Disable all option buttons to prevent multiple selections
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.disabled = true;
        button.style.pointerEvents = 'none';
    });

    // Store the user's answer for later review
    userAnswers[currentQuestionIndex] = selectedIndex;

    // Get the current question and check if answer is correct
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.answer;

    // Get the button that was clicked
    const selectedButton = optionButtons[selectedIndex];
    
    if (isCorrect) {
        // Style correct answer with green color
        selectedButton.style.backgroundColor = '#2E8B57'; // Dark green
        selectedButton.style.color = 'white';
        selectedButton.style.borderColor = '#2E8B57';
        score++; // Increment score for correct answer
    } else {
        // Style incorrect answer with red color
        selectedButton.style.backgroundColor = '#DC143C'; // Crimson red
        selectedButton.style.color = 'white';
        selectedButton.style.borderColor = '#DC143C';

        // Also highlight the correct answer in green
        const correctButton = optionButtons[currentQuestion.answer];
        correctButton.style.backgroundColor = '#2E8B57'; // Dark green
        correctButton.style.color = 'white';
        correctButton.style.borderColor = '#2E8B57';
    }

    // Enable the next button so user can proceed
    nextButton.disabled = false;
}

/**
 * Handles navigation to the next question or quiz submission
 */
function nextQuestion() {
    if (currentQuestionIndex < randomizedQuestions.length - 1) {
        // Move to next question
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // Submit quiz when on the last question
        submitQuiz();
    }
}

/**
 * Submits the quiz and displays results with answer review
 */
function submitQuiz() {
    // Hide the quiz interface
    if (quizContainer) {
        quizContainer.style.display = 'none';
    } else {
        console.error('Quiz container not found');
    }

    // Show the results screen
    if (scoreContainer) {
        scoreContainer.style.display = 'block';
    } else {
        console.error('Score container not found');
    }

    // Calculate and display the final score
    if (scoreElement) {
        const percentage = Math.round((score / randomizedQuestions.length) * 100);
        scoreElement.innerHTML = `You Scored ${score} out of ${randomizedQuestions.length} (${percentage}%)`;

        // Color-code the score based on performance
        if (percentage >= 80) {
            scoreElement.style.color = '#2E8B57'; // Green for excellent
        } else if (percentage >= 60) {
            scoreElement.style.color = '#FF8C00'; // Orange for good
        } else {
            scoreElement.style.color = '#DC143C'; // Red for needs improvement
        }

        // Add detailed answer review section
        const answerReview = document.createElement('div');
        answerReview.innerHTML = `
            <h3 style="margin-top: 30px; color: #333;">Answer Review</h3>
            <div style="text-align: left; max-height: 400px; overflow-y: auto; margin-top: 20px;">
                ${generateAnswerReview()}
            </div>
        `;
        scoreContainer.appendChild(answerReview);
    } else {
        console.error('Score element not found');
    }
}

/**
 * Generates HTML for the detailed answer review section
 * @returns {string} HTML string containing the answer review
 */
function generateAnswerReview() {
    let reviewHTML = '';

    // Loop through each question and show user's answer vs correct answer
    randomizedQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;

        // Create review card for each question
        reviewHTML += `
            <div style="
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                background-color: ${isCorrect ? '#f0f8f0' : '#fff0f0'};
            ">
                <h4 style="margin: 0 0 10px 0; color: #333;">Question ${index + 1}</h4>
                <p style="margin: 0 0 10px 0; font-weight: bold;">${question.question}</p>
                <p style="margin: 5px 0; color: #666;">
                    <strong>Your Answer:</strong> 
                    <span style="color: ${isCorrect ? '#2E8B57' : '#DC143C'};">
                        ${question.options[userAnswer]}
                    </span>
                </p>
                <p style="margin: 5px 0; color: #666;">
                    <strong>Correct Answer:</strong> 
                    <span style="color: #2E8B57;">${question.options[correctAnswer]}</span>
                </p>
            </div>
        `;
    });

    return reviewHTML;
}

/**
 * Restarts the quiz by resetting all state and returning to start screen
 */
function restartQuiz() {
    // Reset all quiz state variables
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    randomizedQuestions = [];

    // Show start screen and hide other containers
    startScreen.style.display = 'block';
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'none';

    // Remove any answer review that was added to the score container
    const answerReview = scoreContainer.querySelector('div');
    if (answerReview && answerReview.innerHTML.includes('Answer Review')) {
        scoreContainer.removeChild(answerReview);
    }
}
