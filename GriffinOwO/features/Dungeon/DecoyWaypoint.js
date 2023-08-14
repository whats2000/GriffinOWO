import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import { DecoyWaypoint } from "../../utils/Variable";
import { getDungeonPhase, getPlayerClass } from "../../utils/DungeonTracker";
import { checkInZone } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.dungeonDecoyWaypoint && (checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)")),
    register("renderWorld", () => {
        const phrase = getDungeonPhase();
        if (phrase < 71) return;

        DecoyWaypoint.forEach(waypoint => {
            if (!waypoint.show.includes(phrase) && !Settings.dungeonWaypointPracticeMode) return;
            if (Settings.dungeonWaypointMode !== 0) {
                if (Settings.dungeonWaypointMode === 6) {
                    if (!waypoint.class.includes(getPlayerClass())) return;
                }
                else {
                    if (!waypoint.class.includes(Settings.dungeonWaypointMode)) return;
                }
            }

            let [x, y, z] = [waypoint.x, waypoint.y, waypoint.z]

            const textColor = 0xFFFFFF;
            const scale = Settings.dungeonWaypointTextSize;
            const increase = true;

            RenderLib.drawInnerEspBox(x + 0.5, y + 1, z + 0.5, 0.6, 0.01, 0.7, 0.7, 0.7, 1, true);
            Tessellator.drawString(`${waypoint.name}`, x + 0.5, y + 0.5, z + 0.5, textColor, true, scale, increase);
        });
    })
);
