import Settings from "../../config";
import RenderLibV2 from "../../../RenderLibV2";
import { checkInWorld } from "../../utils/Location";
import { noSqrt3DDistance, getEntityRenderParams } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

// This reference to https://github.com/odtheking/OdinClient/blob/main/src/main/kotlin/me/odinclient/features/impl/render/ESP.kt with The Unlicense
// But I rewrite it into legit version

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

let starEntitiesToRender = {};

registerEventListener(() => Settings.boxStarredMob && checkInWorld("Dungeon"),
    register("step", () => {
        const stands = World.getAllEntitiesOfType(EntityArmorStand.class);

        for (let i = 0; i < stands.length; i++) {
            const stand = stands[i];
            const mcStand = stand.getEntity();

            const matchingEntity = starEntitiesToRender[mcStand.func_145782_y()]; // mcStand.getEntityId()

            // if matchingEntity and matchingEntity.isDead
            if (matchingEntity && matchingEntity.field_70128_L) {
                delete starEntitiesToRender[mcStand.func_145782_y()];
            } else if (matchingEntity) {
                continue;
            }

            const name = stand.getName().removeFormatting().toLowerCase();

            if ((!name.startsWith("✯ ") || !name.endsWith("❤"))) {
                delete starEntitiesToRender[mcStand.func_145782_y()];
                continue;
            }

            // mc.theWorld.getEntitiesWithinAABBExcludingEntity(mcStand, mcStand.getEntityBoundingBox().expand(1, 5, 1))
            const entities = World.getWorld().func_72839_b(mcStand, mcStand.func_174813_aQ().func_72314_b(1, 5, 1)).filter(entity =>
                entity &&
                !(entity instanceof EntityArmorStand) &&
                entity !== Player.getPlayer()
            ).sort((a, b) =>
                noSqrt3DDistance(a, mcStand) - noSqrt3DDistance(b, mcStand)
            );

            // If not found return
            if (entities.length === 0) continue;

            // Prevent Render Hidden Enderman
            if (entities[0].func_82150_aj()) continue; // entities[0].isInvisible()

            // Add to render list
            starEntitiesToRender[mcStand.func_145782_y()] = entities[0];
        }
    }).setDelay(1)
);

registerEventListener(() => Settings.boxStarredMob && checkInWorld("Dungeon"),
    register("renderWorld", (partialTicks) => {
        for (let key in starEntitiesToRender) {
            let value = starEntitiesToRender[key];

            if (value && value.field_70128_L) {
                delete starEntitiesToRender[key];
                continue;
            }

            let [x, y, z, w, h] = getEntityRenderParams(value, partialTicks);

            let boxColor = RenderLibV2.getColor(Settings.boxStarredMobColor);

            RenderLibV2.drawEspBoxV2(
                x, y, z, w, h, w,
                boxColor.red, boxColor.green, boxColor.blue, boxColor.alpha,
                false, Settings.boxStarredMobBoxLineWidth
            );
        }
    })
);

// Reset 
register("worldLoad", () => {
    starEntitiesToRender = {};
});
