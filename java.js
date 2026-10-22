// elements
const gameFrame = document.getElementById("gameFrame");
const shopFrame = document.getElementById("shopFrame");
const titleText = document.getElementById("titleText");
const startText = document.getElementById("startText");
const levelText = document.getElementById("levelText");
const livesText = document.getElementById("livesText");

let level = 1;
let lives = 3;
let targetsHit = 0;
let baseRequirement = 5; // 20
let requiredHits = level * baseRequirement;
let mouseHitCooldown = false;

let gameState = "titleScreen";

document.addEventListener("click", (event) => {
    let element = event.target;
    if (gameState == "ingame") {
        if (element.id == "gameFrame") {
            console.log("MISS");
            updLives();
        } else if (element.id == "btn") {
            console.log("HIT");
            element.remove();
            updScore();
            createTarget();
        }
    } else if (gameState == "titleScreen") {
        startRound();
    }
})

// cosmetic function
function flash(element, flashColor, ogColor) { 
    element.style.backgroundColor = flashColor;
    element.style.transition = "background-color 0s";
    setTimeout(function() {
        element.style.transition = "background-color .5s";
        element.style.backgroundColor = ogColor;
    }, 5);
}

function endGame() {
    gameState = "gameOver";
    scoreText.textContent = "GAME OVER";
    console.log("GG");
}

function livesGracePeriod() { // a small grace period after losing a life
    mouseHitCooldown = true;
    setTimeout(() => {
        mouseHitCooldown = false;
    }, 500);
}

function updLives() {
    if (gameState == "ingame" && mouseHitCooldown === false) {
        lives--;
        livesText.textContent = "Lives: " + lives;
        livesGracePeriod();
        flash(document.body, "rgba(255, 194, 194, 0.42)", "rgb(255, 255, 255)");
        if (lives <= 0) {
            endGame();
        }
    }
}

function displaySelections() {
    shopFrame.style.visibility = "visible";

    let selectedThreats = [];
    function getRandom() {
        let randomThreat = threats[Math.floor(Math.random() * threats.length)];
        if (!selectedThreats.includes(randomThreat)) {
            selectedThreats.push(randomThreat);
        }
    }
    while (selectedThreats.length < 3) {
        getRandom();
    }

    for (let i = 0; i < selectedThreats.length; i++) {
        const optionBtn =  document.getElementById(`choice${i + 1}`);
        optionBtn.textContent = selectedThreats[i].name;
        optionBtn.onclick = () => onSelect(selectedThreats[i]); // onSelect is a function in threats.js
    }
    console.log(selectedThreats);
}

function intermission() {
    scoreText.textContent = "INTERMISSION";
    targetsHit = 0;
    gameFrame.style.visibility = "hidden";
    document.getElementById("clearText").style.visibility = "hidden";
    displaySelections();
    console.log("INTERMISSION");
};

function updScore() {
    targetsHit++;
    document.getElementById("scoreText").textContent = targetsHit + " / " + requiredHits;

    if (targetsHit >= requiredHits) {
        console.log("REQUIRED HITS CLEARED!");
        gameState = "intermission";
        document.getElementById("clearText").style.visibility = "visible";
        setTimeout(intermission, 1000);
    };
};

function updPos(target, center) {
    if (gameState == "ingame") {
        if (center === true) {
            target.style.left = "50%";
            target.style.top = "50%";
        } else {
            let xPos = Math.floor(Math.random() * 100);
            let yPos = Math.floor(Math.random() * 100);
            target.style.left = xPos + "%";
            target.style.top = yPos + "%";
        }
        console.log("POSITION:", target.style.left, btn.style.top);
        flash(target, "rgb(75, 192, 97)", "rgb(255, 255, 255)");
    };
};

function createTarget(center) {
    if (gameState == "ingame") {
        let target = document.createElement("button");
        target.id = "btn";

        gameFrame.append(target);
        console.log("TARGET CREATED");
        
        updPos(target, center);
    };
};

// function startTimer() {
//     if (gameActive == false) {
//         gameActive = true
//         let duration = time
//         document.getElementById("timerText").textContent = "Timer: " + duration
//         let timerThread = setInterval(() => {
//             document.getElementById("timerText").textContent = "Timer: " + duration
//             if (duration > 0 && gameActive == true) {
//                  duration -= 1
//                 document.getElementById("timerText").textContent = "Timer: " + duration
//                 console.log(duration)
//             } else if (duration <= 0 || lives <= 0) {
//                 endGame()
//                 clearInterval(timerThread)
//             }
//          }, 1000);
//     }
// }

function clearTargets() {
    const targets = document.querySelectorAll("#btn");
    targets.forEach(element => element.remove());
};

function startRound() {
    console.log("STARTED");
    titleText.style.visibility = "hidden";
    startText.style.visibility = "hidden";
    gameFrame.style.visibility = "visible";
    shopFrame.style.visibility = "hidden";
    levelText.textContent = "LEVEL " + level;
    livesText.textContent = "LIVES: " + lives;
    scoreText.textContent = "0 / " + requiredHits;
    gameState = "ingame";
    clearTargets();
    createTarget(true);
};
