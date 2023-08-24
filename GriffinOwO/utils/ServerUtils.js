const S03PacketTimeUpdate = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate");

let prevTime = 0;
let averageTps = 20.0;
let tps = 20.0;

register("worldLoad", () => {
    prevTime = 0;
    averageTps = 20.0;
});

register("packetReceived", (packet) => {
    if (!(packet instanceof S03PacketTimeUpdate)) return;

    tps = 20000 / (Date.now() - prevTime + 1);
    tps = tps > 20 ? 20.0 :
        tps < 0 ? 0.0 :
            tps;

    if (prevTime !== 0) {
        averageTps = tps * 0.182 + averageTps * 0.818;
    }

    prevTime = Date.now();
});

export function getAverageTps() {
    return averageTps;
}

export function getTps() {
    return tps;
}
