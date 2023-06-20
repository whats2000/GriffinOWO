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

let buildLocationProgress = [];

register("chat", () => {
    if (!Settings.kuudraBuildProgress) return;

    buildLocationProgress = [];
}).setCriteria("[NPC] Elle: Not again!");

register("step", () => {
    if (!Settings.kuudraBuildProgress) return;
    if (getCurrentPhase() !== 2) return;

    const stands = World.getAllEntitiesOfType(ArmorStand.class);

    const buildSpot = stands.filter(stand => stand.getName().includes('PROGRESS:'));
    buildSpot.forEach(stand => {
        const name = stand.getName();
        const progress = name ? name.replace("PROGRESS: ", "") : null;

        if (progress) {
            const [x, y, z] = [stand.getX(), stand.getY(), stand.getZ()];
            const locationKey = `${x}:${z}`;

            const isValidLocation = SupplyPlacePos.some(pos => pos[0] === x && pos[2] === z);
            if (!isValidLocation) return;

            const existingBuildLocation = buildLocationProgress.find(location => location.key === locationKey);
            if (existingBuildLocation) {
                existingBuildLocation.progress = progress;
                //ChatLib.chat(`&2[GriffinOwO] &fUpdated build progress for location (${x}, ${z}): ${progress}`);
            } else {
                const newBuildLocation = {
                    key: locationKey,
                    x: parseInt(x),
                    y: parseInt(y),
                    z: parseInt(z),
                    progress: progress
                };

                buildLocationProgress.push(newBuildLocation);
                //ChatLib.chat(`&2[GriffinOwO] &fAdded new build location (${x}, ${z}): ${progress}`);
            }
        }
    });
}).setDelay(1);


register("renderWorld", () => {
    if (!Settings.kuudraBuildProgress) return;
    if (getCurrentPhase() !== 2) return;
    if (buildLocationProgress.length === 0) return;

    const textColor = 0xFFFFFF;
    const scale = Settings.kuudraBuildProgressTextSize * 0.02;
    const increase = false;

    buildLocationProgress.forEach(location => {
        const [x, y, z, progress] = [location.x, location.y, location.z, location.progress];
        //ChatLib.chat(`&2[GriffinOwO] &f${[x, y, z, progress]}`);

        if (!progress.includes('COMPLETE')) {
            if (scale > 0)
                Tessellator.drawString(`${progress}`, x, y + 0.5, z, textColor, false, scale, increase);

            if (Settings.kuudraBuildProgressBeacon)
                renderBeaconBeam(x - 0.5, y, z - 0.5, 0, 191, 255, 0.5, false);
        }
    });
});

register("worldUnload", () => {
    if (!Settings.kuudraBuildProgress) return;

    buildLocationProgress = [];
});
