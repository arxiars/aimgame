const threats = [
    {name: "Spikeballs", phase: 0, threatId: 1},
    {name: "threat2", phase: 0, threatId: 2},
    {name: "threat3", phase: 0, threatId: 3},
];

let threatsInRound = [];

function detectHitboxes() {
    const hitboxes = document.querySelectorAll(".hitbox");
    hitboxes.forEach(element => {
        element.onmouseenter = function() {
            console.log("HIT");
            updLives();
        };
    });
};

function activateThreats() {
    for (let i = 0; i < threatsInRound.length; i++) {
        if (gameState !== "ingame") {
            return;
        };

        // SPIKEBALL
        if (threatsInRound[i].threatId === 1) {
            console.log("SPIKEBALL GO");
            
            let spikeball = document.createElement("div");
            spikeball.className = "hitbox";
            spikeball.id = "spikeball";
            spikeball.style.width = "0px";
            spikeball.style.height = "0px";

            let spikes = document.createElement("img");
            spikes.src = "assets/spikeball_spikes.png";
            spikes.id = "spikeballSpikes";
            spikes.style.zIndex = 0;

            let core = document.createElement("img");
            core.src = "assets/spikeball_core.png";
            core.id = "spikeballCore";
            core.style.zIndex = 1;

            spikeball.append(core);
            spikeball.append(spikes);
            gameFrame.append(spikeball);

            function changePos() {
                let xPos = Math.floor(Math.random() * 100);
                let yPos = Math.floor(Math.random() * 100);
                spikeball.style.left = xPos + "%";
                spikeball.style.top = yPos + "%";

                setTimeout(() => {
                spikeball.style.width = "160px";
                spikeball.style.height = "160px";
                }, 0.1 * 1000);
                setTimeout(() => {
                    spikeball.style.width = "0px";
                    spikeball.style.height = "0px";
                }, 6 * 1000);
                
                if (spikeball) {
                  setTimeout(changePos, 8 * 1000);  
                };
            };
            changePos();
        };
    };

    detectHitboxes();
};

function onSelect(threat) {
    threatsInRound.push(threat);
    threat.phase++;
    console.log("THREAT:", threat);

    level++;
    targetsHit = 0;
    requiredHits = level * baseRequirement;
    gameFrame.innerHTML = "";
    startRound();

    activateThreats();
};
