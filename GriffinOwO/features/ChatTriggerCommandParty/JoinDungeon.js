import Settings from "../../config";
import { getIGN, checkWhitelist } from "../../utils/Function";

register("chat", (player, type, floor) => {
    if (!Settings.join) {
        const hoverText = "Click me to run command";
        const show_message = new Message(
            "&2[GriffinOwO] &f[!join] is not enable, you can toggle it use ",
            new TextComponent("&a[/griffin_config]")
                .setClick("run_command", `/griffin_config`)
                .setHover("show_text", hoverText),
        );

        ChatLib.chat(show_message);
        return;
    }

    player = getIGN(player);

    if (!checkWhitelist(player)) return;

    if (type.toLowerCase() === "f")
        type = "catacombs";
    else if (floor === "0")  // No m0 here
        return;
    else
        type = "master_catacombs";


    setTimeout(() => {
        if (floor === '0')
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type} entrance. [${player}]`);
        else
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon ${type} floor ${floor}. [${player}]`);
    }, 50);

    setTimeout(() => {
        ChatLib.command(`joindungeon ${type} ${floor}`);
    }, 300);

}).setCriteria(/^Party > (.+): ![Jj][Oo][Ii][Nn] ([FMfm])([0-7])$/);
