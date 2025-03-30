const words = {
    "NHLin": { answer: "Skibidi", rarity: "Legendary", weight: 3 },
    "BSK": { answer: "Fenum tax", rarity: "Legendary", weight: 3 },
    "Darren": { answer: "Ohio", rarity: "Legendary", weight: 3 },
    "Hao Zhe": { answer: "mogged", rarity: "Legendary", weight: 3 },
    "Steve": { answer: "Fanum tax", rarity: "Legendary", weight: 3 },
    "Jaden": { answer: "Sigma", rarity: "Legendary", weight: 3 },
    "Albert chin": { answer: "Gyatt", rarity: "Legendary", weight: 3 },
    "Noah": { answer: "POV", rarity: "Legendary", weight: 3 },
    "Galvin": { answer: "rizz", rarity: "Legendary", weight: 3 },
    "Nevin": { answer: "Ling-gang-gu", rarity: "Common", weight: 1 },
    "Jorgina": { answer: "gorilla", rarity: "Epic", weight: 2 },
    "Vivien": { answer: "Forgiveness", rarity: "Epic", weight: 2 },
    "Yanxi": { answer: "moaning master", rarity: "Epic", weight: 2 },
    "Eddy": { answer: "Learner", rarity: "Epic", weight: 2 },
    "Junteng": { answer: "Indian", rarity: "Epic", weight: 2 },
    "Jeff": { answer: "Fatty Acid", rarity: "Mythic", weight: 4 },
    "Jeff Lai": { answer: "Oil Up", rarity: "Common", weight: 1 },
    "Ejaculating Ethan": { answer: "Administrator", rarity: "Mythic", weight: 4 },
    "Aeryn": { answer: "Galvin", rarity: "Epic", weight: 2 },
    "Javier": { answer: "5 Big Mac", rarity: "Common", weight: 1 },
    "Iris": { answer: "eyes", rarity: "Common", weight: 1 },
    "Albert Kong": { answer: "Hok", rarity: "Common", weight: 1 },
    "Hibernation NHLin": { answer: "Sleep", rarity: "Common", weight: 1 },
    "Fredrick": { answer: "CHZ", rarity: "Common", weight: 1 },
    "Galvin Rizz": { answer: "Aeryn", rarity: "Common", weight: 1 },
    "Eddy Ng": { answer: "Diddy", rarity: "Epic", weight: 2 },
    "Albert Pung": { answer: "BGyat+", rarity: "Mythic", weight: 4 },
    "Rage BSK": { answer: "male", rarity: "Mythic", weight: 4 },
    "Jeff Stone Henge": { answer: "???", rarity: "Secret", weight: 5 },
    "CHZ's mom": { answer: "The main factor", rarity: "Secret", weight: 5 },
    "Secret": { answer: "Godly", rarity: "Common", weight: 1 },
    "Ethanol": { answer: "Boom", rarity: "Godly", weight: 5 },
    "Frustrated Jeff": { answer: "BRO", rarity: "Godly", weight: 5 },
    "Frustrated CHZ": { answer: "RM400", rarity: "Mythic", weight: 4 },
    "Structure": { answer: "Ambient", rarity: "Secret", weight: 5 },
    "KJTanime": { answer: "Furry", rarity: "Mythic", weight: 4 },
    "Eddy Ng": { answer: "Lose is Win", rarity: "Common", weight: 1 },
    "Argentina": { answer: "NHLin", rarity: "Epic", weight: 2 },
    "Adolf CHZ": {answer: "Erika", rarity: "Common", weight: 1},
    "NevinLee" : {answer : "Jerkmate", rarity: "Common", weight: 1},
    "Albert Rang" : {answer: "Glycerol", rarity: "Rare", weight: 1.75},
    "PKBSK" : {answer: "Amino acid", rarity: "Epic", weight: 2},
    "Jeffrey Bozos" : {answer: "Glucose", rarity: "Common", weight: 1},
    "Noah Chin" : {answer: "not my lover", rarity: "Rare", weight: 1.75},
    "NevinLegacy" : {answer: "Arminous", rarity: "Epic", weight: 2},
    "Pretentiousness Steve" : {answer: "No Ball", rarity: "Legendary", weight: 3},
    "Darren Tien" : {answer: "Mathematic", rarity: "Rare", weight: 1.75},
    "Bio Zhe" : {answer: "Bioengineering", rarity: "Common", weight: 1}
};

const rarityWeights = {
    "Common": 70,
    "Epic": 20,
    "Legendary": 7.5,
    "Mythic": 1.5,
    "Godly": 0.5,
    "Secret": 0.1
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
    const rarity = getRandomRarity();
    const availableWords = Object.entries(words).filter(([_, word]) => word.rarity === rarity);
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)][0];
    currentWord = randomWord;
    correctAnswer = words[currentWord].answer;
    const currentRarity = words[currentWord].rarity;

    document.getElementById("word").textContent = currentWord;
    document.getElementById("rarity").textContent = currentRarity;
    document.getElementById("rarity").className = currentRarity;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    const options = [correctAnswer];
    while (options.length < 4) {
        const randomWord = Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)];
        const randomOption = words[randomWord].answer;
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

function getRandomRarity() {
    const totalWeight = Object.values(rarityWeights).reduce((a, b) => a + b, 0);
    let randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const rarity in rarityWeights) {
        cumulativeWeight += rarityWeights[rarity];
        if (randomNum < cumulativeWeight) {
            return rarity;
        }
    }
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
        streak++;

        if (streak > highestStreak) {
            highestStreak = streak;
        }

        const rarityScore = {
            "Common": 1,
            "Epic": 2,
            "Legendary": 3,
            "Mythic": 4,
            "Godly": 6,
            "Secret": 8
        };

        score += rarityScore[words[currentWord].rarity];

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