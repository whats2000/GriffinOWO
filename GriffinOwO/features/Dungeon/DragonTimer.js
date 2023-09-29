import Settings from "../../config";
import { checkInZone } from "../../utils/Location";
import { getBlessing } from "./BlessingDisplay";
import { getDungeonPhase, getPlayerClass } from "../../utils/DungeonTracker";
import { registerEventListener } from "../../utils/EventListener";

// The revert order is depend on skip 
const DragonParticle = {
    "§a§lGreen": { x: 27, y: 19, z: 94 },
    "§5§lPurple": { x: 56, y: 19, z: 125 },
    "§b§lBlue": { x: 84, y: 19, z: 94 },
    "§6§lOrange": { x: 85, y: 19, z: 56 },
    "§c§lRed": { x: 27, y: 19, z: 59 },
}

// Order for Archer, Healer, Tank
const SplitOrder1 = {
    "§b§lBlue": { x: 84, y: 19, z: 94 },
    "§c§lRed": { x: 27, y: 19, z: 59 },
    "§a§lGreen": { x: 27, y: 19, z: 94 },
    "§6§lOrange": { x: 85, y: 19, z: 56 },
    "§5§lPurple": { x: 56, y: 19, z: 125 },
}

// Revert Order for Berserk, Mage
const SplitOrder2 = {
    "§5§lPurple": { x: 56, y: 19, z: 125 },
    "§6§lOrange": { x: 85, y: 19, z: 56 },
    "§a§lGreen": { x: 27, y: 19, z: 94 },
    "§c§lRed": { x: 27, y: 19, z: 59 },
    "§b§lBlue": { x: 84, y: 19, z: 94 },
}

const S2APacketParticles = Java.type("net.minecraft.network.play.server.S2APacketParticles");
const modes = ["single", "split", "auto-select"];
const modeSwitchKeyBind = Client.getKeyBindFromKey(Keyboard.KEY_Y, "Cycle Dragon Timer Mode");

let dragonTimer = {
    "§a§lGreen": 0,
    "§5§lPurple": 0,
    "§b§lBlue": 0,
    "§6§lOrange": 0,
    "§c§lRed": 0,
};

let color = null;
let dragonOrder = DragonParticle;

function selectSplitOrder() {
    return (getPlayerClass() === 1 || getPlayerClass() === 3 || getPlayerClass() === 4) ? SplitOrder1 : SplitOrder2
}

function selectTimerMode() {
    switch (Settings.dragonTimerMode) {
        case 0:
            return DragonParticle;
        case 1:
            return selectSplitOrder();
        case 2:
            const Blessing = getBlessing();

            if (Blessing[0] && (Blessing[1].power.current + 1 / 2 * Blessing[1].time.current) >= Settings.dragonTimerPowerSelect) {
                ChatLib.chat(`&2[GriffinOwO] &fPower ${(Blessing[1].power.current + 1 / 2 * Blessing[1].time.current)} use split mode`);

                if (Settings.dragonTimerModeMessage)
                    ChatLib.command(`pc Power is ${(Blessing[1].power.current + 1 / 2 * Blessing[1].time.current)} use split`);
                return selectSplitOrder();
            } else {
                ChatLib.chat(`&2[GriffinOwO] &fPower ${(Blessing[1].power.current + 1 / 2 * Blessing[1].time.current)} use single mode`);

                if (Settings.dragonTimerModeMessage)
                    ChatLib.command(`pc Power is ${(Blessing[1].power.current + 1 / 2 * Blessing[1].time.current)} use single`);
                return DragonParticle;
            }
        default:
            return DragonParticle;
    }
}

function resetTimer() {
    dragonTimer = {
        "§a§lGreen": 0,
        "§5§lPurple": 0,
        "§b§lBlue": 0,
        "§6§lOrange": 0,
        "§c§lRed": 0,
    };

    color = null;
}

registerEventListener(() => (Settings.dragonTimer || Settings.dragonSpawnTitle),
    register("renderWorld", () => {
        if (!modeSwitchKeyBind.isPressed()) return;

        const currentModeIndex = (Settings.dragonTimerMode + 1) % modes.length;
        const newMode = modes[currentModeIndex];
        Settings.dragonTimerMode = currentModeIndex;
        ChatLib.chat(`&2[GriffinOwO] &fDragon Timer Mode: &a&l${newMode}`);
    })
);

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

        for (let color in dragonOrder) {
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

        for (let color in dragonOrder) {
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
                    "&c";
            Client.Companion.showTitle(`${dragonColor} dragon`, `&6Spawn in ${displayColor}${time}`, 0, 2, 0);
        } else if (time > 4000) {
            Client.Companion.showTitle(`${dragonColor} Spawning`, "", 0, 2, 0);
        }
    }).setFps(1000)
);

// Reset Timer
registerEventListener(() => (Settings.dragonTimer || Settings.dragonSpawnTitle) && checkInZone("The Catacombs (M7)"),
    register("chat", () => {
        resetTimer();
        dragonOrder = selectTimerMode();
    }).setCriteria("[BOSS] Wither King: Ohhh?")
);

registerEventListener(() => (Settings.dragonTimer || Settings.dragonSpawnTitle) && checkInZone("The Catacombs (M7)"),
    register("chat", () => {
        resetTimer();
        dragonOrder = selectTimerMode();
    }).setCriteria("[BOSS] Wither King: You.. again?")
);

export function getDragonTimeFormatted() {
    const time = ((dragonTimer[color] - Date.now()) / 1000).toFixed(2);
    return [color, time];
}
