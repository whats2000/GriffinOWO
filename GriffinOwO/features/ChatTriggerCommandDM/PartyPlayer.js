import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.party,
    register("chat", (player) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to party. [${player}]`);
            ChatLib.command(`p ${player}`)
        }, 300);

    }).setCriteria(/^From (.+): ![Pp][Aa][Rr][Tt][Yy](.*)?$/)
);
