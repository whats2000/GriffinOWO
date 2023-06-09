import Settings from "../../config";

let gyroUsedTime = 0;
let alignmentTime = 0;
const gyroCooldown = 10000; // 10 seconds
const alignmentDuration = 6000; // 6 seconds

let alignmentTimeFormatted = 0;
let gyroUsedTimeFormatted = 0;

register("chat", () => {
    if (!Settings.alignmentTracker && !Settings.gyroCoolDownTracker) return;
    alignmentTime = new Date().getTime() + alignmentDuration;
    gyroUsedTime = new Date().getTime() + gyroCooldown;
}).setCriteria("You aligned ${message}");

register("chat", () => {
    if (!Settings.alignmentTracker) return;
    alignmentTime = new Date().getTime() + alignmentDuration;
}).setCriteria("${player} casted Cells Alignment on you!");

register("renderWorld", () => {
    if (!Settings.gyroCoolDownTracker) return;
    const currentTime = new Date().getTime();
    const gyroUsedTimeRemaining = Math.max(gyroUsedTime - currentTime, 0);
    gyroUsedTimeFormatted = (gyroUsedTimeRemaining / 1000).toFixed(1);
});

register("renderWorld", () => {
    if (!Settings.alignmentTracker) return;
    const currentTime = new Date().getTime();
    const alignmentTimeRemaining = Math.max(alignmentTime - currentTime, 0);
    alignmentTimeFormatted = (alignmentTimeRemaining / 1000).toFixed(1);
});

export function getGyroUsedTimeFormatted() {
    return gyroUsedTimeFormatted;
}

export function getAlignmentTimeFormatted() {
    return alignmentTimeFormatted;
}
