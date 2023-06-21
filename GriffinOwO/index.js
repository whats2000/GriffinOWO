import Settings from "./config";
import { userData } from "./utils/UserData";

// Kuudra Stage Tracker
import "./utils/KuudraStage";

// HUD rendering
import "./utils/RenderHUD";

// Whitelist and Blacklist
import "./features/BlacklistWhitelist/Blacklist";
import "./features/BlacklistWhitelist/Whitelist";

// ChatTriggerCommandDM
import "./features/ChatTriggerCommandDM/PartyMute";
import "./features/ChatTriggerCommandDM/PartyPlayer";

// ChatTriggerCommandParty
import "./features/ChatTriggerCommandParty/AllInvite";
import "./features/ChatTriggerCommandParty/JoinDungeon";
import "./features/ChatTriggerCommandParty/PartyTransfer";
import "./features/ChatTriggerCommandParty/PartyWarp";
import "./features/ChatTriggerCommandParty/Restart";

// Combat
import "./features/Combat/GyroTimer";

// CrimsonIsland
import "./features/CrimsonIsland/BrokenHype";
import "./features/CrimsonIsland/FlareTrade";
import "./features/CrimsonIsland/VanquisherAlert";

// Fun
import "./features/Fun/GetTodayLuck";

// Kuudra
import "./features/Kuudra/KuudraBuildProgress";
import "./features/Kuudra/KuudraFuelProgress";
import "./features/Kuudra/KuudraSupplyPearlHelper";
import "./features/Kuudra/KuudraSupplyWaypoint";
import "./features/Kuudra/KuudraTwoTwoReparty";

// Party
import "./features/Party/KickBlacklistPlayer";
import "./features/Party/RepartyKickPlayer";
import "./features/Party/TransferBackBlacklistPlayer";

// Waypoint
import "./features/Waypoint/Waypoint";

userData.autosave();

function commandHelp() {
    ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
    ChatLib.chat("                          &6[GriffinOwO] &f&aHelp list (Page 1/1)");
    ChatLib.chat("The command &b/gf &fcan be replace by [&bgriffin&f|&bgriffinOwO&f]");
    ChatLib.chat("&b/gf settings &f- Open the settings GUI (&b/gf &fwork too)");
    ChatLib.chat("&b/gf blacklist &f[&badd&f|&bremove&f|&blist&f|&breset&f] [&bplayer1 player2...&f] &f- Manage the blacklist");
    ChatLib.chat("&b/gf whitelist &f[&badd&f|&bremove&f|&blist&f|&breset&f] [&bplayer1 player2...&f] &f- Manage the whitelist");
    ChatLib.chat("&b/gf waypoint &f[&badd x y z&f|&bremove name&f|&breset&f] - Manage waypoints (coordinates)");
    ChatLib.chat("&b/kw &f- Manually warp 2/2 kuudra party");
    ChatLib.chat("&b/fw &f- Ignore waiting for all other players and warp the party when flare trade");
    ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
}

if (userData.firstUse) {
    setTimeout(() => {
        ChatLib.chat("&6[GriffinOwO] &f&aWelcome To Use GriffinOWO, Here Some Tips");
        commandHelp();
    }, 1000);

    userData.firstUse = false;
}

register("command", (...args) => {
    const subCommand = args[0] == undefined ? undefined : args[0].toLowerCase();
    const subCommand2 = args[1] == undefined ? undefined : args[1].toLowerCase();

    switch (subCommand) {
        case undefined:
        case "settings":
            Settings.openGUI();
            break;
        case "blacklist":
        case "blist":
            args.shift(); // Remove the "blacklist" subcommand
            switch (subCommand2) {
                case "add":
                    args.shift();
                    args.unshift("griffin_blacklist_add");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "remove":
                    args.shift();
                    args.unshift("griffin_blacklist_remove");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "list":
                case undefined:
                    args.shift();
                    args.unshift("griffin_blacklist_list");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "reset":
                    ChatLib.command("griffin_blacklist_reset", true);
                    break;
                default:
                    ChatLib.chat(`&2[GriffinOwO] &fUnknown subcommand in ${subCommand}. Try`);
                    ChatLib.chat(`&b/gf ${subCommand} &f[&badd &f/ &bremove &f/ &blist &f/ &breset &f] &bplayer1 player2...`);
                    break;
            }
            break;
        case "whitelist":
        case "wlist":
            args.shift(); // Remove the "whitelist" subcommand
            switch (subCommand2) {
                case "add":
                    args.shift();
                    args.unshift("griffin_whitelist_add");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "remove":
                    args.shift();
                    args.unshift("griffin_whitelist_remove");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "list":
                case undefined:
                    args.shift();
                    args.unshift("griffin_whitelist_list");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "reset":
                    ChatLib.command("griffin_whitelist_reset", true);
                    break;
                default:
                    ChatLib.chat(`&2[GriffinOwO] &fUnknown subcommand in ${subCommand}. Try`);
                    ChatLib.chat(`&b/gf ${subCommand} &f[&badd &f/ &bremove &f/ &blist &f/ &breset&f] &bplayer1 player2...`);
                    break;
            }
            break;
        case "waypoint":
        case "wp":
        case "coordinate":
        case "coord":
            args.shift(); // Remove the "waypoint" subcommand
            switch (subCommand2) {
                case "add":
                case "set":
                    args.shift();
                    args.unshift("griffin_set_coord");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "remove":
                    args.shift();
                    args.unshift("griffin_remove");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "reset":
                    ChatLib.command("griffin_reset", true);
                    break;
                default:
                    ChatLib.chat(`&2[GriffinOwO] &fUnknown subcommand in ${subCommand}. Try`);
                    ChatLib.chat(`&b/gf ${subCommand} &f[&badd(&bset) &bx y z &f/ &bremove name &f/ &breset&f]`);
                    break;
            }
            break;
        case "help":
        case "?":
            commandHelp();
            break;
        default:
            ChatLib.chat("&2[GriffinOwO] &fUnknown subcommand. Please check your command.");
            commandHelp();
            break;
    }
}).setName("griffin").setAliases("griffinOwO").setAliases("gf");
