import Settings from "../../config";
import getCurrentPhase from "../../utils/KuudraStage";
import renderBeaconBeam from "../../../BeaconBeam";
import { checkInWorld } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

const SupplyPlacePos = [
    [-98, 78.125, -112.9375],
    [-110, 78.125, -106],
    [-106, 78.125, -99.0625],
    [-94, 78.125, -106],
    [-98, 78.125, -99.0625],
    [-106, 78.125, -112.9375]
];

let buildLocationProgress = {
    "-98:-112.9375": "§c0%",
    "-110:-106": "§c0%",
    "-106:-99.0625": "§c0%",
    "-94:-106": "§c0%",
    "-98:-99.0625": "§c0%",
    "-106:-112.9375": "§c0%"
};

registerEventListener(() => Settings.kuudraBuildProgress && checkInWorld("Kuudra"),
    register("chat", () => {
        buildLocationProgress = {
            "-98:-112.9375": "§c0%",
            "-110:-106": "§c0%",
            "-106:-99.0625": "§c0%",
            "-94:-106": "§c0%",
            "-98:-99.0625": "§c0%",
            "-106:-112.9375": "§c0%"
        };
    }).setCriteria("[NPC] Elle: Not again!")
);

registerEventListener(() => Settings.kuudraBuildProgress && checkInWorld("Kuudra"),
    register("step", () => {
        if (getCurrentPhase() !== 2) return;

        const stands = World.getAllEntitiesOfType(ArmorStand.class);

        const buildSpot = stands.filter(stand => stand.getName().includes("PROGRESS:") && SupplyPlacePos.some(pos => pos[0] === stand.getX() && pos[2] === stand.getZ()));
        buildSpot.forEach(stand => {
            const name = stand.getName();
            const progress = name ? name.replace("PROGRESS: ", "") : null;

            if (progress) {
                const [x, _y, z] = [stand.getX(), stand.getY(), stand.getZ()];
                const locationKey = `${x}:${z}`;

                if (!buildLocationProgress.hasOwnProperty(locationKey)) {
                    return; // Skip current iteration if location is not in the target positions
                }

                buildLocationProgress[locationKey] = progress;
                // ChatLib.chat(`&2[GriffinOwO] &fUpdated build progress for location (${x}, ${z}): ${progress}`);
            }
        });
    }).setDelay(1)
);

registerEventListener(() => Settings.kuudraBuildProgress && checkInWorld("Kuudra"),
    register("renderWorld", () => {
        if (getCurrentPhase() !== 2) return;

        const textColor = 0xFFFFFF;
        const scale = Settings.kuudraBuildProgressTextSize * 0.1;
        const increase = false;

        Object.entries(buildLocationProgress).forEach(([locationKey, progress]) => {
            const [x, z] = locationKey.split(":").map(Number);
            //ChatLib.chat(`&2[GriffinOwO] &fBuild progress for location (${x}, ${z}): ${progress}`);
            const y = 78.125;

            if (!progress.includes('COMPLETE')) {
                if (scale > 0)
                    Tessellator.drawString(`${progress}`, x, y + 0.5, z, textColor, false, scale, increase);

                if (Settings.kuudraBuildProgressBeacon)
                    renderBeaconBeam(x - 0.5, y, z - 0.5, 0, 191, 255, 0.5, false);
            }
        });
    })
);

registerEventListener(() => Settings.kuudraBuildProgress,
    register("worldUnload", () => {
        if (!Settings.kuudraBuildProgress) return;

        buildLocationProgress = {
            "-98:-112.9375": "§c0%",
            "-110:-106": "§c0%",
            "-106:-99.0625": "§c0%",
            "-94:-106": "§c0%",
            "-98:-99.0625": "§c0%",
            "-106:-112.9375": "§c0%"
        };
    })
);
