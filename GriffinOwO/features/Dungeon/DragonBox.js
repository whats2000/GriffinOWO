import Settings from "../../config";
import RenderLibV2 from "../../../RenderLibV2";
import { checkInZone } from "../../utils/Location";
import { getDungeonPhase } from "../../utils/DungeonTracker";
import { registerEventListener } from "../../utils/EventListener";

// This reference to https://github.com/odtheking/OdinClient/blob/main/src/main/kotlin/me/odinclient/features/impl/floor7/DragonBoxes.kt with The Unlicense

let dragonState = {
    "Red": { pos: new BlockPos(32, 22, 59), alive: true },
    "Orange": { pos: new BlockPos(80, 23, 56), alive: true },
    "Green": { pos: new BlockPos(32, 23, 94), alive: true },
    "Blue": { pos: new BlockPos(79, 23, 94), alive: true },
    "Purple": { pos: new BlockPos(56, 22, 120), alive: true }
};

export function isAlive(color) {
    return dragonState[color].alive;
}

function resetAlive() {
    for (let color in dragonState) {
        dragonState[color].alive = true;
    }
}

// Update to check alive status
registerEventListener(() => Settings.dragonBox && checkInZone("The Catacombs (M7)"),
    register("step", () => {
        if (getDungeonPhase() !== 75) return;

        for (let color in dragonState) {
            if (World.getBlockStateAt(dragonState[color].pos).toString() === "minecraft:air") {
                dragonState[color].alive = false;
            }
        }
    }).setDelay(1)
);

// Render Box color use skytils
registerEventListener(() => Settings.dragonBox && checkInZone("The Catacombs (M7)"),
    register("renderWorld", () => {
        if (getDungeonPhase() !== 75) return;

        if (dragonState["Red"].alive) {
            RenderLibV2.drawEspBoxV2(27, 13, 58, 25, 15, 25, 1, 0, 0, 1, false, 3.69);
        }

        if (dragonState["Orange"].alive) {
            RenderLibV2.drawEspBoxV2(87, 8, 61.5, 30, 20, 29, 1.0, 0.49803922, 0.3137255, 1, false, 3.69);
        }

        if (dragonState["Green"].alive) {
            RenderLibV2.drawEspBoxV2(22, 8, 95, 30, 20, 30, 0, 1, 0, 1, false, 3.69);
        }

        if (dragonState["Blue"].alive) {
            RenderLibV2.drawEspBoxV2(84, 16, 95, 25, 10, 25, 0, 1, 1, 1, false, 3.69);
        }

        if (dragonState["Purple"].alive) {
            RenderLibV2.drawEspBoxV2(57, 13, 125, 23, 10, 23, 0.5019608, 0.0, 0.5019608, 1, false, 3.69);
        }
    })
);

// Reset alive status
registerEventListener(() => Settings.dragonBox && checkInZone("The Catacombs (M7)"),
    register("chat", () => {
        resetAlive();
    }).setCriteria("[BOSS] Wither King: Ohhh?")
);

registerEventListener(() => Settings.dragonBox && checkInZone("The Catacombs (M7)"),
    register("chat", () => {
        resetAlive();
    }).setCriteria("[BOSS] Wither King: You.. again?")
);
