import Settings from "../../config";

register("command", () => {
    Settings.blacklistIGN = "";
    ChatLib.chat(`&2[GriffinOwO] &fReset the blacklist.`);
}).setName("griffin_blacklist_reset");

register("command", (...players) => {
    let blacklistIGN = Settings.blacklistIGN;
    let blacklistArray = [];

    if (blacklistIGN !== "") {
        blacklistArray = blacklistIGN.split(" ");
    }

    players.forEach(player => {
        const playerName = player.trim();

        if (playerName !== "") {
            const lowercasePlayerName = playerName.toLowerCase();

            if (!blacklistArray.some(name => name.toLowerCase() === lowercasePlayerName)) {
                blacklistArray.push(playerName);
                ChatLib.chat(`&2[GriffinOwO] &fAdded &b[${playerName}] &fto the blacklist.`);
            } else {
                ChatLib.chat(`&2[GriffinOwO] &f&b[${playerName}] &fis already in the blacklist.`);
            }
        }
    });

    blacklistArray.sort();

    Settings.blacklistIGN = blacklistArray.join(" ");
}).setName("griffin_blacklist_add");

register("command", (...players) => {
    let blacklistIGN = Settings.blacklistIGN;

    let blacklistArray = blacklistIGN.split(" ");

    players.forEach(player => {
        const playerName = player.toLowerCase();

        const index = blacklistArray.findIndex(name => name.toLowerCase() === playerName);
        if (index !== -1) {
            blacklistArray.splice(index, 1);
            ChatLib.chat(`&2[GriffinOwO] &fRemoved &b[${player}] &ffrom the blacklist.`);
        } else {
            ChatLib.chat(`&2[GriffinOwO] &f&b[${player}] &fis not found in the blacklist.`);
        }
    });

    Settings.blacklistIGN = blacklistArray.join(" ");
}).setName("griffin_blacklist_remove");

register("command", (page) => {
    const blacklistIGN = Settings.blacklistIGN;
    if (blacklistIGN === "") {
        ChatLib.chat(`&2[GriffinOwO] &fBlacklist is empty!`);
        return;
    }

    const blacklistArray = blacklistIGN.split(" ");
    const pageSize = 8;
    const totalPages = Math.ceil(blacklistArray.length / pageSize);
    const currentPage = parseInt(page) || 1;

    if (currentPage > totalPages || currentPage < 1) {
        ChatLib.chat(`&2[GriffinOwO] &fInvalid page number!`);
        return;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const displayedBlacklist = blacklistArray.slice(startIndex, endIndex);

    ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");

    let prevPage = currentPage > 1
        ? new TextComponent("&r&e&l<<")
            .setClick("run_command", `/griffin_blacklist_list ${currentPage - 1}`)
            .setHover("show_text", `Click to go to previous page`)
        : "  ";

    let nextPage = currentPage < totalPages
        ? new TextComponent("&r&e&l>>")
            .setClick("run_command", `/griffin_blacklist_list ${currentPage + 1}`)
            .setHover("show_text", "Click to go to next page")
        : "  ";

    let show_message = new Message(
        `                       `,
        prevPage,
        ` &6[GriffinOwO] &f&aBlacklist (Page ${currentPage}/${totalPages}) `,
        nextPage
    );

    ChatLib.chat(show_message);

    displayedBlacklist.forEach(player => {
        show_message = new Message(
            `                                     &7- `,
            new TextComponent(`&b${player}`)
                .setClick("run_command", `/griffin_blacklist_remove ${player}`)
                .setHover("show_text", `Click to remove &b[${player}] &ffrom the blacklist`),
        );

        ChatLib.chat(show_message);
    });
    ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
}).setName("griffin_blacklist_list");
