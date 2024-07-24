import Settings from "../../config";
import { checkInWorld } from "../../utils/Location";
import { registerCommand } from "../../utils/CommandQueue";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.vanquisher && Settings.flarePartyList === "" && checkInWorld("Crimson Isle"),
    register("Chat", (event) => {
        const formatted_message = ChatLib.getChatMessage(event, true);

        if (!formatted_message.includes("&r&aA &r&cVanquisher &r&ais spawning nearby!&r")) return;

        let channel = "";

        switch (Settings.vanquisherAlertChat) {
            case 0:
                channel = "pc";
                break;
            case 1:
                channel = "gc";
                break;
            case 2:
                channel = "ac";
                break;
            default:
                channel = "pc";
        }

        const scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) });

        let location = "";

        for (let line of scoreboard) {
            if (line.includes("⏣")) {
                location = line;
                break;
            }
        }

        const playerX = Math.floor(Player.getX());
        const playerY = Math.floor(Player.getY());
        const playerZ = Math.floor(Player.getZ());

        registerCommand(() => {
            ChatLib.command(`${channel} x: ${playerX}, y: ${playerY}, z: ${playerZ}`)
        });

        registerCommand(() => {
            ChatLib.command(`${channel} [!] Vanquisher is spawned at [${location} ] [!]`)
        });
    })
);

registerEventListener(() => Settings.vanquisher && Settings.flarePartyList === "" && checkInWorld("Crimson Isle"),
    register("Chat", (event) => {
        const formatted_message = ChatLib.getChatMessage(event, true);

        if (!formatted_message.includes("&r&6&lRARE DROP! &r&6Nether Star&r")) return;

        let channel = "";

        switch (Settings.vanquisherAlertChat) {
            case 0:
                channel = "pc";
                break;
            case 1:
                channel = "gc";
                break;
            case 2:
                channel = "ac";
                break;
            default:
                channel = "pc";
        }

        registerCommand(() => {
            ChatLib.command(`${channel} Vanquisher is killed!`)
        });
    })
);
