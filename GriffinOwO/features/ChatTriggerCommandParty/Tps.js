import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { getTps } from "../../utils/ServerUtils";
import { registerEventListener } from "../../utils/EventListener";

let totalTps = 0;
let count = 0;

function calculateThreeSecondAvarageTps() {
    count++;
    totalTps += getTps()

    if (count >= 60) {
        ChatLib.command(`pc Tps > ${(totalTps / 60).toFixed(1)}`);
        count = 0;
        totalTps = 0;
        return;
    }

    setTimeout(() => {
        calculateThreeSecondAvarageTps();
    }, 50);
}

registerEventListener(() => Settings.tps,
    register("chat", (player) => {
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        if (count === 0) {
            setTimeout(() => {
                ChatLib.chat(`&2[GriffinOwO] &fTrying to get tps, wait for 3s. [${player}]`);
                calculateThreeSecondAvarageTps();
            }, 10);
        } else {
            setTimeout(() => {
                ChatLib.chat(`&2[GriffinOwO] &fCalculating please wait!`);
            }, 10);
        }
    }).setCriteria(/^Party > (.+): ![Tt][Pp][Ss]$/)
);
