import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.warp,
    register("chat", (player) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;


        let delay = Settings.warpDelay;

        if (delay > 0)
            setTimeout(() => {
                ChatLib.command(`pc Party warping in ${delay}s please leave if you don't want to warp!`)
            }, 300);

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to warp party. [${player}]`);
            ChatLib.command("p warp")
        }, 300 + 1000 * delay);
    }).setCriteria(/^Party > (.+): ![Ww][Aa][Rr][Pp]$/)
);
