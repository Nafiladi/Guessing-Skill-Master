const words = {
    "NHLin": "Skibidi",
    "BSK": "Fenum tax",
    "Darren": "Ohio",
    "Hao Zhe": "mogged",
    "Steve": "Fanum tax",
    "Jaden": "Sigma",
    "Albert chin": "Gyatt",
    "Noah": "POV",
    "Galvin": "rizz"
};

let currentWord;
let correctAnswer;
let score = 0;
let streak = 0;
let highestStreak = 0;
let timeLeft = 10; 
let timerInterval;

const backgroundMusic = new Audio("backgroundMusic.mp3");
backgroundMusic.loop = true;
backgroundMusic.play();

function startGame() {
    const wordKeys = Object.keys(words);
    currentWord = wordKeys[Math.floor(Math.random() * wordKeys.length)];
    correctAnswer = words[currentWord];

    document.getElementById("word").textContent = currentWord;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    const options = [correctAnswer];
    while (options.length < 4) {
        const randomOption = Object.values(words)[Math.floor(Math.random() * Object.values(words).length)];
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.textContent = option;
        optionDiv.addEventListener("click", () => checkAnswer(option));
        optionsDiv.appendChild(optionDiv);
    });

    document.getElementById("play-again").style.display = "none";
    startTimer();
}

function startTimer() {
    timeLeft = 10;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(null); 
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById("timer").textContent = "Time: " + timeLeft;
}

function checkAnswer(selectedOption) {
    clearInterval(timerInterval); 
    const resultDiv = document.getElementById("result");
    const scoreDiv = document.getElementById("score");
    const streakDiv = document.getElementById("streak");
    const highestStreakDiv = document.getElementById("highest-streak");

    if (selectedOption === correctAnswer) {
        resultDiv.textContent = "Correct!";
        score++;
        streak++;

        if (streak > highestStreak) {
            highestStreak = streak;
        }

        const sound = new Audio(correctAnswer + ".mp3");
        sound.play();
        startGame();
    } else {
        resultDiv.textContent = "Incorrect! The correct answer is: " + correctAnswer;
        streak = 0;
        document.getElementById("play-again").style.display = "block";
    }
    scoreDiv.textContent = "Score: " + score;
    streakDiv.textContent = "Streak: " + streak;
    highestStreakDiv.textContent = "Highest Streak: " + highestStreak;
}

document.getElementById("play-again").addEventListener("click", () => {
    streak = 0;
    document.getElementById("streak").textContent = "Streak: " + streak;
    startGame();
});

startGame();