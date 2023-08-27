import Settings from "../../config";
import RenderLibV2 from "../../../RenderLibV2";
import { getPlayerClass, getClassCheck, getTeammateByClass } from "../../utils/DungeonTracker";
import { checkInWorld } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.tankProtectRange && checkInWorld("Dungeon"),
    register("renderWorld", () => {
        if (!getClassCheck()) return;

        const TankPlayers = getTeammateByClass("Tank");
        if (TankPlayers.length === 0) return;

        const RenderTargets = World.getAllPlayers().filter(player => TankPlayers.indexOf(player.getName()) !== -1);
        const color = RenderLibV2.getColor(Settings.tankProtectRangeColor);

        RenderTargets.forEach(player => {
            if (!Settings.tankProtectRangeShowOwn && player.getName() === Player.getName()) return;

            // Check display mode, 0 is wall and 1 is circle
            if (Settings.tankProtectRangeMode === 0) {
                RenderLibV2.drawCyl(player.getX(), player.getY() - 30, player.getZ(),
                    30, 30, 60,
                    360, 1, 0, 90, 90,
                    color.red, color.green, color.blue, 0.2,
                    false, false
                );
            } else {
                RenderLibV2.drawCyl(player.getX(), player.getY(), player.getZ(),
                    30, 30, 0.1,
                    360, 1, 0, 90, 90,
                    color.red, color.green, color.blue, 1,
                    true, false
                );
            }
        });
    })
);