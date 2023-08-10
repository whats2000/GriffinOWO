import Settings from "../../config";
import getCurrentPhase from "../../utils/KuudraStage";
import { checkInWorld, checkInZone } from "../../utils/Location";
import { getVec3Pos } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

const MagmaCube = Java.type('net.minecraft.entity.monster.EntityMagmaCube');
const radians_to_degrees = rad => (rad * 180.0) / Math.PI;

let direction = "";

registerEventListener(() => Settings.kuudraHeadPointer && checkInWorld("Kuudra"),
    register("chat", () => {
        direction = "";
    }).setCriteria("[NPC] Elle: Not again!")
);

registerEventListener(() => Settings.kuudraHeadPointer && checkInZone("Kuudra's Hollow (T5)"),
    register("renderWorld", (partialTick) => {
        if (getCurrentPhase() !== 4) return;

        const MagmaCubes = World.getAllEntitiesOfType(MagmaCube.class);

        const Kuudra = MagmaCubes.find((magma) =>
            magma.getWidth() === 15.30000114440918 &&
            magma.getEntity().func_110143_aJ() <= 100000 // magma.getEntity().getHealth()
        );

        if (!Kuudra) return;

        // vector of player facing
        const [vx1, vy1, vz1] = getVec3Pos(Player.getPlayer().func_70676_i(partialTick)); // getVec3Pos(Player.getPlayer().getLook())


        // Kuudra x and z pos
        const [kx, kz] = [Kuudra.getX(), Kuudra.getZ()];

        // player x and z pos
        const [px, pz] = [Player.getX(), Player.getZ()];

        // vector of kuudra from player
        const [vx2, vz2] = [kx - px, kz - pz];

        let angleDifference = radians_to_degrees(Math.atan2(vz1, vx1)) - radians_to_degrees(Math.atan2(vz2, vx2));

        if (angleDifference > 180) {
            angleDifference -= 360;
        } else if (angleDifference < -180) {
            angleDifference += 360;
        }

        //ChatLib.chat(`${angleDifference}`)
        // Point to Kuudra ↗ ↖ ↘ ↙ ↑ ↓ → ←

        if (angleDifference >= -22.5 && angleDifference < 22.5) {
            direction = "§a↑";
        } else if (angleDifference >= 22.5 && angleDifference < 67.5) {
            direction = "§e↖";
        } else if (angleDifference >= 67.5 && angleDifference < 112.5) {
            direction = "§c←";
        } else if (angleDifference >= 112.5 && angleDifference < 157.5) {
            direction = "§c↙";
        } else if (angleDifference >= 157.5 || angleDifference < -157.5) {
            direction = "§c↓";
        } else if (angleDifference >= -157.5 && angleDifference < -112.5) {
            direction = "§c↘";
        } else if (angleDifference >= -112.5 && angleDifference < -67.5) {
            direction = "§c→";
        } else if (angleDifference >= -67.5 && angleDifference < -22.5) {
            direction = "§e↗";
        }
    })
);

registerEventListener(() => Settings.kuudraHeadPointer,
    register("worldUnload", () => {
        direction = "";
    })
);

export function getKuudraPointer() {
    return direction;
}
