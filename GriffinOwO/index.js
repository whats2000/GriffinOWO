import renderBeaconBeam from "../BeaconBeam";
import Settings from "./config";

let chat_option = true;
let player_abs_x = 0;
let player_abs_y = 0;
let player_abs_z = 0;
let beacon_abs_x = 0;
let beacon_abs_y = 0;
let beacon_abs_z = 0;
let check_x = 0;
let check_y = 0;
let check_z = 0;
let waypoint = [];
let formatted_message = "";
let show_message = "";

register("command", () => {
    Settings.openGUI();
}).setName("griffin_config");

function checkWhitelist(player) {
    const whitelist_mode = Settings.whitelist;
    const blacklist_mode = Settings.blacklist;
    let lower_case_player_ign = player.toString().toLowerCase();

    if (blacklist_mode) {
        let blacklist_ign = Settings.blacklistIGN.split(" ");
        for (let a = 0; a < blacklist_ign.length; a++)
            if (lower_case_player_ign == blacklist_ign[a].toLowerCase()) {
                setTimeout(() => {
                    ChatLib.chat(`&2[GriffinOwO] &f[${player}] is on blacklist!`);
                }, 50);

                return false;
            }
    }

    if (whitelist_mode) {
        let whitelist_ign = Settings.whitelistIGN.split(" ");
        for (let a = 0; a < whitelist_ign.length; a++)
            if (lower_case_player_ign == whitelist_ign[a].toLowerCase())
                return true;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &f[${player}] is not on whitelist!`);
        }, 50);

        return false;
    }

    return true;
}

function getUniqueNumber(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

function getUniqueValue(str) {
    const uniqueNumber = getUniqueNumber(str);
    const today = new Date().toISOString().substr(0, 10);
    const hash = getUniqueNumber(today + uniqueNumber);
    const value = Math.abs(hash % 101);
    return value;
}

function getIGN(player) {
    let player_ign = player;

    // remove any suffixes that are not legal ign symbols starting from the tail
    player_ign = player_ign.replace(/[^0-9A-Za-z_]+$/, "");

    // preserve all legal ign symbols starting from the tail
    let match_list = player_ign.match(/[0-9A-Za-z_]+$/);

    if (match_list !== null) {
        player_ign = match_list[0];
    } else {
        player_ign = "";

        setTimeout(() => {
            ChatLib.chat(`error at IGN, input = "${player}"`);
        }, 50);
    }

    return player_ign;
}

register("command", () => {
    if (chat_option == true) {
        chat_option = false;
        ChatLib.chat("&2[GriffinOwO] &fis now &4disabled!");
    } else if (chat_option == false) {
        chat_option = true;
        ChatLib.chat("&2[GriffinOwO] &fis now &aenabled!");
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &fFor setting you can use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
    }
}).setName("griffin").setAliases("griffinOwO");

register("command", () => {
    if (chat_option == true) {
        waypoint = [];
        ChatLib.chat("&2[GriffinOwO] &fYou remove the coordinate!!");
    }
}).setName("griffin_reset");

register("command", (x, y, z) => {
    if (chat_option == true) {
        waypoint = [x, y, z].map(a => parseInt(a));
        ChatLib.chat(`&2[GriffinOwO] &fYou set the coordinate to ${x} ${y} ${z}!!`);
    }
}).setName("griffin_set_coord");

register("Chat", (event) => {
    if (!chat_option) return;

    if (!Settings.inquis) return;

    formatted_message = ChatLib.getChatMessage(event, true);

    if (!formatted_message.includes("&r&eYou dug out &r&2a Minos Champion&r&e!&r")) return;

    setTimeout(() => {
        waypoint[0] = Player.getX();
        waypoint[1] = Player.getY();
        waypoint[2] = Player.getZ();

        show_message = new Message(
            "&2[GriffinOwO] &fClick to show coord to party member. ",
            new TextComponent("&a[Show coord]").setClick("run_command", `/pc` +
                `x: ${Math.floor(Player.getX())}` +
                `, y: ${Math.floor(Player.getY())}` +
                `, z: ${Math.floor(Player.getZ())}[!] Inquis is dug out Warning[!]`),
        );

        ChatLib.chat(show_message);
    }, 300);
})

register("Chat", (event) => {
    if (!chat_option) return;

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
    }, 1001);
})

register("Chat", (event) => {
    if (!chat_option) return;

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

// These function below is refer to slayerhelper to draw out the beacon light which written by Eragon
register("chat", (player, x, y, z, event) => {
    if (!chat_option) return;

    if (!Settings.recieveWaypoint) return;

    waypoint = [x, y, z].map(a => parseInt(a));
    ChatLib.chat(`&2[GriffinOwO] &fYou received the coordinate[x: ${x}, y: ${y}, z: ${z}]from chat and add waypoint!!`);
}).setCriteria(/^Party\s*>\s*\[.+?\]\s*(.+):\s*(?:.+?\s+)?(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+.*)?$/)

register("chat", (player, x, y, z, event) => {
    if (!chat_option) return;

    waypoint = [x, y, z].map(a => parseInt(a));
    ChatLib.chat("&2[GriffinOwO] &fYou received the coordinate from chat and add waypoint!!");
}).setCriteria(/^From (.+): ([\d-]+) ([\d-]+) ([\d-]+)/)

// Support for patcher coord
register("chat", (player, x, y, z) => {
    if (!chat_option) return;

    if (!Settings.recieveWaypoint) return;

    // Remove anything after z coords
    const spaceIndex = z.indexOf(' ')
    if (spaceIndex != -1) {
        z = z.substring(0, spaceIndex);
    }

    waypoint = [x, y, z].map(a => parseInt(a));
}).setCriteria("${player}: x: ${x}, y: ${y}, z: ${z}");

register("renderWorld", () => {
    if (!chat_option) return;

    if (!Settings.recieveWaypoint) return;

    if (!waypoint) return

    player_abs_x = Math.abs(Math.round(Player.getX()));
    player_abs_y = Math.abs(Math.round(Player.getY()));
    player_abs_z = Math.abs(Math.round(Player.getZ()));
    beacon_abs_x = Math.abs(waypoint[0]);
    beacon_abs_y = Math.abs(waypoint[1]);
    beacon_abs_z = Math.abs(waypoint[2]);
    check_x = Math.abs(player_abs_x - beacon_abs_x);
    check_y = Math.abs(player_abs_y - beacon_abs_y);
    check_z = Math.abs(player_abs_z - beacon_abs_z);
    if (check_x < 5 && check_y < 5 && check_z < 5) {
        waypoint = [];
        ChatLib.chat("&2[GriffinOwO] &fYou arrive to the coordinate!!");
    }
    console.log(check_x, check_y, check_z);

    let [x, y, z] = waypoint
    renderBeaconBeam(x, y, z, 255, 255, 0, 1, false);
})

// !warp
register("chat", (player) => {
    if (!chat_option) return;

    if (!Settings.warp) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!warp] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;


    let delay = Settings.warpDelay;

    if (delay > 0)
        setTimeout(() => {
            ChatLib.command(`pc Party warping in ${delay}s please leave if you don't want to warp!`)
        }, 300);

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to warp party. [${player}]`);
        ChatLib.command("p warp")
    }, 300 + 1000 * delay);

}).setCriteria(/^Party > (.+): ![Ww][Aa][Rr][Pp]$/);

// !join
register("chat", (player, type, floor) => {
    if (!chat_option) return;

    if (!Settings.join) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!join] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;

    if (type.toLowerCase() === "f")
        type = "catacombs";
    else if (floor === "0")  // No m0 here
        return;
    else
        type = "master_catacombs";


    setTimeout(() => {
        if (floor === '0')
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type} entrance. [${player}]`);
        else
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type} floor ${floor}. [${player}]`);
    }, 50);

    setTimeout(() => {
        ChatLib.command(`joindungeon ${type} ${floor}`);
    }, 300);

}).setCriteria(/^Party > (.+): ![Jj][Oo][Ii][Nn] ([FMfm])([0-7])$/);

// !allinv
register("chat", (player) => {
    if (!chat_option) return;

    if (!Settings.allinv) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!allinv] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to set party all invite on. [${player}]`);
        ChatLib.command("p setting allinvite")
    }, 300);

}).setCriteria(/^Party > (.+): ![Aa][Ll]{2}[Ii][Nn][Vv]([Ii][Tt][Ee])?$/);

