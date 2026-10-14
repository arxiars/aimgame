const threats = [
    {name: "Spikeballs", phase: 0, threatId: 1},
    {name: "threat2", phase: 0, threatId: 2},
    {name: "threat3", phase: 0, threatId: 3},
]

let threatsInRound = []

function activateThreats() {
    for (let i = 0; i < threatsInRound.length; i++) {
        if (threatsInRound[i].threatId === 1) {
            console.log("threat 1 activate here or something idk")
            // do {
            //     console.log("a")
            // } while (gameState == "ingame")
        }
    }
}

function onSelect(threat) {
    threatsInRound.push(threat)
    threat.phase++
    console.log("THREAT:", threat)

    level++
    targetsHit = 0
    requiredHits = level * baseRequirement
    startRound()

    activateThreats()
}
