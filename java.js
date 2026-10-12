// elements
let gameFrame = document.getElementById("gameFrame")
let titleText = document.getElementById("titleText")
let startText = document.getElementById("startText")
let levelText = document.getElementById("levelText")
let livesText = document.getElementById("livesText")

let score = 0
let level = 1
let lives = 3

let targetsHit = 0
let requiredHits = level * 30

let gameState = "titleScreen"

document.addEventListener("click", (event) => {
    let element = event.target;
    if (gameState == "ingame") {
        if (element.id == "gameFrame") {
            console.log("MISS")
            updLives()
            flash(document.body, "rgba(255, 194, 194, 0.42)", "rgb(255, 255, 255)")
        } else if (element.id == "btn") {
            console.log("HIT")
            element.remove()
            createTarget()
        }
    } else if (gameState == "titleScreen") {
        if (element.id == "gameFrame") {
            start()
        }
    }
});

// cosmetic function
function flash(element, flashColor, ogColor) { 
    element.style.backgroundColor = flashColor
    element.style.transition = "background-color 0s"
    setTimeout(function() {
        element.style.transition = "background-color .5s";
        element.style.backgroundColor = ogColor;
    }, 5);
}

function endGame() {
    gameState = "gameOver"
    document.getElementById("scoreText").textContent = "GAME OVER"
    console.log("GG")
}

function updLives() {
    if (gameState == "ingame") {
        lives--
        document.getElementById("livesText").textContent = "Lives: " + lives
        if (lives <= 0) {
            endGame()
        }
    }
}

function updScore() {
    score += 1
    targetsHit++
    document.getElementById("scoreText").textContent = targetsHit + " / " + requiredHits
}

function updPos(target) {
    if (gameState == "ingame") {
        let xPos = Math.floor(Math.random() * 90) + 5
        let yPos = Math.floor(Math.random() * 90) + 5
        target.style.left = xPos + "%"
        target.style.top = yPos + "%"

        console.log("POSITION:", target.style.left, btn.style.top)

        updScore()
        flash(target, "rgb(146, 228, 161)", "rgb(255, 255, 255)")
    }
}

function createTarget() {
    if (gameState == "ingame") {
        let target = document.createElement("button")
        target.id = "btn"

        gameFrame.append(target)
        console.log("TARGET CREATED")

        updPos(target)
    }
}

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

function start() {
    console.log("STARTED")
    titleText.style.visibility = "hidden"
    startText.style.visibility = "hidden"
    levelText.innerHTML = "LEVEL " + level
    livesText.innerHTML = "LIVES: " + lives
    gameState = "ingame"
    createTarget()
}
