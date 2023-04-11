import renderBeaconBeam from "../BeaconBeam"

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
var whitelist_mode = false;

let whitelist_ign = [];

function checkWhitelist(player) {
    let check = false;
    let lower_case_player_ign = player.toString().toLowerCase();

    if (whitelist_mode === true) {
        for (let a = 0; a < whitelist_ign.length; a++) {
            if (lower_case_player_ign == whitelist_ign[a].toLowerCase()) {
                check = true;
                break;
            }
        }

        if (check === false) {
            setTimeout(() => {
                ChatLib.chat(`&2[GriffinOwO] &f[${player}] not on whitelist !`);
            }, 50);
        }
    } else check = true;

    return check;
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
    if (chat_option === true) {
        formatted_message = ChatLib.getChatMessage(event, true);
        if (formatted_message.includes("&r&eYou dug out &r&2a Minos Champion&r&e!&r")) {
            setTimeout(() => {
                waypoint[0] = Player.getX();
                waypoint[1] = Player.getY();
                waypoint[2] = Player.getZ();

                show_message = new Message(
                    "&2[GriffinOwO] &fClick to show coord to party member. ",
                    new TextComponent("&a[Show coord]").setClick("run_command", `/pc ` +
                        `x: ${Math.floor(Player.getX())}` +
                        `, y: ${Math.floor(Player.getY())}` +
                        `, z: ${Math.floor(Player.getZ())} [!] Inquis is dug out Warning [!]`),
                );

                ChatLib.chat(show_message);
            }, 300);
        }
    }
})


// These function below is refer to slayerhelper to draw out the beacon light which written by Eragon
register("chat", (player, x, y, z, event) => {
    if (!chat_option) return;

    waypoint = [x, y, z].map(a => parseInt(a));
    ChatLib.chat(`&2[GriffinOwO] &fYou received the coordinate [x: ${x}, y: ${y}, z: ${z}] from chat and add waypoint!!`);
}).setCriteria(/^Party\s*>\s*\[.+?\]\s*(.+):\s*(?:.+?\s+)?(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+.*)?$/)

register("chat", (player, x, y, z, event) => {
    if (!chat_option) return;

    waypoint = [x, y, z].map(a => parseInt(a));
    ChatLib.chat("&2[GriffinOwO] &fYou received the coordinate from chat and add waypoint!!");
}).setCriteria(/^From (.+): ([\d-]+) ([\d-]+) ([\d-]+)/)

// Support for patcher coord
register("chat", (player, x, y, z) => {
    if (!chat_option) return;

    // Remove anything after z coords
    const spaceIndex = z.indexOf(' ')
    if (spaceIndex != -1) {
        z = z.substring(0, spaceIndex);
    }

    waypoint = [x, y, z].map(a => parseInt(a));
}).setCriteria("${player}: x: ${x}, y: ${y}, z: ${z}");

register("renderWorld", () => {
    if (!chat_option) return;

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

    player = getIGN(player);

    if (checkWhitelist(player) === false) return;

    setTimeout(() => {
        ChatLib.command("pc Party warping in 5s please leave if you don't want to warp!")
    }, 300);

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to warp party. [${player}]`);
        ChatLib.command("p warp")
    }, 5300);

}).setCriteria(/^Party > (.+): ![Ww][Aa][Rr][Pp]$/);

// !join
register("chat", (player, type, floor) => {
    if (!chat_option) return;

    player = getIGN(player);

    if (checkWhitelist(player) === false) return;

    if (type.toLowerCase() === "f") {
        type = "catacombs";
    } else if (floor === "0") { // No m0 here
        return;
    } else {
        type = "master_catacombs";
    }

    setTimeout(() => {
        if (floor === '0') {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type} entrance. [${player}]`);
        } else {
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type} floor ${floor}. [${player}]`);
        }
    }, 50);
    setTimeout(() => {
        ChatLib.command(`joindungeon ${type} ${floor}`);
    }, 300);

}).setCriteria(/^Party > (.+): ![Jj][Oo][Ii][Nn] ([FMfm])([0-7])$/);

// !allinv
register("chat", (player) => {
    if (!chat_option) return;

    player = getIGN(player);

    if (checkWhitelist(player) === false) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to set party all invite on. [${player}]`);
        ChatLib.command("p setting allinvite")
    }, 300);

}).setCriteria(/^Party > (.+): ![Aa][Ll]{2}[Ii][Nn][Vv]([Ii][Tt][Ee])?$/);

// !ptme
register("chat", (player) => {
    if (!chat_option) return;

    player = getIGN(player);

    if (checkWhitelist(player) === false) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to transfer party. [${player}]`);
        ChatLib.command(`p transfer ${player}`)
    }, 300);

}).setCriteria(/^Party > (.+): ![Pp][Tt][Mm][Ee]$/);

// !mute
register("chat", (player) => {
    if (!chat_option) return;

    player = getIGN(player);

    if (checkWhitelist(player) === false) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to mute party. [${player}]`);
        ChatLib.command(`p mute`)
    }, 300);

}).setCriteria(/^From (.+): ![Mm][Uu][Tt][Ee](.*)?$/);

// !party player
register("chat", (player) => {
    if (!chat_option) return;

    player = getIGN(player);

    if (checkWhitelist(player) === false) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to party. [${player}]`);
        ChatLib.command(`p ${player}`)
    }, 300);

}).setCriteria(/^From (.+): ![Pp][Aa][Rr][Tt][Yy](.*)?$/);

// !rp
register("chat", (player) => {
    if (!chat_option) return;

    player = getIGN(player);

    if (checkWhitelist(player) === false) return;

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to reparty. [${player}]`);
        ChatLib.command(`rp`, true)
    }, 300);

}).setCriteria(/^Party > (.+): ![Rr][PpSs]$/);

// !rng
register("chat", (player) => {
    if (!chat_option) return;

    player = getIGN(player);

    if (checkWhitelist(player) === false) return;

    let unitque_num = getUniqueValue(player);

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fRunning rng generator. [${player}]`);
        if (unitque_num <= 50) {
            ChatLib.command(`pc ${player} you are ${unitque_num}% chance to get rng!`)
        }
        else {
            ChatLib.command(`pc ${player} you are ${unitque_num}% chance not to get rng!`)
        }
    }, 300);

}).setCriteria(/^Party > (.+): ![Rr][Nn][Gg]$/);
