import Settings from "../../config";

let prevXp = 0;
let killCount = 0;

const WITHER_BLADES = ["HYPERION", "ASTRAEA", "SCYLLA", "VALKYRIE", "NECRON_BLADE_UNREFINED"];

// Detect if use wither blade but not get exp
register("entitydeath", (entity) => {
    if (!Settings.brokenHyper) return;

    if (!(Player.asPlayerMP().distanceTo(entity) < 6) || !(entity.getClassName() == "EntityBlaze")) return;

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
});