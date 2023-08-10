import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

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

        const floorText = number_to_text(floor);

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type}${floorText}. [${player}]`);
        }, 50);

        setTimeout(() => {
            ChatLib.command(`joindungeon ${type}${floorText}`);
        }, 300);
    }).setCriteria(/^Party > (.+): ![Jj][Oo][Ii][Nn] ([FMfm])([0-7])$/)
);

// Support other mod format
registerEventListener(() => Settings.join,
    register("chat", (player, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        const floorText = number_to_text(floor);

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon master_catacombs_${floorText}. [${player}]`);
        }, 50);

        setTimeout(() => {
            ChatLib.command(`joindungeon master_catacombs_${floorText}`);
        }, 300);
    }).setCriteria(/^Party > (.+): ![Mm][ ]?([1-7])$/)
);

registerEventListener(() => Settings.join,
    register("chat", (player, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        const floorText = number_to_text(floor);

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon catacombs_${floorText}. [${player}]`);
        }, 50);

        setTimeout(() => {
            ChatLib.command(`joindungeon catacombs_${floorText}`);
        }, 300);
    }).setCriteria(/^Party > (.+): ![Ff][ ]?([0-7])$/)
);
