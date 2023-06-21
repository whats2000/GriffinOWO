import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";

register("chat", (player) => {
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