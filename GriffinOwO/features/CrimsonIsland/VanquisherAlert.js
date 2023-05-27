import Settings from "../../config";

register("Chat", (event) => {
    if (!Settings.vanquisher) return;

    formatted_message = ChatLib.getChatMessage(event, true);

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

    setTimeout(() => {
        ChatLib.command(channel +
            ` x: ${Math.floor(Player.getX())}` +
            `, y: ${Math.floor(Player.getY())}` +
            `, z: ${Math.floor(Player.getZ())}`)
    }, 1);

    setTimeout(() => {
        let scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) });

        var location = '';

        for (let line of scoreboard)
            if (line.includes("⏣")) {
                location = line;
                break;
            }

        ChatLib.command(`${channel} [!] Vanquisher is spawned at[${location}][!]`)
    }, 501);
})

register("Chat", (event) => {
    if (!Settings.vanquisherDeadAlert) return;

    formatted_message = ChatLib.getChatMessage(event, true);

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

    setTimeout(() => {
        ChatLib.command(`${channel} Vanquisher is killed!`)
    }, 300);
})