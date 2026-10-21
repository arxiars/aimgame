const threats = [
    {name: "Spikeball", phase: 0, threatId: 1},
    {name: "Crusher", phase: 0, threatId: 2},
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
        let num = threatsInRound[i].threatId;

        // SPIKEBALL
        if (num === 1) {
            console.log("SPIKEBALL");
            
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

        // CRUSHER
        if (num === 2) {
            console.log("CRUSHER");

            let crusher = document.createElement("div");
            crusher.className = "hitbox";
            crusher.id = "crusher";
            crusher.style.width = "120px";
            crusher.style.height = "360px";

            gameFrame.append(crusher);

            function changePos() {
                let xPos = Math.floor(Math.random() * 100);
                // let yPos = Math.floor(Math.random() * 100);
                crusher.style.left = xPos + "%";
                crusher.style.top = "-20%";
                crusher.style.transition = "top 0s";

                setTimeout(() => {
                    crusher.style.top = "120%"
                    crusher.style.transition = "top 1s";
                }, 2000);
                
                if (crusher) {
                  setTimeout(changePos, 4 * 1000);  
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
