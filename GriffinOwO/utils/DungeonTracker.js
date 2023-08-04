import { checkInZone, checkInWorld } from "../utils/Location";
import { getIGN, romanToInt } from "../utils/Function"
import { registerEventListener } from "../utils/EventListener";

let phase = -1;
let partyMember = 0;
let party = {};
let cdReduce = 1;

export function updateClass() {
    const PartyLine = TabList.getNames().find(tab => tab.includes("§r§b§lParty §r§f("));
    if (PartyLine) {
        const regex = /\d+/g;
        partyMember = PartyLine.match(regex);
        //ChatLib.chat(`&2[GriffinOwO] &fHave member count [${partyMember}] in your party`);

        const tab = TabList.getNames()

        for (let i = 0; i < partyMember; i++) {
            let player = getIGN(tab[1 + i * 4].removeFormatting().split(" ")[1]);
            const classRegex = /\((\S+)\s+(\S+)\)/;
            const classMatch = tab[1 + i * 4].removeFormatting().match(classRegex);

            if (!classMatch) {
                partyRetryCount++;
                if (partyRetryCount < 10) {
                    //ChatLib.chat("&2[GriffinOwO] &fFailed to get class. Retry");
                    setTimeout(updateClass, 1000);
                    return;
                } else {
                    ChatLib.chat("&2[GriffinOwO] &fFailed to get class.");
                    return;
                }
            }

            party[player] = {
                class: classMatch[1],
                level: isNaN(romanToInt(classMatch[2])) ? 0 : romanToInt(classMatch[2])
            }
        }
        ChatLib.chat(`&2[GriffinOwO] &fYou are playing ${party[Player.getName()].class} ${party[Player.getName()].level}`);

        if (party[Player.getName()].class === "Mage") {
            const magePlayers = [];
            for (let player in party) {
                if (party[player].class === "Mage") {
                    magePlayers.push(player);
                }
            }

            cdReduce = magePlayers.length > 1 ? 1 - party[Player.getName()].level * 0.01 : 1 - party[Player.getName()].level * 0.01 * 1.5;
            //ChatLib.chat(`&2[GriffinOwO] &fCool down now is ${cdReduce}`);
        }
    } else {
        partyRetryCount++;
        if (partyRetryCount < 10) {
            //ChatLib.chat("&2[GriffinOwO] &fFailed to get party. Retry");
            setTimeout(updateClass, 1000);
        } else {
            ChatLib.chat("&2[GriffinOwO] &fFailed to get party.");
        }
    }
}

registerEventListener(() => checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)"),
    register('chat', () => {
        phase = 71;
    }).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!")
);

registerEventListener(() => checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)"),
    register('chat', () => {
        phase = 72;
    }).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")
);

registerEventListener(() => checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)"),
    register('chat', () => {
        phase = 73;
    }).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")
);

registerEventListener(() => checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)"),
    register('chat', () => {
        phase = 74;
    }).setCriteria("[BOSS] Necron: Finally, I heard so much about you. The Eye likes you very much.")
);

registerEventListener(() => checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)"),
    register('chat', () => {
        phase = 74;
    }).setCriteria("[BOSS] Necron: You went further than any human before, congratulations.")
);

registerEventListener(() => checkInZone("The Catacombs (M7)"),
    register('chat', () => {
        phase = 75;
    }).setCriteria("[BOSS] Wither King: Ohhh?")
);

registerEventListener(() => checkInZone("The Catacombs (M7)"),
    register('chat', () => {
        phase = 75;
    }).setCriteria("[BOSS] Wither King: You.. again?")
);

registerEventListener(() => checkInWorld("Dungeon"),
    register('chat', () => {
        partyRetryCount = 0;
        partyMember = 0;
        party = {};

        updateClass();
    }).setCriteria("Starting in 1 second${end}")
);

register("worldUnload", () => {
    phase = -1;
    cdReduce = 1;
    partyMember = 0;
    party = {};
});

export function getDungeonPhase() {
    return phase;
}

export function getCdReduce() {
    return cdReduce;
}

//["All Class", "Archer", "Berserk", "Healer", "Tank", "Mage"]
export function getPlayerClass() {
    if (party[Player.getName()])
        switch (party[Player.getName()].class) {
            case "Archer":
                return 1;
            case "Berserk":
                return 2;
            case "Healer":
                return 3;
            case "Tank":
                return 4;
            case "Mage":
                return 5
            default:
                return undefined;
        }
    else
        return undefined;
}
