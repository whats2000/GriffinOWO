import Settings from "../../config";
import { getIGN } from "../../utils/Function";
import { checkInWorld } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.customDeathMessage !== "" && checkInWorld("Dungeon"),
    register("chat", (message) => {
        const words = message.split(" ");

        const player = getIGN(words[0]);
        if (player === "You" || player === Player.getName()) return;

        let randomDeathMessage = "";
        if (Settings.customDeathMessage.includes("|")) {
            const messageArr = Settings.customDeathMessage.split("|");
            randomDeathMessage = messageArr[Math.floor(Math.random() * messageArr.length)].replace("{player}", player);
        }
        else {
            randomDeathMessage = Settings.customDeathMessage.replace("{player}", player);
        }

        setTimeout(() => {
            ChatLib.command(`pc ${randomDeathMessage}`);
        }, 300);
    }).setCriteria(" ☠ ${message} became a ghost.")
);
