import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.ptme,
    register("chat", (player) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to transfer party. [${player}]`);
            ChatLib.command(`p transfer ${player}`)
        }, 300);

    }).setCriteria(/^Party > (.+): ![Pp][Tt][Mm][Ee]$/)
);

