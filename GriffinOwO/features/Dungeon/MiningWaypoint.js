import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import { MiningWaypoint } from "../../utils/Variable";
import { getDungeonPhase, getPlayerClass } from "../../utils/DungeonTracker";
import { checkInZone } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.dungeonMiningWaypoint && (checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)")),
    register("renderWorld", () => {
        const phrase = getDungeonPhase();
        if (phrase < 71) return;

        MiningWaypoint.forEach(waypoint => {
            if (!waypoint.show.includes(phrase)) return;
            if (Settings.dungeonWaypointMode !== 0) {
                if (Settings.dungeonWaypointMode === 6) {
                    if (!waypoint.class.includes(getPlayerClass())) return;
                }
                else {
                    if (!waypoint.class.includes(Settings.dungeonWaypointMode)) return;
                }
            }

            let [x, y, z] = [waypoint.x, waypoint.y, waypoint.z]
            let [w, h] = [waypoint.w, waypoint.h]

            const textColor = 0xFFFFFF;
            const scale = Settings.dungeonWaypointTextSize;
            const increase = true;

            RenderLib.drawEspBox(x + 0.5, y, z + 0.5, w, h, 1, 0, 0, 1, true);
            Tessellator.drawString(`§d${waypoint.name}`, x + 0.5, y + 0.5, z + 0.5, textColor, true, scale, increase);
        });
    })
);
