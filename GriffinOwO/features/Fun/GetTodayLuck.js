import Settings from "../../config";
import { getIGN, checkWhitelist, getUniqueValue } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

// !rng
registerEventListener(() => Settings.rng,
    register("chat", (player) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        let unitque_num = getUniqueValue(player);

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fRunning rng generator. [${player}]`);
            if (unitque_num <= 50) {
                ChatLib.command(`pc ${player} you are ${unitque_num} % chance to get rng!`)
            }
            else {
                ChatLib.command(`pc ${player} you are ${unitque_num} % chance not to get rng!`)
            }
        }, 300);

    }).setCriteria(/^Party > (.+): ![Rr][Nn][Gg]$/)
);
