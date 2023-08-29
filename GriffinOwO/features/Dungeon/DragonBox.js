import Settings from "../../config";
import RenderLibV2 from "../../../RenderLibV2";
import { checkInZone } from "../../utils/Location";
import { getDungeonPhase, isAlive } from "../../utils/DungeonTracker";
import { registerEventListener } from "../../utils/EventListener";

// This reference to https://github.com/odtheking/OdinClient/blob/main/src/main/kotlin/me/odinclient/features/impl/floor7/DragonBoxes.kt with The Unlicense
// Render Box color use skytils
registerEventListener(() => Settings.dragonBox && checkInZone("The Catacombs (M7)"),
    register("renderWorld", () => {
        if (getDungeonPhase() !== 75) return;

        if (isAlive("Red")) {
            RenderLibV2.drawEspBoxV2(27, 13, 58, 25, 15, 25, 1, 0, 0, 1, false, 3.69);
        }

        if (isAlive("Orange")) {
            RenderLibV2.drawEspBoxV2(87, 8, 61.5, 30, 20, 29, 1.0, 0.49803922, 0.3137255, 1, false, 3.69);
        }

        if (isAlive("Green")) {
            RenderLibV2.drawEspBoxV2(22, 8, 95, 30, 20, 30, 0, 1, 0, 1, false, 3.69);
        }

        if (isAlive("Blue")) {
            RenderLibV2.drawEspBoxV2(84, 16, 95, 25, 10, 25, 0, 1, 1, 1, false, 3.69);
        }

        if (isAlive("Purple")) {
            RenderLibV2.drawEspBoxV2(57, 13, 125, 23, 10, 23, 0.5019608, 0.0, 0.5019608, 1, false, 3.69);
        }
    })
);
