import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import { Flare, FlareColors } from "../../utils/Variable";
import { registerEventListener } from "../../utils/EventListener";

function getBlock(x, y, z) {
    let newY;
    for (let i = y; i >= 0; i--) {
        let blockat = World.getBlockAt(x, i, z);
        if (blockat.type.getID() != 0) {
            newY = parseInt(i);
            return newY;
        }
    }
}

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

registerEventListener(() => Settings.flareRangeMarker,
    register("renderWorld", () => {
        let armorstands = World.getAllEntitiesOfType(ArmorStand.class);

        armorstands.find((armorstand) => {
            let as = new EntityLivingBase(armorstand.getEntity());
            let head = as.getItemInSlot(4)?.getRawNBT();

            if (!head) return;

            let type = -1;

            for (let i = 0; i < Flare.length; i++) {
                if (head.includes(Flare[i])) {
                    type = i;
                    break;
                }
            }

            if (type === -1) return;

            let y = getBlock(armorstand.getX(), armorstand.getY(), armorstand.getZ());
            let [r, g, b] = type >= 0 ? FlareColors[type] : [0, 0, 0]; // Black

            if (Settings.flareRangeMarker === 2)
                // Floor
                RenderLib.drawCyl(armorstand.getX(), y + 1, armorstand.getZ(), 0, 40, 0.2, 30, 1, 0, 90, 90, r, g, b, 0.25, false, false);
            else
                // Box
                RenderLib.drawCyl(armorstand.getX(), armorstand.getY() - 40, armorstand.getZ(), 39.9, 40, 80, 30, 1, 0, 90, 90, r, g, b, 0.25, false, false);
        });
    })
);
