import Settings from "../../config";
import getCurrentPhase from "../../utils/KuudraStage";
import renderBeaconBeam from "../../../BeaconBeam";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

let fuelProgress = 0;

register("chat", () => {
    if (!Settings.kuudraFuelProgress) return;

    fuelProgress = 0;
    moutedCannon = false;
}).setCriteria("[NPC] Elle: Not again!");

register("chat", (player, progress) => {
    if (!Settings.kuudraFuelProgress) return;
    if (getCurrentPhase() !== 3) return;

    fuelProgress = parseInt(progress);
}).setCriteria("${player} recovered a Fuel Cell and charged the Ballista! (${progress}%)");

register("step", () => {
    if (!Settings.kuudraFuelProgress) return;
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
}).setDelay(1);

register("renderWorld", () => {
    if (!Settings.kuudraFuelProgress) return;
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
});

register("worldUnload", () => {
    if (!Settings.kuudraFuelProgress) return;

    fuelProgress = 0;
});
