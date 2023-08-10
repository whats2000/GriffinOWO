import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

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

        const floorText = number_to_text(floor);

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join kuudra ${floorText}. [${player}]`);
        }, 50);

        setTimeout(() => {
            ChatLib.command(`joindungeon kuudra_${floorText}`);
        }, 300);
    }).setCriteria(/^Party > (.+): ![Jj][Oo][Ii][Nn] [Tt]([1-5])$/)
);

// Support other mod format
registerEventListener(() => Settings.join,
    register("chat", (player, floor) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        const floorText = number_to_text(floor);

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join kuudra ${floorText}. [${player}]`);
        }, 50);

        setTimeout(() => {
            ChatLib.command(`joindungeon kuudra_${floorText}`);
        }, 300);
    }).setCriteria(/^Party > (.+): ![Tt][ ]?([1-5])$/)
);
