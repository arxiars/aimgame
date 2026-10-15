const threats = [
    {name: "Spikeballs", phase: 0, threatId: 1},
    {name: "threat2", phase: 0, threatId: 2},
    {name: "threat3", phase: 0, threatId: 3},
];

let threatsInRound = [];

function activateThreats() {
    for (let i = 0; i < threatsInRound.length; i++) {
        if (threatsInRound[i].threatId === 1) {
            // SPIKEBALL
            let spikeball = null;
            function spikeballs() {
                if (gameState === "ingame") {
                    console.log("SPIKEBALL GO");
                    if (spikeball) {
                        spikeball.remove();
                    };
                    spikeball = document.createElement("div");
                    spikeball.className = "hitbox";
                    spikeball.id = "spikeball"
                    spikeball.style.backgroundColor = "red";
                    spikeball.style.width = "80px";
                    spikeball.style.height = "80px";

                    let xPos = Math.floor(Math.random() * 100)
                    let yPos = Math.floor(Math.random() * 100)
                    spikeball.style.left = xPos + "%"
                    spikeball.style.top = yPos + "%"

                    gameFrame.append(spikeball);

                    setTimeout(spikeballs, 2000);

                    // spikeball.onmouseenter = function() {
                    //     console.log("HIT")
                    //     updLives()
                    // }
                };
            };
            spikeballs();
        };
    };
};

let hitboxes = document.querySelectorAll(".hitbox")
hitboxes.forEach(element => {
    element.addEventListener("mouseenter", (event) => {
        console.log("HIT")
        endGame()
    })
})

function onSelect(threat) {
    threatsInRound.push(threat);
    threat.phase++;
    console.log("THREAT:", threat);

    level++;
    targetsHit = 0;
    requiredHits = level * baseRequirement;
    startRound();

    activateThreats();
};
