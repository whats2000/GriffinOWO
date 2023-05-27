import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";

register("chat", (player) => {
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