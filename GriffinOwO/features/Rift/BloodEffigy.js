import Settings from "../../config";
import { checkInWorld, checkInZone } from "../../utils/Location";

let lastTick = 0;
let effigiesStatus = ["§c", "§c", "§c", "§c", "§c", "§c"];

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

const BloodEffigyPos = [
    [150.5, 73.90625, 95.5],
    [193.5, 87.90625, 119.5],
    [235.5, 104.90625, 147.5],
    [293.5, 90.90625, 134.5],
    [262.5, 93.90625, 94.5],
    [240.5, 123.90625, 118.5]
];

// -1 as unknow
let respawnTime = [-1, -1, -1, -1, -1, -1];

function updateState() {
    let effigiesLine = Scoreboard.getLines().find((line) => line.getName().includes("Effigies:"));
    if (effigiesLine) {
        effigiesLine = String(effigiesLine).replace("🍭", "");
        effigiesStatus = effigiesLine.replace("Effigies: ", "").split("⧯");

        effigiesStatus.forEach((status, index) => {
            if (status !== "§c") {
                respawnTime[index] = 0;
            } else if (respawnTime[index] === 0) {
                respawnTime[index] = -1;
            }
        });
    }
}

register("chat", () => {
    if (!Settings.bloodEffigy) return;
    if (!checkInZone("Stillgore Château")) return;

    setTimeout(() => {
        updateState();
    }, 1000);
}).setCriteria("You used ${time} ф Rift Time to teleport to ${zone}!");

register("chat", () => {
    if (!Settings.bloodEffigy) return;

    setTimeout(() => {
        let effigiesLine = Scoreboard.getLines().find((line) => line.getName().includes("Effigies:"));
        if (effigiesLine) {
            effigiesLine = String(effigiesLine).replace("🍭", "");
            effigiesStatus = effigiesLine.replace("Effigies: ", "").split("⧯");

            effigiesStatus.forEach((status, index) => {
                if (respawnTime[index] === 0 && status === "§c") {
                    respawnTime[index] = 1200;
                }
            });
        }
    }, 1000);
}).setCriteria("${player} broke a Blood Effigy!");

register("renderWorld", () => {
    if (!Settings.bloodEffigy) return;
    if (!checkInZone("Stillgore Château")) return;

    // Check Blood Effigy respawn time
    BloodEffigyPos.forEach((pos, index) => {
        const [x, y, z] = pos;
        const armorstands = World.getAllEntitiesOfType(ArmorStand.class);
        const bloodEffigyArmorstand = armorstands.find((armorstand) => {
            return armorstand.getX() === x && armorstand.getY() === y && armorstand.getZ() === z;
        });
        if (bloodEffigyArmorstand) {
            const name = ChatLib.removeFormatting(bloodEffigyArmorstand.getName());

            if (name) {
                const respawnTimeString = name.match(/Respawn (\d{1,2})m(\d{1,2})s/);
                if (respawnTimeString) {
                    const minutes = parseInt(respawnTimeString[1]);
                    const seconds = parseInt(respawnTimeString[2]);
                    respawnTime[index] = minutes * 60 + seconds;
                }
            }
        }
        let color = "§a";
        if (respawnTime[index] < 240)
            color = "§e";

        let display = respawnTime[index] === -1 ? "§cUnknown" :
            respawnTime[index] === 0 ? "§cExpired" :
                respawnTime[index] < 60 ? `${color}${respawnTime[index]}s` :
                    `${color}${Math.floor(respawnTime[index] / 60)}m ${respawnTime[index] % 60}s`;
        const textColor = 0xFFFFFF;
        const scale = 2;
        const increase = true;

        if (scale > 0)
            Tessellator.drawString(`${display}`, x, y + 0.5, z, textColor, true, scale, increase);

    });
});

register("step", () => {
    if (!Settings.bloodEffigy) return;
    if (!checkInWorld("The Rift")) return;
    // Update Time
    const currentTick = Math.floor(Date.now() / 1000);

    if (currentTick > lastTick) {
        lastTick = currentTick;

        respawnTime.forEach((time, index) => {
            if (time > 0) {
                respawnTime[index]--;
            } else {
                updateState();
            }
        });
    }
}).setDelay(1);

register("worldUnload", () => {
    if (!Settings.bloodEffigy) return;
    respawnTime = [-1, -1, -1, -1, -1, -1];
});
