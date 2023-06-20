import Settings from "../../config";

register("command", () => {
    Settings.whitelistIGN = "";
    ChatLib.chat(`&2[GriffinOwO] &fReset the whitelist.`);
}).setName("griffin_whitelist_reset");

register("command", (...players) => {
    let whitelistIGN = Settings.whitelistIGN;
    let whitelistArray = [];

    if (whitelistIGN !== "") {
        whitelistArray = whitelistIGN.split(" ");
    }

    players.forEach(player => {
        const playerName = player.trim();

        if (playerName !== "") {
            const lowercasePlayerName = playerName.toLowerCase();

            if (!whitelistArray.some(name => name.toLowerCase() === lowercasePlayerName)) {
                whitelistArray.push(playerName);
                ChatLib.chat(`&2[GriffinOwO] &fAdded &b[${playerName}] &fto the whitelist.`);
            } else {
                ChatLib.chat(`&2[GriffinOwO] &f&b[${playerName}] &fis already in the whitelist.`);
            }
        }
    });

    whitelistArray.sort();

    Settings.whitelistIGN = whitelistArray.join(" ");
}).setName("griffin_whitelist_add");

register("command", (...players) => {
    let whitelistIGN = Settings.whitelistIGN;

    let whitelistArray = whitelistIGN.split(" ");

    players.forEach(player => {
        const playerName = player.toLowerCase();

        const index = whitelistArray.findIndex(name => name.toLowerCase() === playerName);
        if (index !== -1) {
            whitelistArray.splice(index, 1);
            ChatLib.chat(`&2[GriffinOwO] &fRemoved &b[${player}] &ffrom the whitelist.`);
        } else {
            ChatLib.chat(`&2[GriffinOwO] &f&b[${player}] &fis not found in the whitelist.`);
        }
    });

    Settings.whitelistIGN = whitelistArray.join(" ");
}).setName("griffin_whitelist_remove");

register("command", (page) => {
    const whitelistIGN = Settings.whitelistIGN;
    if (whitelistIGN === "") {
        ChatLib.chat(`&2[GriffinOwO] &fWhitelist is empty!`);
        return;
    }

    const whitelistArray = whitelistIGN.split(" ");
    const pageSize = 8;
    const totalPages = Math.ceil(whitelistArray.length / pageSize);
    const currentPage = parseInt(page) || 1;

    if (currentPage > totalPages || currentPage < 1) {
        ChatLib.chat(`&2[GriffinOwO] &fInvalid page number!`);
        return;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const displayedWhitelist = whitelistArray.slice(startIndex, endIndex);

    ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");

    let prevPage = currentPage > 1
        ? new TextComponent("&r&e&l<<")
            .setClick("run_command", `/griffin_whitelist_list ${currentPage - 1}`)
            .setHover("show_text", `Click to go to previous page`)
        : "  ";

    let nextPage = currentPage < totalPages
        ? new TextComponent("&r&e&l>>")
            .setClick("run_command", `/griffin_whitelist_list ${currentPage + 1}`)
            .setHover("show_text", "Click to go to next page")
        : "  ";

    let show_message = new Message(
        `                       `,
        prevPage,
        ` &6[GriffinOwO] &f&aWhitelist (Page ${currentPage}/${totalPages}) `,
        nextPage
    );

    ChatLib.chat(show_message);

    displayedWhitelist.forEach(player => {
        show_message = new Message(
            `                                     &7- `,
            new TextComponent(`&b${player}`)
                .setClick("run_command", `/griffin_whitelist_remove ${player}`)
                .setHover("show_text", `Click to remove &b[${player}] &ffrom the whitelist`),
        );

        ChatLib.chat(show_message);
    });
    ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
}).setName("griffin_whitelist_list");
