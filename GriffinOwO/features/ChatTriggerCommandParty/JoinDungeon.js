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

// Support other mod format
register("chat", (player, floor) => {
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

    setTimeout(() => {
        ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon master_catacombs floor ${floor}. [${player}]`);
    }, 50);

    setTimeout(() => {
        ChatLib.command(`joindungeon master_catacombs ${floor}`);
    }, 300);
}).setCriteria(/^Party > (.+): ![Mm] ([1-7])$/);

register("chat", (player, floor) => {
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

    setTimeout(() => {
        if (floor === '0')
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon catacombs entrance. [${player}]`);
        else
            ChatLib.chat(`&2[GriffinOwO] &fTrying to join dungeon catacombs floor ${floor}. [${player}]`);
    }, 50);

    setTimeout(() => {
        ChatLib.command(`joindungeon catacombs ${floor}`);
    }, 300);
}).setCriteria(/^Party > (.+): ![Ff] ([0-7])$/);
