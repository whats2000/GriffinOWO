import Settings from "../../config";
import getCurrentPhase from "../../utils/KuudraStage";
import renderBeaconBeam from "../../../BeaconBeam";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

const SupplyPlacePos = [
    [-98, 78.125, -112.9375],
    [-110, 78.125, -106],
    [-106, 78.125, -99.0625],
    [-94, 78.125, -106],
    [-98, 78.125, -99.0625],
    [-106, 78.125, -112.9375]
];

let supplyPlaceWaypoint = [];

register("chat", () => {
    if (!Settings.kuudraSupplyPearlHelper) return;

    supplyPlaceWaypoint = [];
}).setCriteria("[NPC] Elle: Not again!");

register("step", () => {
    if (!Settings.kuudraSupplyPearlHelper) return;
    if (getCurrentPhase() !== 1) return;

    const stands = World.getAllEntitiesOfType(ArmorStand.class);

    const placedSupply = stands.filter(stand => stand.getName().includes('✓ SUPPLIES RECEIVED ✓'));
    const playerPos = [Player.getX(), Player.getY(), Player.getZ()];

    let closestPos = null;
    let closestDistance = Number.MAX_VALUE;

    SupplyPlacePos.forEach((pos) => {
        const [x, y, z] = pos;
        const distance = Math.sqrt(Math.pow(x - playerPos[0], 2) + Math.pow(y - playerPos[1], 2) + Math.pow(z - playerPos[2], 2));

        if (distance < closestDistance && !placedSupply.some(stand => stand.getX() === x && stand.getY() === y && stand.getZ() === z)) {
            closestPos = pos;
            closestDistance = distance;
        }
    });

    if (closestPos !== null) {
        supplyPlaceWaypoint = closestPos;
    } else {
        supplyPlaceWaypoint = [];
    }
}).setDelay(1);

register("renderWorld", () => {
    if (!Settings.kuudraSupplyPearlHelper) return;
    if (getCurrentPhase() !== 1) return;
    if (supplyPlaceWaypoint.length === 0) return

    let [x, y, z] = supplyPlaceWaypoint;
    const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
    const distance = Math.floor(Math.sqrt(Math.pow(x - playerPos[0], 2) + Math.pow(y - playerPos[1], 2) + Math.pow(z - playerPos[2], 2)));
    const textColor = 0xFFFFFF;
    const scale = Settings.kuudraSupplyPearlHelperTextSize;
    const isShadow = true;

    if (scale > 0)
        Tessellator.drawString(`§aPearl Here [${distance}m]`, x, y + 0.5, z, textColor, true, scale, isShadow);

    renderBeaconBeam(x - 0.5, y, z - 0.5, 0, 191, 255, 0.5, false);
});

register("worldUnload", () => {
    if (!Settings.kuudraSupplyPearlHelper) return;
    supplyPlaceWaypoint = [];
});
