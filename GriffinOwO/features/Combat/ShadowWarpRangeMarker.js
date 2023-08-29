import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import renderBeaconBeam from "../../../BeaconBeam";
import { getItemScroll, getVec3Pos, getVec3iPos } from "../../utils/Function";
import { getCdReduce } from "../../utils/DungeonTracker";
import { registerEventListener } from "../../utils/EventListener";

let shadowWarpUsedTime = 0;
let inSecondAbilityCd = false;

const ShadowWarpCooldown = [5000, 10000]; // It have 2 ability 1st and use within 1st cd will trigger 2nd cd

registerEventListener(() => Settings.shadowWarpMarker,
    register("renderWorld", (partialTick) => {
        if (getItemScroll(Player.getHeldItem())?.toString() !== "SHADOW_WARP_SCROLL") return;
        let onAir = false;

        // Get block looking at
        const moveObject = Player.getPlayer().func_174822_a(10, partialTick); // rayTrace(25, partialTick)

        // If on air return
        if (moveObject.field_72313_a.toString() !== "BLOCK") onAir = true; // MovingObjectPosition.typeOfHit

        // Check if in CD
        const [r, g, b] = shadowWarpUsedTime < Date.now() ? [0, 1, 0] : [1, 0, 0];

        // Idk why Hypixel make the hit type floor when hit block this kinda interesting and cost me 3 hr
        if (!onAir) {
            const [x, y, z] = getVec3iPos(moveObject.func_178782_a()); // MovingObjectPosition.blockPos
            RenderLib.drawCyl(x, y + 1, z, 0, 1, 1.5, 36, 36, 0, 90, 90, r, g, b, 0.2, false, 0);
            RenderLib.drawCyl(x, y + 1, z, 9.25, 9.25, 0.25, 36, 36, 0, 90, 90, r, g, b, 0.2, false, 0);
            renderBeaconBeam(x - 0.5 + 0.5 * onAir, y + 1.5 - 2 * onAir, z - 0.5 + 0.5 * onAir, r, g, b, 0.2, true)
        } else {
            const [sx, sy, sz] = getVec3Pos(moveObject.field_72307_f); // MovingObjectPosition.hitVec
            RenderLib.drawCyl(sx, sy - 2, sz, 0, 1, 1.5, 36, 36, 0, 90, 90, r, g, b, 0.2, false, 0);
            RenderLib.drawCyl(sx, sy - 2, sz, 9.25, 9.25, 0.25, 36, 36, 0, 90, 90, r, g, b, 0.2, false, 0);
            renderBeaconBeam(sx - 0.5, sy - 1.5, sz - 0.5, r, g, b, 0.2, true)
        }
    })
);

registerEventListener(() => Settings.shadowWarpMarker,
    register("actionBar", () => {
        if (shadowWarpUsedTime < Date.now()) {
            shadowWarpUsedTime = new Date().getTime() + ShadowWarpCooldown[0] * getCdReduce();
        }
    }).setCriteria("${front} Mana (Shadow Warp) ${end}")
);

registerEventListener(() => Settings.shadowWarpMarker,
    register("clicked", (x, y, button, isButtonDown) => {
        if (getItemScroll(Player.getHeldItem())?.toString() !== "SHADOW_WARP_SCROLL" || button === 0) return;
        if (shadowWarpUsedTime > Date.now() && !inSecondAbilityCd) {
            shadowWarpUsedTime = new Date().getTime() + ShadowWarpCooldown[1] * getCdReduce();
            inSecondAbilityCd = true;
            ChatLib.chat(`&2[GriffinOwO] &6&lWarning! &fYou use second ability cool down will be longer`)
        }
        if (shadowWarpUsedTime < Date.now()) {
            inSecondAbilityCd = false;
        }
    })
);
