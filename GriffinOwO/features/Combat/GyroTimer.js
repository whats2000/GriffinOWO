import Settings from "../../config";
import { getCdReduce } from "../../utils/DungeonTracker";
import { registerEventListener } from "../../utils/EventListener";

let gyroUsedTime = 0;
let alignmentTime = 0;
const gyroCooldown = 10000; // 10 seconds
const alignmentDuration = 6000; // 6 seconds

let alignmentTimeFormatted = 0;
let gyroUsedTimeFormatted = 0;

registerEventListener(() => Settings.alignmentTracker || Settings.gyroCoolDownTracker,
    register("chat", () => {
        alignmentTime = new Date().getTime() + alignmentDuration;
        gyroUsedTime = new Date().getTime() + gyroCooldown * getCdReduce();
    }).setCriteria("You aligned ${message}")
);

registerEventListener(() => Settings.alignmentTracker,
    register("chat", () => {
        alignmentTime = new Date().getTime() + alignmentDuration;
    }).setCriteria("${player} casted Cells Alignment on you!")
);

registerEventListener(() => Settings.gyroCoolDownTracker,
    register("step", () => {
        const currentTime = new Date().getTime();
        const gyroUsedTimeRemaining = Math.max(gyroUsedTime - currentTime, 0);
        gyroUsedTimeFormatted = (gyroUsedTimeRemaining / 1000).toFixed(1);
    })
);

registerEventListener(() => Settings.alignmentTracker,
    register("step", () => {
        const currentTime = new Date().getTime();
        const alignmentTimeRemaining = Math.max(alignmentTime - currentTime, 0);
        alignmentTimeFormatted = (alignmentTimeRemaining / 1000).toFixed(1);
    })
);

export function getGyroUsedTimeFormatted() {
    return gyroUsedTimeFormatted;
}

export function getAlignmentTimeFormatted() {
    return alignmentTimeFormatted;
}
