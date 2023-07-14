import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.rp,
    register("chat", (player) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to reparty. [${player}]`);
            ChatLib.command(`rp`, true)
        }, 300);

    }).setCriteria(/^Party > (.+): ![Rr][PpSs]$/)
);
