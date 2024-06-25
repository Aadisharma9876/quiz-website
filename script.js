// script.js

const questions = [
    {
        question: "Question 1: What is the main advantage of building mass outreach capability with minimum resource engagement?",
        options: ["Cost efficiency", "High resource consumption", "Low impact", "Complex management"],
        answer: 0
    },
    {
        question: "Question 2: Which of the following is a key strategy in minimizing resource engagement?",
        options: ["Maximizing outputs", "Minimizing inputs", "Outsourcing", "Hiring more staff"],
        answer: 1
    },
    {
        question: "Question 3: What is a common method to build mass outreach?",
        options: ["One-on-one meetings", "Email campaigns", "Telemarketing", "Direct mail"],
        answer: 1
    },
    {
        question: "Question 4: Which tool can help in mass outreach?",
        options: ["Excel", "Google Analytics", "MailChimp", "Photoshop"],
        answer: 2
    },
    {
        question: "Question 5: Which platform is often used for mass outreach?",
        options: ["LinkedIn", "Slack", "Microsoft Teams", "Skype"],
        answer: 0
    },
    {
        question: "Question 6: How can social media aid in mass outreach?",
        options: ["Limiting reach", "Targeted advertising", "Reducing visibility", "Increasing costs"],
        answer: 1
    },
    {
        question: "Question 7: What is a benefit of email newsletters?",
        options: ["Personal interaction", "Broad audience reach", "High costs", "Slow delivery"],
        answer: 1
    },
    {
        question: "Question 8: What should be considered in resource engagement?",
        options: ["Maximizing costs", "Efficiency", "Increasing workforce", "Manual processes"],
        answer: 1
    },
    {
        question: "Question 9: What is a primary goal of mass outreach?",
        options: ["High engagement with low cost", "High cost and high engagement", "Low engagement and high cost", "Low engagement and low cost"],
        answer: 0
    },
    {
        question: "Question 10: Which of these is a measure of outreach success?",
        options: ["Reach", "Height", "Weight", "Length"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion(currentQuestionIndex);
    renderBubbles();
    updateButtons();
});

function loadQuestion(index) {
    const questionContainer = document.getElementById("question-container");
    const questionData = questions[index];

    questionContainer.innerHTML = `
        <h3>${questionData.question}</h3>
        ${questionData.options.map((option, i) => `
            <label>
                <input type="radio" name="answer" value="${i}" ${answers[index] === i ? "checked" : ""}>
                ${option}
            </label>
        `).join('')}
    `;
}

function renderBubbles() {
    const bubblesContainer = document.getElementById("bubbles-container");
    bubblesContainer.innerHTML = questions.map((_, index) => {
        let className = 'bubble';
        if (answers[index] === 'skipped') className += ' red';
        else if (answers[index]) className += ' green';
        else className += ' white';
        return `<div class="${className}" onclick="goToQuestion(${index})">Q${index + 1}</div>`;
    }).join('');
}

function updateButtons() {
    document.getElementById("prev-button").style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    document.getElementById("next-button").style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
    document.getElementById("submit-button").style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
        updateButtons();
    }
}

function nextQuestion() {
    const answer = document.querySelector('input[name="answer"]:checked');
    if (answer || answers[currentQuestionIndex] === 'skipped') {
        if (answer) answers[currentQuestionIndex] = answer.value;
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            renderBubbles();
            updateButtons();
        }
    } else {
        alert("Please select an answer or skip the question.");
    }
}



function skipQuestion() {
    answers[currentQuestionIndex] = 'skipped';
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        renderBubbles();
        updateButtons();
    }
}

function submitQuiz() {
    if (!confirm("Are you sure you want to submit?")) {
        return;
    }

    const score = answers.reduce((score, answer, index) => {
        return score + (answer === questions[index].answer ? 1 : 0);
    }, 0);

    document.querySelector(".quiz-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("score").textContent = `${score} / ${questions.length}`;
}
