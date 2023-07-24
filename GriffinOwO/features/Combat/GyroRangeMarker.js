import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import renderBeaconBeam from "../../../BeaconBeam";
import { getCdReduce } from "../../utils/DungeonTracker";
import { registerEventListener } from "../../utils/EventListener";

const gravityStormCooldown = 30000; // 30 seconds

let gravityStormUsedTime = 0;

function getVec3iPos(vec) {
    // [Vec3i.getX(), Vec3i.getY(), Vec3i.getZ()]
    return [parseInt(vec.func_177958_n()), parseInt(vec.func_177956_o()), parseInt(vec.func_177952_p())]
}

registerEventListener(() => Settings.gyroRangeMarker || Settings.gyroRangeBlock,
    register("renderWorld", (partialTick) => {
        if (!Player.getHeldItem()?.getName()?.endsWith("Gyrokinetic Wand")) return;

        // Get block looking at
        const moveObject = Player.getPlayer().func_174822_a(25, partialTick);

        // If on air return
        if (moveObject.field_72313_a.toString() !== "BLOCK") return; // MovingObjectPosition.typeOfHit

        // If top of it is slab, block, stair retun
        const topBlockState = World.getWorld().func_180495_p(moveObject.func_178782_a().func_177984_a()); // mc.theWorld.getBlockState(moveObject.getBlockPos().up())
        const topBlock = topBlockState.func_177230_c(); // topBlockState.getBlock()
        if (topBlock instanceof Java.type("net.minecraft.block.BlockSlab")) return;

        if (topBlock instanceof Java.type("net.minecraft.block.BlockStairs")) {
            const halfValue = topBlockState.func_177229_b(topBlock.field_176308_b); // topBlockState.getValue(topBlock.Half)
            if (halfValue.toString() === "bottom") return;
        }

        if (topBlock.func_149730_j()) return; //isFullBlock()

        // Get the position
        const [x, y, z] = getVec3iPos(moveObject.func_178782_a()); // MovingObjectPosition.blockPos

        // Check if in CD
        const [r, g, b] = gravityStormUsedTime < Date.now() ? [0, 1, 0] : [1, 0, 0];

        if (Settings.gyroRangeMarker) {
            RenderLib.drawCyl(x + 0.5, y + 1, z + 0.5, 10, 10, 0.25, 30, 1, 0, 90, 90, r, g, b, 0.5, false, false);

            const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
            const distance = Math.floor(Math.sqrt(Math.pow(x - playerPos[0], 2) + Math.pow(y - playerPos[1], 2) + Math.pow(z - playerPos[2], 2)));

            if (distance > 5)
                renderBeaconBeam(x, y + 1, z, r, g, b, 0.2, false);
        }

        if (Settings.gyroRangeBlock)
            RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 1, r, g, b, 1, true);
    })
);

registerEventListener(() => Settings.gyroRangeMarker || Settings.gyroRangeBlock,
    register("worldUnload", () => {
        gravityStormUsedTime = 0;
    })
);

registerEventListener(() => Settings.gyroRangeMarker || Settings.gyroRangeBlock,
    register("actionBar", () => {
        if (gravityStormUsedTime < Date.now())
            gravityStormUsedTime = new Date().getTime() + gravityStormCooldown * getCdReduce();
    }).setCriteria("${front} Mana (Gravity Storm) ${end}")
);