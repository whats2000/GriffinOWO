import Settings from "../../config";
import { getIGN } from "../../utils/Function";
import { registerCommand } from "../../utils/CommandQueue";

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

register("Chat", (event) => {
    if (Settings.flarePartyList === '' || flareWaitForJoin) return;

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

register("chat", (player) => {
    if (!flareWaitForJoin || Settings.flarePartyList === '') return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &f${player} has joined the party.`);

        if (flareInvitePlayersCount > 0)
            ChatLib.chat(`&2[GriffinOwO] &fWaiting for ${flareInvitePlayersCount} players to join`);
    }, 30);

    checkIsAllWarp();
}).setCriteria("${player} joined the party.");

register("chat", () => {
    if (Settings.flarePartyList === '') return;
    checkIsAllWarp();
}).setCriteria("Couldn't find a player with that name!");

register("chat", () => {
    if (Settings.flarePartyList === '') return;
    checkIsAllWarp();
}).setCriteria("You cannot invite that player since they're not online.");

register("chat", () => {
    if (Settings.flarePartyList === '') return;
    checkIsAllWarp();
}).setCriteria("The party invite to ${player} has expired");

register("chat", () => {
    if (Settings.flarePartyList === '') return;
    flareWaitForJoin = false;
    flareInvitePlayersCount = 0;
}).setCriteria("RARE DROP! Nether Star");

register("command", () => {
    if (Settings.flarePartyList === '') return;
    flareWaitForJoin = false;
    flareInvitePlayersCount = 0;
    checkIsAllWarp();
}).setName("fw");

register("chat", (player) => {
    if (!Settings.flareTradeAutoJoin) return;

    const flarePartyMember = Settings.flarePartyList.split(" ")
        .map(player => player.toLowerCase());

    const ign = getIGN(player).toLowerCase();

    if (flarePartyMember.includes(ign)) {
        const acceptCommand = `party accept ${ign}`;

        registerCommand(() => {
            ChatLib.command(acceptCommand);
        });
    }
}).setCriteria("-----------------------------------------------------\n${player} has invited you to join their party!\nYou have 60 seconds to accept. Click here to join!\n-----------------------------------------------------");