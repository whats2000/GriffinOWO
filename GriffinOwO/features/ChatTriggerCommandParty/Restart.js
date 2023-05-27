import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";

register("chat", (player) => {
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