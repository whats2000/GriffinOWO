import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerCommand } from "../../utils/CommandQueue";
import { registerEventListener } from "../../utils/EventListener";

let lastAttemptWarpTime = 0;
let joinFloor = "";
let triggerPlayer = "";

function number_to_text(num) {
    switch (num) {
        case "1": return "normal"; // Idk why it not "basic", I try so far found it call "normal"
        case "2": return "hot";
        case "3": return "burning";
        case "4": return "fiery";
        case "5": return "infernal";
    }
}

registerEventListener(() => Settings.join,
    register("chat", (player, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
        registerCommand(() => {
            ChatLib.command('party list');
        });

        const floorText = number_to_text(floor);

        lastAttemptWarpTime = new Date().getTime();
        joinFloor = `kuudra_${floorText}`;
        triggerPlayer = player;
    }).setCriteria(/^Party > (.+): ![Jj][Oo][Ii][Nn] [Tt]([1-5])$/)
);

// Support other mod format
registerEventListener(() => Settings.join,
    register("chat", (player, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
        registerCommand(() => {
            ChatLib.command('party list');
        });

        const floorText = number_to_text(floor);

        lastAttemptWarpTime = new Date().getTime();
        joinFloor = `kuudra_${floorText}`;
        triggerPlayer = player;
    }).setCriteria(/^Party > (.+): ![Tt][ ]?([1-5])$/)
);

registerEventListener(() => Settings.join,
    register("chat", (mode, names, e) => {
        if (new Date().getTime() - lastAttemptWarpTime > 1000) return;
        if (mode !== "Leader") return;
        const myIGN = getIGN(Player.getName()).toLowerCase();

        let leader = getIGN(names).toLowerCase();
        if (leader !== myIGN) {
            lastAttemptWarpTime = 0;
            return;
        };

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join ${joinFloor}. [${triggerPlayer}]`);
        }, 50);

        setTimeout(() => {
            registerCommand(() => {
                ChatLib.command(`joindungeon ${joinFloor}`);
            });
        }, 300);
    }).setChatCriteria("Party ${mode}: ${names}")
);
