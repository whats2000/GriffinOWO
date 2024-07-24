import Settings from "../../config";
import { getDungeonPhase, getPlayerClass } from "../../utils/DungeonTracker";
import { checkInZone } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const EntityFallingBlock = Java.type("net.minecraft.entity.item.EntityFallingBlock");

let endFight = false;

registerEventListener(() => Settings.hideP1ArmorStand && (checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)")),
    register("renderEntity", (entity, pos, partialTick, event) => {
        if (getDungeonPhase() !== 71 || getPlayerClass() === 1 || !(entity.getEntity() instanceof EntityArmorStand)) return;
        cancel(event);
    })
);

registerEventListener(() => Settings.hideP5ArmorStandAndFallingBlock && (checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)")),
    register("renderEntity", (entity, pos, partialTick, event) => {
        if (getDungeonPhase() !== 75 || endFight || !(entity.getEntity() instanceof EntityArmorStand)) return;
        cancel(event);
    })
);

registerEventListener(() => Settings.hideP5ArmorStandAndFallingBlock && (checkInZone("The Catacombs (M7)")),
    register("renderEntity", (entity, pos, partialTick, event) => {
        if (getDungeonPhase() !== 75 || !(entity.getEntity() instanceof EntityFallingBlock)) return;
        cancel(event);
    })
);

registerEventListener(() => Settings.hideP5ArmorStandAndFallingBlock && (checkInZone("The Catacombs (M7)")),
    register("chat", () => {
        endFight = true;
    }).setCriteria("[BOSS] Wither King: Incredible. You did what I couldn't do myself.")
);

register("worldLoad", () => {
    endFight = false;
});
