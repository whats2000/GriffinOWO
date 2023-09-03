import Settings from "../../config";
import { checkInWorld } from "../../utils/Location";
import { registerCommand } from "../../utils/CommandQueue";
import { registerEventListener } from "../../utils/EventListener";

const EntityPlayerMP = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP");

registerEventListener(() => Settings.inquis && checkInWorld("Hub"),
    register("Chat", () => {
        const entitis = World.getAllEntitiesOfType(EntityPlayerMP.class);

        const Inquisitors = entitis.filter(entity => entity.getName().equals("Minos Inquisitor"));

        if (Inquisitors.length === 0) return;

        Inquisitors.forEach(entity => {
            const newWaypoint = {
                x: Math.floor(entity.getX()),
                y: Math.floor(entity.getY()),
                z: Math.floor(entity.getZ()),
                name: "Inquis"
            };

            const scoreboard = Scoreboard.getLines().map(a => { return ChatLib.removeFormatting(a) });

            let location = "";

            for (let line of scoreboard) {
                if (line.includes("⏣")) {
                    location = line;
                    break;
                }
            }

            const channel = "pc";

            registerCommand(() => {
                ChatLib.command(`${channel} x: ${newWaypoint.x}, y: ${newWaypoint.y}, z: ${newWaypoint.z}`)
            });

            registerCommand(() => {
                ChatLib.command(`${channel} [!] Inquisitor is spawned at [${location} ] [!]`)
            });
        })
    }).setCriteria("${front}! You dug out a Minos Inquisitor!")
);
