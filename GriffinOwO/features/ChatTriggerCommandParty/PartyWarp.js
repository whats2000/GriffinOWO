import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";
import { registerCommand } from "../../utils/CommandQueue";
import { registerEventListener } from "../../utils/EventListener";

let lastAttemptWarpTime = 0;
let cancel = false;

registerEventListener(() => Settings.warp,
    register("chat", (player) => {
        if (lastAttemptWarpTime + 1000 * Settings.warpDelay >= Date.now()) {
            registerCommand(() => {
                ChatLib.command(`pc Please wait for ${(lastAttemptWarpTime + 1000 * Settings.warpDelay - Date.now()) / 1000}s!`);
            });
            return;
        }
        player = getIGN(player);

        if (!checkWhitelist(player)) return;

        ChatLib.chat('&2[GriffinOwO] &fTrying to get party list.');
        registerCommand(() => {
            ChatLib.command('party list');
        });

        lastAttemptWarpTime = new Date().getTime();
    }).setCriteria(/^Party > (.+): ![Ww][Aa][Rr][Pp]$/)
);

registerEventListener(() => Settings.warp,
    register("chat", (_player) => {
        if (lastAttemptWarpTime + 1000 * Settings.warpDelay < Date.now() || cancel) return;
        cancel = true;

        registerCommand(() => {
            ChatLib.command(`pc Party warping has been cancel!`);
        });

        setTimeout(() => { cancel = false; }, Settings.warpDelay * 1000)
    }).setCriteria(/^Party > (.+): ![Cc]$/)
);

registerEventListener(() => Settings.warp,
    register("chat", (mode, names, _e) => {
        if (new Date().getTime() - lastAttemptWarpTime > 1000) return;
        if (mode !== "Leader") return;
        const myIGN = getIGN(Player.getName()).toLowerCase();

        let leader = getIGN(names).toLowerCase();
        if (leader !== myIGN) {
            lastAttemptWarpTime = 0;
            return;
        }

        let delay = Settings.warpDelay;

        if (delay > 0) {
            registerCommand(() => {
                ChatLib.command(`pc Party warping in ${delay}s please leave or do "!c" if you don't want to warp!`);
            });
        }

        setTimeout(() => {
            if (!cancel) {
                registerCommand(() => {
                    ChatLib.command("p warp");
                });
            }
        }, 1000 * delay);
    }).setChatCriteria("Party ${mode}: ${names}")
);
