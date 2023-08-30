import Settings from "../../config";
import { checkInWorld } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => (Settings.decoyKilledTitle || Settings.decoyKilledMessage !== "") && checkInWorld("Dungeon"),
    register("entitydeath", (entity) => {
        if (!(entity.getName() === "Decoy ") || entity.isDead()) return;

        if (Settings.decoyKilledTitle) {
            Client.Companion.showTitle(`&aDecoy Killed`, "", 5, 25, 5);
            World.playSound("mob.villager.death", 50.0, 1.0);
        }

        if (Settings.decoyKilledMessage !== "")
            ChatLib.command(`pc ${Settings.decoyKilledMessage}`)
    })
);
