import Settings from "../../config";
import { getIGN } from "../../utils/Function";
import { registerCommand } from "../../utils/CommandQueue";
import { registerEventListener } from "../../utils/EventListener";

let lastAttemptKuudraRePartyTime = 0;
let waitForJoin = false;
let kickTarget = [];
let inviteTarget = [];
let leader = "";
let cd = false;

registerEventListener(() => Settings.kuudraRepartyList !== "",
    register("chat", () => {
        if (cd) return;

        inviteTarget = [];
        kickTarget = [];
        waitForJoin = false;

        ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
        registerCommand(() => {
            ChatLib.command('party list');
        });

        lastAttemptKuudraRePartyTime = new Date().getTime();
    }).setCriteria("[NPC] Elle: Talk with me to begin!")
);

registerEventListener(() => Settings.kuudraRepartyList !== "",
    register("command", () => {
        if (cd) return;

        inviteTarget = [];
        kickTarget = [];
        waitForJoin = false;

        ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
        registerCommand(() => {
            ChatLib.command('party list');
        });

        lastAttemptKuudraRePartyTime = new Date().getTime();
    }).setName("kw")
);

registerEventListener(() => Settings.kuudraRepartyList !== "",
    register("chat", (mode, names, _e) => {
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
            registerCommand(() => {
                ChatLib.command(`party ${player}`);
            });
            i++;
        });

        setTimeout(() => {
            waitForJoin = false;
        }, 30000 + 500 * (i + 1));
    }).setChatCriteria("Party ${mode}: ${names}")
);

registerEventListener(() => Settings.kuudraRepartyList !== "",
    register("chat", (player) => {
        if (!waitForJoin) return;

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
            setTimeout(() => {
                ChatLib.chat("&2[GriffinOwO] &fAll players have joined the party.");
            }, 30);

            registerCommand(() => {
                ChatLib.command("party warp");
            });
            registerCommand(() => {
                ChatLib.command(`party kick ${kickTarget[0]}`);
            });
            registerCommand(() => {
                ChatLib.command(`party transfer ${Settings.kuudraRepartyList.split(" ")[0]}`);
            });
            registerCommand(() => {
                ChatLib.command("party leave");
            });

            waitForJoin = false;
        }
    }).setCriteria("${player} joined the party.")
);

registerEventListener(() => Settings.kuudraRepartyList !== "",
    register("chat", (player) => {
        leader = getIGN(player).toLowerCase();
        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &f[${leader}] is leader.`);
        }, 30);

        cd = true;
        setTimeout(() => {
            cd = false;
        }, 10000);
    }).setCriteria("Party Leader, ${player}, summoned you to their server.")
);

registerEventListener(() => Settings.kuudraRepartyList !== "" && Settings.kuudraAutoJoin,
    register("chat", (player) => {
        const kuudraPartyMember = Settings.kuudraRepartyList.split(" ")
            .map(player => player.toLowerCase());

        const ign = getIGN(player).toLowerCase();

        if (kuudraPartyMember.includes(ign)) {
            const acceptCommand = `party accept ${ign}`;

            registerCommand(() => {
                ChatLib.command(acceptCommand);
            });
        }
    }).setCriteria("-----------------------------------------------------\n${player} has invited you to join their party!\nYou have 60 seconds to accept. Click here to join!\n-----------------------------------------------------")
);
