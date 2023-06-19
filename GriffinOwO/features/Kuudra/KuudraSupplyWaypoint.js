import Settings from "../../config";
import { getColorArray } from "../../utils/Function";
import renderBeaconBeam from "../../../BeaconBeam";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const Giant = Java.type("net.minecraft.entity.monster.EntityGiantZombie");

let isWaitingForSupply = false;


register("chat", () => {
    if (!Settings.kuudraSupplyWaypoint) return;

    isWaitingForSupply = true;
}).setCriteria("[NPC] Elle: Not again!");

register("renderWorld", () => {
    if (!Settings.kuudraSupplyWaypoint) return;
    if (!isWaitingForSupply) return;

    const stands = World.getAllEntitiesOfType(ArmorStand.class);
    const players = World.getAllPlayers();

    const endCollectingArmorStand = stands.some(stand => stand.getName().includes("SUPPLY PILE"));
    if (endCollectingArmorStand) {
        isWaitingForSupply = false;
        return;
    }

    const giants = World.getAllEntitiesOfType(Giant.class);
    const supplies = giants.filter(giant => giant.getY() < 67)

    supplies.forEach(giant => {
        //ChatLib.chat(`&2[GriffinOwO] &fGiant [${giant.getUUID()}] [${giant.getX()}, 75.5, ${giant.getZ()}]`);
        let [x, y, z] = [giant.getX() - 2, 75.5, giant.getZ() + 3.5];
        const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
        const distance = Math.floor(Math.sqrt(Math.pow(x - playerPos[0], 2) + Math.pow(y - playerPos[1], 2) + Math.pow(z - playerPos[2], 2)));
        const textColor = 0xFFFFFF;
        const scale = Settings.kuudraSupplyTextSize;
        const isShadow = true;

        const nearbyPlayers = players.filter(player =>
            Math.abs(player.getX() - x) <= 3 && Math.abs(player.getY() - y) <= 3 && Math.abs(player.getZ() - z) <= 3
        );

        if (nearbyPlayers.length > 0) {
            if (scale > 0)
                Tessellator.drawString(`§cSupply Collecting`, x, y + 0.5, z, textColor, true, scale, isShadow);
        } else {
            if (scale > 0)
                Tessellator.drawString(`§aSupply [${distance}m]`, x, y + 0.5, z, textColor, true, scale, isShadow);

            const beaconColor = getColorArray(Settings.kuudraSupplyBeaconColor);
            renderBeaconBeam(giant.getX() - 2.5, 75, giant.getZ() + 3, beaconColor[0], beaconColor[1], beaconColor[2], 0.7, false);
        }
    });
});