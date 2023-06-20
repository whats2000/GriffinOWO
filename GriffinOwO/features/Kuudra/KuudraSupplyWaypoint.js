import Settings from "../../config";
import { getColorArray } from "../../utils/Function";
import getCurrentPhase from "../../utils/KuudraStage";
import renderBeaconBeam from "../../../BeaconBeam";

const Giant = Java.type("net.minecraft.entity.monster.EntityGiantZombie");

register("renderWorld", () => {
    if (!Settings.kuudraSupplyWaypoint) return;
    if (getCurrentPhase() !== 0 && getCurrentPhase() !== 1 && getCurrentPhase() !== 3) return;

    const players = World.getAllPlayers();

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
            player.getName() !== Player.getName() &&
            Math.abs(player.getX() - x) <= 5 &&
            Math.abs(player.getY() - y) <= 5 &&
            Math.abs(player.getZ() - z) <= 5
        );

        if (nearbyPlayers.length > 0) {
            if (scale > 0)
                Tessellator.drawString(`§cPlayer Around`, x, y + 0.5, z, textColor, true, scale, isShadow);
        } else {
            if (scale > 0)
                Tessellator.drawString(`§aSupply [${distance}m]`, x, y + 0.5, z, textColor, true, scale, isShadow);

            const beaconColor = getColorArray(Settings.kuudraSupplyBeaconColor);
            renderBeaconBeam(giant.getX() - 2.5, 75, giant.getZ() + 3, beaconColor[0], beaconColor[1], beaconColor[2], 0.7, false);
        }
    });
});