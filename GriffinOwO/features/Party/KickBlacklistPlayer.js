import Settings from "../../config";
import { registerCommand } from "../../utils/CommandQueue";
import { getIGN, checkWhitelist } from "../../utils/Function";

register("chat", (player) => {
    if (!Settings.kickNotWelcomePlayer) return;

    player = getIGN(player);

    if (checkWhitelist(player)) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fKick ${player} as it is not welcome!`);
    }, 30);

    registerCommand(() => {
        ChatLib.command(`party kick ${player}`);
    });
}).setCriteria("${player} joined the party.");
