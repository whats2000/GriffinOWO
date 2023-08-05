import Settings from "../../config";
import getCurrentPhase from "../../utils/KuudraStage";
import renderBeaconBeam from "../../../BeaconBeam";
import { checkInWorld } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

let fuelProgress = 0;

registerEventListener(() => Settings.kuudraFuelProgress && checkInWorld("Kuudra"),
    register("chat", () => {
        fuelProgress = 0;
        moutedCannon = false;
    }).setCriteria("[NPC] Elle: Not again!")
);

registerEventListener(() => Settings.kuudraFuelProgress && checkInWorld("Kuudra"),
    register("chat", (player, progress) => {
        if (getCurrentPhase() !== 3) return;

        fuelProgress = parseInt(progress);
    }).setCriteria("${player} recovered a Fuel Cell and charged the Ballista! (${progress}%)")
);

registerEventListener(() => Settings.kuudraFuelProgress && checkInWorld("Kuudra"),
    register("step", () => {
        if (getCurrentPhase() !== 3) return;
        const stands = World.getAllEntitiesOfType(ArmorStand.class);

        const progressStand = stands.find(stand => stand.getName().includes("Energy Charge:"));
        //ChatLib.chat(`&2[GriffinOwO] &fUpdate progress: ${progressStand}`);

        if (progressStand !== undefined) {
            const name = ChatLib.removeFormatting(progressStand.getName());
            const progressString = name ? name.replace("Energy Charge: ", "") : null;

            if (progressString !== null) {
                const progress = parseInt(progressString);
                if (!isNaN(progress)) {
                    fuelProgress = progress;
                } else {
                    ChatLib.chat(`&2[GriffinOwO] &cDetect Invalid progress: ${progressString}`);
                }
            }
        }
    }).setDelay(1)
);

registerEventListener(() => Settings.kuudraFuelProgress && checkInWorld("Kuudra"),
    register("renderWorld", () => {
        if (getCurrentPhase() !== 3) return;

        const [x, y, z] = [-102.5, 81.8125, -106.5];
        const playerPos = [Player.getX(), Player.getY(), Player.getZ()];

        const distance = Math.floor(Math.sqrt(Math.pow(x - playerPos[0], 2) + Math.pow(y - playerPos[1], 2) + Math.pow(z - playerPos[2], 2)));

        const textColor = 0xFFFFFF;
        const scale = Settings.kuudraFuelProgressTextSize;
        const increase = true;

        let color = "§a"

        switch (fuelProgress) {
            case 0:
                color = "§c";
                break;
            case 25:
                color = "§6";
                break;
            case 50:
                color = "§e";
                break;
            case 75:
                color = "§a";
                break;
            case 100:
                color = "§b";
                break;
            default:
                color = "§a"
        }

        if (scale > 0)
            Tessellator.drawString(`Fuel: ${color}${fuelProgress}% §f§a[${distance}m]`, x, y + 0.5, z, textColor, true, scale, increase);

        if (Settings.kuudraFuelProgressBeacon)
            renderBeaconBeam(x - 0.5, y, z - 0.5, 0, 191, 255, 0.5, false);
    })
);

registerEventListener(() => Settings.kuudraFuelProgress,
    register("worldUnload", () => {
        fuelProgress = 0;
    })
);
