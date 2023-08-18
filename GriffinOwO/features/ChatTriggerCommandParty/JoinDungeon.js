import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerCommand } from "../../utils/CommandQueue";
import { registerEventListener } from "../../utils/EventListener";

let lastAttemptWarpTime = 0;
let joinFloor = "";
let triggerPlayer = "";

function number_to_text(num) {
    switch (num) {
        case "0": return "entrance";
        case "1": return "floor_one";
        case "2": return "floor_two";
        case "3": return "floor_three";
        case "4": return "floor_four";
        case "5": return "floor_five";
        case "6": return "floor_six";
        case "7": return "floor_seven";
        default: return "floor_one";
    }
}

registerEventListener(() => Settings.join,
    register("chat", (player, type, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        if (type.toLowerCase() === "f")
            type = "catacombs_";
        else if (floor === "0")  // No m0 here
            return;
        else
            type = "master_catacombs_";

        ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
        registerCommand(() => {
            ChatLib.command('party list');
        });

        const floorText = number_to_text(floor);

        lastAttemptWarpTime = new Date().getTime();
        joinFloor = `${type}${floorText}`;
        triggerPlayer = player;
    }).setCriteria(/^Party > (.+): ![Jj][Oo][Ii][Nn] ([FMfm])([0-7])$/)
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
        joinFloor = `master_catacombs_${floorText}`;
        triggerPlayer = player;
    }).setCriteria(/^Party > (.+): ![Mm][ ]?([1-7])$/)
);

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
        joinFloor = `catacombs_${floorText}`;
        triggerPlayer = player;
    }).setCriteria(/^Party > (.+): ![Ff][ ]?([0-7])$/)
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
