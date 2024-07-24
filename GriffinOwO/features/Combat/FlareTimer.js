import Settings from "../../config";
import { Flare } from "../../utils/Variable";
import { registerEventListener } from "../../utils/EventListener";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

let flare = {
    type: -1,
    time: 0
};
let inFlareRange = false;

registerEventListener(() => Settings.flareTimer,
    register("step", () => {
        const armorstands = World.getAllEntitiesOfType(ArmorStand.class);
        inFlareRange = false;

        flare = {
            type: -1,
            time: 0
        };

        armorstands.find((armorstand) => {
            const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
            const [x, y, z] = [armorstand.getX(), armorstand.getY(), armorstand.getZ()];
            const distance = Math.floor(Math.sqrt(Math.pow(x - playerPos[0], 2) + Math.pow(y - playerPos[1], 2) + Math.pow(z - playerPos[2], 2)));

            if (distance > 40 || armorstand.getTicksExisted() > 3600) return;

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

            inFlareRange = true;
            const flareTime = parseInt(180 - armorstand.getTicksExisted() / 20);

            if (type > flare.type) {
                flare.type = type;
                flare.time = flareTime;
            } else if (type === flare.type && flareTime > flare.time) {
                flare.time = flareTime;
            }
        });
    })
);

registerEventListener(() => Settings.flareTimer,
    register("worldUnload", () => {
        flare = {
            type: -1,
            time: 0
        };
    })
);

export function getFlareTimeFormatted() {
    let displayType;
    switch (flare.type) {
        case 0:
            displayType = "&a&lWarning"
            break;
        case 1:
            displayType = "&1&lAlert"
            break;
        case 2:
            displayType = "&5&lSOS"
            break;
        default:
            displayType = "Unknow";
            break;
    }

    if (inFlareRange)
        return [displayType, flare.time]
    else
        return ["Unknow", -1]
}