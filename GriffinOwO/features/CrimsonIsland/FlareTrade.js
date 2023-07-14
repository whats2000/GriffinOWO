import Settings from "../../config";
import { getIGN } from "../../utils/Function";
import { registerCommand } from "../../utils/CommandQueue";
import { registerEventListener } from "../../utils/EventListener";

let playerX = 0;
let playerY = 0;
let playerZ = 0;

let location = "";
let flareInviteTarget = [];
let flareInvitePlayersCount = 0;
let flareWaitForJoin = false;

function warpFlareParty() {
    registerCommand(() => {
        ChatLib.command("party warp");
    });

    registerCommand(() => {
        ChatLib.command(`pc x: ${playerX}, y: ${playerY}, z: ${playerZ}`)
    });

    registerCommand(() => {
        ChatLib.command(`pc [!] Vanquisher is spawned at [${location} ] [!]`)
    });
}

function checkIsAllWarp() {
    if (!flareWaitForJoin) return;

    flareInvitePlayersCount--;

    if (flareInvitePlayersCount <= 0) {
        warpFlareParty()
        flareInvitePlayersCount = 0;

        setTimeout(() => {
            ChatLib.chat("&2[GriffinOwO] &fAll players have joined the party.");
        }, 30);

        registerCommand(() => {
            ChatLib.command("party disband");
        });

        waitForJoin = false;
    }
}

registerEventListener(() => Settings.flarePartyList !== "",
    register("Chat", (event) => {
        if (flareWaitForJoin) return;

        const formatted_message = ChatLib.getChatMessage(event, true);

        if (!formatted_message.includes("&r&aA &r&cVanquisher &r&ais spawning nearby!&r")) return;

        const scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) });

        for (let line of scoreboard) {
            if (line.includes("⏣")) {
                location = line;
                break;
            }
        }

        playerX = Math.floor(Player.getX());
        playerY = Math.floor(Player.getY());
        playerZ = Math.floor(Player.getZ());

        flareInviteTarget = Settings.flarePartyList.split(" ")
            .map(player => player.toLowerCase());

        flareInvitePlayersCount = flareInviteTarget.length;

        flareWaitForJoin = true;

        let i = 1;
        // run /party 
        flareInviteTarget.forEach(player => {
            registerCommand(() => {
                ChatLib.command(`party ${player}`);
            });
            i++;
        });
    })
);

registerEventListener(() => Settings.flarePartyList !== "",
    register("chat", (player) => {
        if (!flareWaitForJoin) return;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &f${player} has joined the party.`);

            if (flareInvitePlayersCount > 0)
                ChatLib.chat(`&2[GriffinOwO] &fWaiting for ${flareInvitePlayersCount} players to join`);
        }, 30);

        checkIsAllWarp();
    }).setCriteria("${player} joined the party.")
);

registerEventListener(() => Settings.flarePartyList !== "",
    register("chat", () => {
        checkIsAllWarp();
    }).setCriteria("Couldn't find a player with that name!")
);

registerEventListener(() => Settings.flarePartyList !== "",
    register("chat", () => {
        checkIsAllWarp();
    }).setCriteria("You cannot invite that player since they're not online.")
);

registerEventListener(() => Settings.flarePartyList !== "",
    register("chat", () => {
        checkIsAllWarp();
    }).setCriteria("The party invite to ${player} has expired")
);

registerEventListener(() => Settings.flarePartyList !== "",
    register("chat", () => {
        flareWaitForJoin = false;
        flareInvitePlayersCount = 0;
    }).setCriteria("RARE DROP! Nether Star")
);

registerEventListener(() => Settings.flarePartyList !== "",
    register("command", () => {
        flareWaitForJoin = false;
        flareInvitePlayersCount = 0;
        checkIsAllWarp();
    }).setName("fw")
);

registerEventListener(() => Settings.flarePartyList !== "" && Settings.flareTradeAutoJoin,
    register("chat", (player) => {
        if (flareWaitForJoin) return;

        const flarePartyMember = Settings.flarePartyList.split(" ")
            .map(player => player.toLowerCase());

        const ign = getIGN(player).toLowerCase();

        if (flarePartyMember.includes(ign)) {
            const acceptCommand = `party accept ${ign}`;

            registerCommand(() => {
                ChatLib.command(acceptCommand);
            });
        }
    }).setCriteria("-----------------------------------------------------\n${player} has invited you to join their party!\nYou have 60 seconds to accept. Click here to join!\n-----------------------------------------------------")
);
