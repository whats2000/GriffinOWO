import { updateEventListeners } from '../utils/EventListener';

let currentWorld = "Unknown";
let currentZone = "Unknown";
let worldRetryCount = 0;
let zoneRetryCount = 0;

function updateZone() {
    const ZoneLine = Scoreboard.getLines().find((line) => line.getName().includes("⏣") || line.getName().includes("ф"));

    if (ZoneLine) {
        currentZone = ZoneLine.getName().replace("⏣ ", "").replace("ф ", "").removeFormatting();
        ChatLib.chat(`Updated zone: ${currentZone}`);
        updateEventListeners();
    } else {
        zoneRetryCount++;
        if (zoneRetryCount < 10) {
            setTimeout(updateZone, 1000);
        } else {
            currentZone = "Unknown";
            //ChatLib.chat("Failed to get current zone after multiple attempts.");
        }
    }
}

function checkCurrentWorld() {
    const WorldLine = TabList.getNames().find(tab => tab.includes("Area"));
    if (WorldLine) {
        currentWorld = WorldLine.replace("Area: ", "").removeFormatting();
        ChatLib.chat(`Current world: ${currentWorld}`);
        updateZone();
        zoneRetryCount = 0;
    } else {
        worldRetryCount++;
        if (worldRetryCount < 10) {
            setTimeout(checkCurrentWorld, 1000);
        } else {
            currentWorld = "Unknown";
            //ChatLib.chat("Failed to get current world after multiple attempts.");
        }
    }
};

register("worldLoad", () => {
    worldRetryCount = 0;
    checkCurrentWorld();
});

register("chat", (time, zone) => {
    currentZone = zone;
}).setCriteria("You used ${time} ф Rift Time to teleport to ${zone}!");

register("worldUnload", () => {
    currentZone = "unknow";
});

export function checkInWorld(world) {
    return currentWorld === world;
}

export function checkInZone(zone) {
    return currentZone === zone;
}
