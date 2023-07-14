import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.mute,
    register("chat", (player) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to mute party. [${player}]`);
            ChatLib.command(`p mute`)
        }, 300);
    }).setCriteria(/^From (.+): ![Mm][Uu][Tt][Ee](.*)?$/)
);