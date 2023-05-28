import Settings from "../../config";
import { getIGN } from "../../utils/Function";

let lastAttemptKuudraRePartyTime = 0;
let waitForJoin = false;
let kickTarget = [];
let inviteTarget = [];
let leader = "";
let cd = false;

register("chat", () => {
    if (Settings.kuudraRepartyList === '' || cd) return;

    inviteTarget = [];
    kickTarget = [];
    waitForJoin = false;

    ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
    ChatLib.command('party list');

    lastAttemptKuudraRePartyTime = new Date().getTime();
}).setCriteria("[NPC] Elle: Talk with me to begin!");

register("command", () => {
    if (Settings.kuudraRepartyList === '' || cd) return;

    inviteTarget = [];
    kickTarget = [];
    waitForJoin = false;

    ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
    ChatLib.command('party list');

    lastAttemptKuudraRePartyTime = new Date().getTime();
}).setName("kw")

register("chat", (mode, names, e) => {
    if (new Date().getTime() - lastAttemptKuudraRePartyTime > 1000 || cd) {
        return;
    }
    const myIGN = getIGN(Player.getName()).toLowerCase();

    if (mode !== "Moderators" && mode !== "Members") {
        leader = getIGN(names).toLowerCase();
        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &f[${leader}] is leader.`);
        }, 30);
        if (leader !== myIGN) {
            cd = true;
            setTimeout(() => {
                cd = false;
            }, 6000);
        }

        return;
    }

    let membsArr = names.split(" ● ");
    membsArr.pop();

    kickTarget = membsArr.map((playerName) => {
        const ign = getIGN(playerName);
        if (ign.toLowerCase() === myIGN) {
            return;
        }
        return ign;
    }).filter(Boolean);

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &f[${kickTarget}] mark as kick target.`);
    }, 30);

    waitForJoin = true;

    inviteTarget = Settings.kuudraRepartyList.split(" ")
        .map(player => player.toLowerCase());

    let i = 1;
    // run /party 
    inviteTarget.forEach(player => {
        setTimeout(() => {
            ChatLib.command(`party ${player}`);
        }, 500 * (i + 1));
        i++;
    });

    setTimeout(() => {
        waitForJoin = false;
    }, 30000 + 500 * (i + 1));
}).setChatCriteria("Party ${mode}: ${names}");

register("chat", (player) => {
    if (!waitForJoin || Settings.kuudraRepartyList === '') return;

    const playerIGN = getIGN(player).toLowerCase();
    const index = inviteTarget.indexOf(playerIGN);

    if (index !== -1) {
        inviteTarget.splice(index, 1);

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &f${player} has joined the party.`);

            if (inviteTarget.length > 0)
                ChatLib.chat(`&2[GriffinOwO] &fWaiting for ${inviteTarget} to join`);
        }, 30);
    }

    if (inviteTarget.length === 0) {
        ChatLib.chat("&2[GriffinOwO] &fAll players have joined the party.");

        setTimeout(() => {
            ChatLib.command("party warp");
        }, 500);
        setTimeout(() => {
            ChatLib.command(`party kick ${kickTarget[0]}`);
        }, 1000);
        setTimeout(() => {
            ChatLib.command(`party transfer ${Settings.kuudraRepartyList.split(" ")[0]}`);
        }, 1500);
        setTimeout(() => {
            ChatLib.command("party leave");
        }, 2000);

        waitForJoin = false;
    }
}).setCriteria("${player} joined the party.");

register("chat", () => {
    if (Settings.kuudraRepartyList === '') return;

    leader = getIGN(player).toLowerCase();
    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &f[${leader}] is leader.`);
    }, 30);

    cd = true;
    setTimeout(() => {
        cd = false;
    }, 6000);
}).setCriteria("Party Leader, ${player}, summoned you to their server.");
