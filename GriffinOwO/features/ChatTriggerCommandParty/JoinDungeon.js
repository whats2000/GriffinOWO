import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.join,
    register("chat", (player, type, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        if (type.toLowerCase() === "f")
            type = "catacombs";
        else if (floor === "0")  // No m0 here
            return;
        else
            type = "master_catacombs";


        setTimeout(() => {
            if (floor === '0')
                ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type} entrance. [${player}]`);
            else
                ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type} floor ${floor}. [${player}]`);
        }, 50);

        setTimeout(() => {
            ChatLib.command(`joindungeon ${type} ${floor}`);
        }, 300);
    }).setCriteria(/^Party > (.+): ![Jj][Oo][Ii][Nn] ([FMfm])([0-7])$/)
);

// Support other mod format
registerEventListener(() => Settings.join,
    register("chat", (player, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon master_catacombs floor ${floor}. [${player}]`);
        }, 50);

        setTimeout(() => {
            ChatLib.command(`joindungeon master_catacombs ${floor}`);
        }, 300);
    }).setCriteria(/^Party > (.+): ![Mm] ([1-7])$/)
);

registerEventListener(() => Settings.join,
    register("chat", (player, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        setTimeout(() => {
            if (floor === '0')
                ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon catacombs entrance. [${player}]`);
            else
                ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon catacombs floor ${floor}. [${player}]`);
        }, 50);

        setTimeout(() => {
            ChatLib.command(`joindungeon catacombs ${floor}`);
        }, 300);
    }).setCriteria(/^Party > (.+): ![Ff] ([0-7])$/)
);
