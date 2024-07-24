import Settings from "../../config";
import { checkInWorld } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

let prevXp = 0;
let killCount = 0;

const WITHER_BLADES = ["HYPERION", "ASTRAEA", "SCYLLA", "VALKYRIE", "NECRON_BLADE_UNREFINED"];

// Detect if use wither blade but not get exp
registerEventListener(() => Settings.brokenHyper && (Settings.brokenHyperDetectFlareOnly ? checkInWorld("Crimson Isle") : true),
    register("entitydeath", (entity) => {
        if (!(Player.asPlayerMP().distanceTo(entity) < 6)) return;

        const scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) });

        if (Settings.brokenHyperDetectFlareOnly) {
            if (!(entity.getClassName() === "EntityBlaze")) return;

            let location = "";

            for (let line of scoreboard) {
                if (line.includes("⏣")) {
                    location = line;
                    break;
                }
            }

            if (location.replace(/[^\x00-\x7F]/g, '') !== "  Magma Chamber") return;
        }

        const item = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes");
        const itemId = item.getString("id");

        if (!WITHER_BLADES.includes(itemId)) return;

        const getXp = item.getDouble("champion_combat_xp") - prevXp;
        prevXp = item.getDouble("champion_combat_xp");

        if (getXp > 0)
            killCount = 0;
        else
            killCount++;

        if (killCount > 4)
            Client.Companion.showTitle(`&6Hype is broken`, "", 5, 25, 5);
    })
);
