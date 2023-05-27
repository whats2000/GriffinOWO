import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";

register("chat", (player) => {
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
