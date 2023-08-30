import Settings from "../../config";
import { getPlayerClass } from "../../utils/DungeonTracker";
import { checkInZone } from "../../utils/Location";
import { registerEventListener } from "../../utils/EventListener";

let isEnrage = false;

function sendWishAlert() {
    if (getPlayerClass() !== 3) {
        if (Settings.healerWishMessage !== "")
            ChatLib.command(`pc ${Settings.healerWishMessage}`);
    } else {
        Client.Companion.showTitle(`&6&lWish`, "", 5, 25, 5);
        World.playSound("note.pling", 100.0, 1.0);
    }
}

registerEventListener(() => (Settings.healerWishTitle || Settings.healerWishMessage !== "") && (checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)")),
    register("chat", (event) => {
        if (isEnrage) return;
        const message = ChatLib.getChatMessage(event, true).removeFormatting();

        if (!message.includes("⚠ Maxor is enraged! ⚠")) return;

        sendWishAlert();
        isEnrage = true;
    })
);

registerEventListener(() => (Settings.healerWishTitle || Settings.healerWishMessage !== "") && (checkInZone("The Catacombs (M7)") || checkInZone("The Catacombs (F7)")),
    register("chat", (event) => {
        const message = ChatLib.getChatMessage(event, true).removeFormatting();

        if (!message.includes("[BOSS] Goldor: You have done it, you destroyed the factory…")) return;

        sendWishAlert();
    })
);

registerEventListener(() => (Settings.healerWishTitle || Settings.healerWishMessage !== "") && (checkInZone("The Catacombs (M6)") || checkInZone("The Catacombs (F6)")),
    register("chat", (event) => {
        const message = ChatLib.getChatMessage(event, true).removeFormatting();

        if (!message.includes("[BOSS] Sadan: My giants! Unleashed!")) return;

        setTimeout(() => {
            sendWishAlert();
        }, 3000);
    })
);

register("worldLoad", () => {
    isEnrage = false;
});
