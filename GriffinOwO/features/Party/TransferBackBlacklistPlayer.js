import Settings from "../../config";
import { registerCommand } from "../../utils/CommandQueue";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.transferBackNotWelcomePlayer,
    register("chat", (target, player) => {
        target = getIGN(target).toLowerCase();
        const myIGN = getIGN(Player.getName()).toLowerCase();

        if (target !== myIGN) return;

        player = getIGN(player);
        if (checkWhitelist(player)) return;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &fTransfer back to ${player} as it is not welcome!`);
        }, 30);

        registerCommand(() => {
            ChatLib.command(`party transfer ${player}`);
        });
    }).setCriteria("The party was transferred to ${target} by ${player}")
);