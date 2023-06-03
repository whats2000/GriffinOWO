import { getIGN } from "../../utils/Function";

let lastAttemptRePartyTime = 0;
let unWantPlayer = [];
let validMembers = [];

register("command", (...players) => {
    unWantPlayer = [];
    validMembers = [];

    ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
    ChatLib.command('party list');

    setTimeout(() => {
        ChatLib.command('party disband');
    }, 500);

    players.forEach((player) => {
        if (player) unWantPlayer.push(player.toLowerCase());
    });

    lastAttemptRePartyTime = new Date().getTime();
}).setName("pk");

// For get player list from pk command
register("chat", (mode, names, e) => {
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
        return getIGN(playerName);
    }).filter((member) => {
        return !unWantPlayer.includes(member.toLowerCase());
    });


    let i = 2;
    // run /party 
    validMembers.forEach(player => {
        setTimeout(() => {
            ChatLib.command(`party ${player}`);
        }, 500 * (i + 1));
        i++;
    });
}).setChatCriteria("Party ${mode}: ${names}");
