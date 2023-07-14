import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import { GyroWaypoint } from "../../utils/Variable";
import { getDungeonPhase } from "../../utils/DungeonTracker";
import { checkInZone } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.dungeonGyroWaypoint && (checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)")),
    register("renderWorld", () => {
        const phrase = getDungeonPhase();
        if (phrase < 71) return;

        GyroWaypoint.forEach(waypoint => {
            if (!waypoint.show.includes(phrase)) return;
            if (Settings.dungeonWaypointMode !== 0)
                if (!waypoint.class.includes(Settings.dungeonWaypointMode)) return;

            let [x, y, z] = [waypoint.x, waypoint.y, waypoint.z]

            const textColor = 0xFFFFFF;
            const scale = Settings.waypointTextSize;
            const increase = true;

            RenderLib.drawInnerEspBox(x + 0.5, y + 1, z + 0.5, 0.6, 0.01, 1, 1, 0.33, 1, true);
            Tessellator.drawString(`${waypoint.name}`, x + 0.5, y + 0.5, z + 0.5, textColor, true, scale, increase);
        });
    })
);
