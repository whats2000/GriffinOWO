import Settings from "../../config";
import { checkInZone } from "../../utils/Location";
import { getDungeonPhase } from "../../utils/DungeonTracker";
import { registerEventListener } from "../../utils/EventListener";

// The revert order is depend on skip 
const DragonParticle = {
    "§a§lGreen": { x: 27, y: 19, z: 94 },
    "§5§lPurple": { x: 56, y: 19, z: 125 },
    "§b§lBlue": { x: 84, y: 19, z: 94 },
    "§6§lOrange": { x: 85, y: 19, z: 56 },
    "§c§lRed": { x: 27, y: 19, z: 59 },
}

const S2APacketParticles = Java.type("net.minecraft.network.play.server.S2APacketParticles");

/* const mapping = {
    getParticleType: (S2APacketParticles) => S2APacketParticles.func_179749_a(),
    isLongDistance: (S2APacketParticles) => S2APacketParticles.func_179750_b(),
    getXCoordinate: (S2APacketParticles) => S2APacketParticles.func_149220_d(),
    getYCoordinate: (S2APacketParticles) => S2APacketParticles.func_149226_e(),
    getZCoordinate: (S2APacketParticles) => S2APacketParticles.func_149225_f(),
    getXOffset: (S2APacketParticles) => S2APacketParticles.func_149221_g(),
    getYOffset: (S2APacketParticles) => S2APacketParticles.func_149224_h(),
    getZOffset: (S2APacketParticles) => S2APacketParticles.func_149223_i(),
    getParticleSpeed: (S2APacketParticles) => S2APacketParticles.func_149227_j(),
    getParticleCount: (S2APacketParticles) => S2APacketParticles.func_149222_k ),
    getParticleArgs: (S2APacketParticles) => S2APacketParticles.func_179748_k(),
}; */

let dragonTimer = {
    "§a§lGreen": 0,
    "§5§lPurple": 0,
    "§b§lBlue": 0,
    "§6§lOrange": 0,
    "§c§lRed": 0,
};
let color = null;

registerEventListener(() => (Settings.dragonTimer || Settings.dragonSpawnMessage || Settings.dragonSpawnTitle) && checkInZone("The Catacombs (M7)"),
    register("PacketReceived", (packet) => {
        if (getDungeonPhase() !== 75) return;
        if (!(packet instanceof S2APacketParticles)) return;

        // To filter it is dragon or fire veil wand, also filter if the dragon is alive or not
        if (packet.func_179749_a().toString() !== "FLAME" || //getParticleType
            packet.func_149220_d() % 1 !== 0.0 ||            //getXCoordinate
            packet.func_149226_e() !== 19.0 ||               //getYCoordinate
            packet.func_149225_f() % 1 !== 0.0 ||            //getZCoordinate
            packet.func_149221_g() != 2.0 ||                 //getXOffset
            packet.func_149224_h() != 3.0 ||                 //getYOffset
            packet.func_149223_i() != 2.0 ||                 //getZOffset
            packet.func_149227_j() != 0.0 ||                 //getParticleSpeed
            packet.func_149222_k() != 20) return;            //getParticleCount

        const [x, z] = [packet.func_149220_d(), packet.func_149225_f()]
        //ChatLib.chat(`[${x}, ${z}]`)
        for (let color in DragonParticle) {
            if (DragonParticle[color].x == parseInt(x) && DragonParticle[color].z == parseInt(z)) {
                if (dragonTimer[color] < Date.now()) {
                    if (Settings.dragonTimer || Settings.dragonSpawnTitle)
                        dragonTimer[color] = new Date().getTime() + 5000;

                    if (Settings.dragonSpawnMessage)
                        ChatLib.chat(`&2[GriffinOwO] &f${color} dragon is spawning soon`);
                }
            }
        }
    })
);

registerEventListener(() => (Settings.dragonTimer || Settings.dragonSpawnTitle) && checkInZone("The Catacombs (M7)"),
    register("step", () => {
        if (getDungeonPhase() !== 75) return;

        const currentTime = Date.now();
        let dragonColor = null;
        for (let color in DragonParticle) {
            if (dragonTimer[color] - currentTime > 0) {
                dragonColor = color;
            }
        }

        color = dragonColor ? dragonColor : null;
        if (!color || !Settings.dragonSpawnTitle) return;

        const time = dragonTimer[dragonColor] - currentTime;

        if (Settings.dragonSpawnTitleShowTimer) {
            const displayColor = time > 3000 ? "&a" :
                time > 1000 ? "&e" :
                    "&c"
            Client.Companion.showTitle(`${dragonColor} dragon`, `&6Spawn in ${displayColor}${time}`, 0, 2, 0);
        } else if (time > 4000) {
            Client.Companion.showTitle(`${dragonColor} Spawning`, "", 0, 2, 0);
        }
    }).setFps(1000)
);

register("worldUnload", () => {
    dragonTimer = {
        "§a§lGreen": 0,
        "§5§lPurple": 0,
        "§b§lBlue": 0,
        "§6§lOrange": 0,
        "§c§lRed": 0,
    };
    color = null;
});

export function getDragonTimeFormatted() {
    const time = ((dragonTimer[color] - Date.now()) / 1000).toFixed(2);
    return [color, time];
}
