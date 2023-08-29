import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import { DecoyWaypoint } from "../../utils/Variable";
import { getDungeonPhase, getPlayerClass, isAlive } from "../../utils/DungeonTracker";
import { checkInZone } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.dungeonDecoyWaypoint && (checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)")),
    register("renderWorld", () => {
        const phase = getDungeonPhase();
        if (phase < 71) return;

        DecoyWaypoint.forEach(waypoint => {
            if ((!waypoint.show.includes(phase) || !isAlive(waypoint.dragonColor))
                && !Settings.dungeonWaypointPracticeMode) return;
            if (Settings.dungeonWaypointMode !== 0) {
                if (Settings.dungeonWaypointMode === 6) {
                    if (!waypoint.class.includes(getPlayerClass())) return;
                }
                else {
                    if (!waypoint.class.includes(Settings.dungeonWaypointMode)) return;
                }
            }

            if (waypoint.name.startsWith("§3Pre Decoy") && Settings.dungeonWaypointMode !== 0) {
                // Waypoint Class index ["All Class", "Archer", "Berserk", "Healer", "Tank", "Mage"]
                let p4Class = 3; // Deafault Healer

                // P4 Class index ["Healer", "Berserk", "Mage"]
                switch (Settings.dungeonWaypointP4Class) {
                    case 0:
                        p4Class = 3;
                        break;
                    case 1:
                        p4Class = 2;
                        break;
                    case 2:
                        p4Class = 5;
                        break;
                    default:
                        p4Class = 3;
                }

                if (Settings.dungeonWaypointMode === 6) {
                    if (getPlayerClass() !== p4Class) return;
                } else {
                    if (Settings.dungeonWaypointMode !== p4Class) return;
                }
            };

            let [x, y, z] = [waypoint.x, waypoint.y, waypoint.z];

            const textColor = 0xFFFFFF;
            const scale = Settings.dungeonWaypointTextSize;
            const increase = true;

            if (waypoint.name.includes("Decoy")) {
                RenderLib.drawInnerEspBox(x + 0.5, y + 1, z + 0.5, 0.6, 0.01, 0.7, 0.7, 0.7, 1, true);
            } else {
                let color = waypoint.color;

                RenderLib.drawInnerEspBox(x + 0.5, y + 1, z + 0.5, 1, 0.01, color[0], color[1], color[2], 1, true);
            }
            Tessellator.drawString(`${waypoint.name}`, x + 0.5, y + 0.5, z + 0.5, textColor, true, scale, increase);
        });
    })
);