// !ptme
register("chat", (player) => {
    if (!chat_option) return;

    if (!Settings.ptme) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!ptme] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to transfer party. [${player}]`);
        ChatLib.command(`p transfer ${player}`)
    }, 300);

}).setCriteria(/^Party > (.+): ![Pp][Tt][Mm][Ee]$/);

// !mute
register("chat", (player) => {
    if (!chat_option) return;

    if (!Settings.mute) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!mute] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to mute party. [${player}]`);
        ChatLib.command(`p mute`)
    }, 300);

}).setCriteria(/^From (.+): ![Mm][Uu][Tt][Ee](.*)?$/);

// !party player
register("chat", (player) => {
    if (!chat_option) return;

    if (!Settings.party) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!party] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to party. [${player}]`);
        ChatLib.command(`p ${player}`)
    }, 300);

}).setCriteria(/^From (.+): ![Pp][Aa][Rr][Tt][Yy](.*)?$/);

// !rp
register("chat", (player) => {
    if (!chat_option) return;

    if (!Settings.rp) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!rp] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to reparty. [${player}]`);
        ChatLib.command(`rp`, true)
    }, 300);

}).setCriteria(/^Party > (.+): ![Rr][PpSs]$/);

// !rng
register("chat", (player) => {
    if (!chat_option) return;

    if (!Settings.rng) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!rng] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;

    let unitque_num = getUniqueValue(player);

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fRunning rng generator. [${player}]`);
        if (unitque_num <= 50) {
            ChatLib.command(`pc ${player} you are ${unitque_num} % chance to get rng!`)
        }
        else {
            ChatLib.command(`pc ${player} you are ${unitque_num} % chance not to get rng!`)
        }
    }, 300);

}).setCriteria(/^Party > (.+): ![Rr][Nn][Gg]$/);

// /pk player1 player2... 
let lastAttemptRePartyTime = 0;
let unWantPlayer = [];
let validMembers = [];

register("command", (...players) => {
    if (!chat_option) return;

    unWantPlayer = [];
    validMembers = [];

    ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
    ChatLib.command('party list');

    setTimeout(() => {
        ChatLib.command('party disband');
    }, 300);

    players.forEach((player) => {
        if (player) unWantPlayer.push(player);
    });

    lastAttemptRePartyTime = new Date().getTime();
}).setName("pk");

// For get player list from pk command
register("chat", (mode, names, e) => {
    if (!chat_option) return;

    if (new Date().getTime() - lastAttemptRePartyTime > 1000) {
        return;
    }

    if (mode !== "Moderators" && mode !== "Members") {
        return;
    }

    let membsArr = names.split(" ● ");
    membsArr.pop();

    // Consider player is in unWantPlayer
    validMembers = membsArr.map((playerName) => {
        return playerName.replace(/(\[[a-zA-Z0-9\+]+\])+? /g, "").replace(/(&[0123456789ABCDEFLMNOabcdeflmnor])|\[|\]| |\+/g, "");
    }).filter((member) => {
        return !unWantPlayer.includes(member);
    });


    // run /party 
    for (var i = 0; i < validMembers.length; i++) {
        setTimeout(() => {
            ChatLib.command(`party ${validMembers[i]}`);
        }, 500 * (i + 1));
    }

}).setChatCriteria("Party ${mode}: ${names}");


