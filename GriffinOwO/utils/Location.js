import { registerEventListener, updateEventListeners } from '../utils/EventListener';

let currentWorld = "Unknown";
let currentZone = "Unknown";
let worldRetryCount = 0;
let zoneRetryCount = 0;

function updateZone() {
    const ZoneLine = Scoreboard.getLines().find((line) => line.getName().includes("⏣") || line.getName().includes("ф"));

    if (ZoneLine) {
        currentZone = ZoneLine.getName().replace("⏣ ", "").replace("ф ", "").removeFormatting();

        if (currentZone.includes("None")) {
            zoneRetryCount++;
            setTimeout(updateZone, 1000);
        }

        if (currentZone.includes("The Catac🍭ombs"))
            currentWorld = "Dungeon";

        //ChatLib.chat(`Current world: ${currentWorld}`);
        //ChatLib.chat(`Current zone: ${currentZone}`);

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
        updateZone();
        zoneRetryCount = 0;
    } else {
        worldRetryCount++;
        if (worldRetryCount < 10) {
            setTimeout(checkCurrentWorld, 1000);
        } else {
            currentWorld = "Unknown";
            updateZone();
            //ChatLib.chat("Failed to get current world after multiple attempts.");
        }
    }
};

register("worldLoad", () => {
    worldRetryCount = 0;
    checkCurrentWorld();
});

registerEventListener(() => checkInWorld("The Rift"),
    register("chat", (time, zone) => {
        currentZone = zone;
        updateEventListeners();
    }).setCriteria("You used ${time} ф Rift Time to teleport to ${zone}!")
);

register("worldUnload", () => {
    currentZone = "unknow";
});

export function checkInWorld(world) {
    return currentWorld === world;
}

export function checkInZone(zone) {
    return currentZone === zone;
}
