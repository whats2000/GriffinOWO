import Settings from "../../config";
import { getIGN, checkWhitelist, getUniqueValue } from "../../utils/Function";


// !rng
register("chat", (player) => {
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