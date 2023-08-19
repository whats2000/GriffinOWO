import Settings from "./config";
import { userData } from "./utils/UserData";

// Kuudra Stage Tracker
import "./utils/KuudraStage";

// Dungeon Stage Tracker
import "./utils/DungeonTracker";

// HUD rendering
import "./utils/RenderHUD";

// Location
import "./utils/Location";

// Event Listener
import "./utils/EventListener";

// Whitelist and Blacklist
import "./features/BlacklistWhitelist/Blacklist";
import "./features/BlacklistWhitelist/Whitelist";

// ChatTriggerCommandDM
import "./features/ChatTriggerCommandDM/PartyMute";
import "./features/ChatTriggerCommandDM/PartyPlayer";

// ChatTriggerCommandParty
import "./features/ChatTriggerCommandParty/AllInvite";
import "./features/ChatTriggerCommandParty/JoinDungeon";
import "./features/ChatTriggerCommandParty/JoinKuudra";
import "./features/ChatTriggerCommandParty/PartyTransfer";
import "./features/ChatTriggerCommandParty/PartyWarp";
import "./features/ChatTriggerCommandParty/Restart";

// Combat
import "./features/Combat/FlareRange";
import "./features/Combat/FlareTimer";
import "./features/Combat/GyroRangeMarker";
import "./features/Combat/GyroTimer";
import "./features/Combat/TerminatorExchangeClick";

// CrimsonIsland
import "./features/CrimsonIsland/BrokenHype";
import "./features/CrimsonIsland/FlareTrade";
import "./features/CrimsonIsland/LavaFishingAlert";
import "./features/CrimsonIsland/VanquisherAlert";

// Diana
import "./features/Diana/InquisitorAlert";

// Dungeon
import "./features/Dungeon/DecoyDeadAlert";
import "./features/Dungeon/DecoyWaypoint";
import "./features/Dungeon/DragonBox";
import "./features/Dungeon/DragonTimer";
import "./features/Dungeon/GyroWaypoint";
import "./features/Dungeon/MiningWaypoint";

// Fun
import "./features/Fun/GetTodayLuck";
import "./features/Fun/SendDeathMessage";

// Kuudra
import "./features/Kuudra/KuudraBuildProgress";
import "./features/Kuudra/KuudraFuelProgress";
import "./features/Kuudra/KuudraHeadPointer";
import "./features/Kuudra/KuudraSupplyPearlHelper";
import "./features/Kuudra/KuudraSupplyWaypoint";
import "./features/Kuudra/KuudraTwoTwoReparty";

// Miscellaneous
import "./features/Miscellaneous/DisplayPetCandy";
import "./features/Miscellaneous/DisplayPetXP";
import "./features/Miscellaneous/HideAbiphone";

// Party
import "./features/Party/KickBlacklistPlayer";
import "./features/Party/RepartyKickPlayer";
import "./features/Party/TransferBackBlacklistPlayer";

// Rift
import "./features/Rift/BloodEffigy";
import "./features/Rift/CadaverMarker";
import "./features/Rift/EnigmaSoulsWaypoint";

// Waypoint
import "./features/Waypoint/Waypoint";
import { initializeEventListeners, updateEventListeners } from "./utils/EventListener";

userData.autosave();

// Show Change Log
register("chat", () => {
    const version = JSON.parse(FileLib.read("GriffinOWO", "metadata.json")).version;
    if (version === userData.version) return;

    userData.version = version;
    userData.save();
    setTimeout(() => {
        ChatLib.chat("&r&r&b&m-----------------------------------------------------");
        ChatLib.chat(`          &6[GriffinOwO] &f&aChange Log (${version})`);
        ChatLib.chat("&b&l                New Feature");
        ChatLib.chat("&a + &eDecoy killed Title (Dungeon)");
        ChatLib.chat("&a + &eDecoy Killed Message (Dungeon)");
        ChatLib.chat("&a + &eDragon Box (Dungeon)");
        ChatLib.chat("");
        ChatLib.chat("&b&l                Bug Fix");
        ChatLib.chat("&c - &eFix Some Spelling in config");
        ChatLib.chat("&c - &eFix lost class information when reconnect in dungeon, now will recheck when switch phase");
        ChatLib.chat("&c - &eFix !join will trigger when you are not leader");
        ChatLib.chat("");
        ChatLib.chat("&b&l                Change");
        ChatLib.chat("&d = &eNo Change Currently");
        ChatLib.chat("&r&r&b&m-----------------------------------------------------");
    }, 1000);
}).setCriteria("Welcome to Hypixel SkyBlock${after}");

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
    ChatLib.chat("&b/pk &f[&bplayer1 player2...&f] - Reparty but not invite some people");
    ChatLib.chat(`&b/enigma &f[&bon &f/ &boff &f/ &bremove &f/ &bclear &f/ &bunclear&f] - Enigma Souls Waypoints (Kinda similar to neusouls)`);
    ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
}

if (userData.firstUse) {
    setTimeout(() => {
        ChatLib.chat("&6[GriffinOwO] &f&aWelcome To Use GriffinOWO, Here Some Tips");
        commandHelp();
    }, 1000);

    userData.firstUse = false;
}

let settingOpen = false;

register("command", (...args) => {
    const subCommand = args[0] == undefined ? undefined : args[0].toLowerCase();
    const subCommand2 = args[1] == undefined ? undefined : args[1].toLowerCase();

    switch (subCommand) {
        case undefined:
        case "settings":
            Settings.openGUI();
            settingOpen = true;
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

register("command", () => {
    Settings.openGUI();
    settingOpen = true;
}).setName("griffin_config");

register("guiKey", (char, key, gui, event) => {
    if (key == 1 && settingOpen) {
        updateEventListeners();
        settingOpen = false;
    }
});

initializeEventListeners();
