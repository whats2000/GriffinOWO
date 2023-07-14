import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.allinv,
    register("chat", (player) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to set party all invite on. [${player}]`);
            ChatLib.command("p setting allinvite")
        }, 300);

    }).setCriteria(/^Party > (.+): ![Aa][Ll]{2}[Ii][Nn][Vv]([Ii][Tt][Ee])?$/)
);
