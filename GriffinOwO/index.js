import Settings from "./config";

// ChatTriggerCommandDM
import "./features/ChatTriggerCommandDM/PartyMute";
import "./features/ChatTriggerCommandDM/PartyPlayer";

// ChatTriggerCommandParty
import "./features/ChatTriggerCommandParty/AllInvite";
import "./features/ChatTriggerCommandParty/JoinDungeon";
import "./features/ChatTriggerCommandParty/PartyTransfer";
import "./features/ChatTriggerCommandParty/PartyWarp";
import "./features/ChatTriggerCommandParty/Restart";

// CrimsonIsland
import "./features/CrimsonIsland/BrokenHype";
import "./features/CrimsonIsland/FlareTrade";
import "./features/CrimsonIsland/VanquisherAlert";

// Fun
import "./features/Fun/GetTodayLuck";

// Kuudra
import "./features/Kuudra/KuudraTwoTwoReparty";

// Reparty
import "./features/Reparty/RepartyKickPlayer";

// Waypoint
import "./features/Waypoint/Waypoint";

register("command", () => {
    Settings.openGUI();
}).setName("griffin").setAliases("griffinOwO").setAliases("gf");
