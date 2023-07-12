import Settings from '../config'

let phase = -1;

// Reset When Start
register("chat", () => {
    phase = 0;
    if (Settings.kuudraShowPhrase)
        Client.Companion.showTitle(`&l&aGet Ready`, "", 5, 25, 5);
}).setCriteria("[NPC] Elle: Talk with me to begin!");

// Supply Spawn
register("chat", () => {
    phase = 1;
    if (Settings.kuudraShowPhrase)
        Client.Companion.showTitle(`&l&aSupply Spawn`, "", 5, 25, 5);
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!");

// All Supply Done
register("chat", () => {
    phase = 2;
    if (Settings.kuudraShowPhrase)
        Client.Companion.showTitle(`&l&aSupply Done`, "", 5, 25, 5);
}).setCriteria("[NPC] Elle: OMG! Great work collecting my supplies!");

// Build Done
register("chat", () => {
    phase = 3;
    if (Settings.kuudraShowPhrase)
        Client.Companion.showTitle(`&l&aBuild Done`, "", 5, 25, 5);
}).setCriteria("[NPC] Elle: Phew! The Ballista is finally ready! It should be strong enough to tank Kuudra's blows now!");

// Hit Stage Done
register("chat", () => {
    phase = 4;
    if (Settings.kuudraShowPhrase)
        Client.Companion.showTitle(`&l&aHit Phrase Done`, "", 5, 25, 5);
}).setCriteria("[NPC] Elle: POW! SURELY THAT'S IT! I don't think he has any more in him!");

// Finish
register("chat", () => {
    phase = -1;
}).setCriteria("${before}KUUDRA DOWN${after}");

// Fail
register("chat", () => {
    phase = -1;
}).setCriteria("${before}DEFEAT${after}");

register("worldUnload", () => {
    phase = -1;
});

function getCurrentPhase() {
    return phase;
}

export default getCurrentPhase;
