import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import renderBeaconBeam from "../../../BeaconBeam";
import { getCdReduce } from "../../utils/DungeonTracker";
import { registerEventListener } from "../../utils/EventListener";

const gravityStormCooldown = 30000; // 30 seconds

let gravityStormUsedTime = 0;

function getVec3Pos(vec) {
    // [Vec3.xCoord, Vec3.yCoord, Vec3.zCoord]
    return [vec.field_72450_a, vec.field_72448_b, vec.field_72449_c]
}

registerEventListener(() => Settings.gyroRangeMarker,
    register("renderWorld", (partialTick) => {
        if (!Player.getHeldItem()?.getName()?.endsWith("Gyrokinetic Wand")) return;

        // Get more correct by eye distance
        const vec1 = Player.getPlayer().func_174824_e(partialTick); // getPositionEyes
        const vec2 = Player.getPlayer().func_70676_i(partialTick);  // getLook
        const [vecX, vecY, vecZ] = getVec3Pos(vec2);
        const vec3 = vec1.func_72441_c(vecX * 20, vecY * 20, vecZ * 20);
        const moveObject = World.getWorld().func_147447_a(vec1, vec3, true, false, true);

        // If on air return
        if (moveObject.field_72313_a.toString() !== "BLOCK") return; // MovingObjectPosition.typeOfHit

        // If top of it not air return
        const topBlock = World.getWorld().func_180495_p(moveObject.func_178782_a().func_177984_a()/* getBlockPos().up() */);
        if (topBlock.toString() !== "minecraft:air") return;

        // Get the position
        const [x, y, z] = getVec3Pos(moveObject.field_72307_f); // MovingObjectPosition.hitVec

        // Check if in CD
        const [r, g, b] = gravityStormUsedTime < Date.now() ? [0, 1, 0] : [1, 0, 0];

        RenderLib.drawCyl(x, y, z, 10, 10, 0.25, 30, 1, 0, 90, 90, r, g, b, 0.5, false, false);

        const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
        const distance = Math.floor(Math.sqrt(Math.pow(x - playerPos[0], 2) + Math.pow(y - playerPos[1], 2) + Math.pow(z - playerPos[2], 2)));
        if (distance > 5)
            renderBeaconBeam(x - 0.5, y, z - 0.5, r, g, b, 0.2, false);
    })
);

registerEventListener(() => Settings.gyroRangeMarker,
    register("worldUnload", () => {
        gravityStormUsedTime = 0;
    })
);

registerEventListener(() => Settings.gyroRangeMarker,
    register("actionBar", () => {
        if (gravityStormUsedTime < Date.now())
            gravityStormUsedTime = new Date().getTime() + gravityStormCooldown * getCdReduce();
    }).setCriteria("${front} Mana (Gravity Storm) ${end}")
);