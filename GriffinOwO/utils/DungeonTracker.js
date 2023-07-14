import { checkInZone } from "../utils/Location";
import { registerEventListener } from "../utils/EventListener";

let phase = -1;

registerEventListener(() => checkInZone("The Catac🍭ombs (M7)") || checkInZone("The Catac🍭ombs (F7)"),
    register('chat', () => {
        phase = 71;
    }).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!")
);

registerEventListener(() => checkInZone("The Catac🍭ombs (M7)") || checkInZone("The Catac🍭ombs (F7)"),
    register('chat', () => {
        phase = 72;
    }).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")
);

registerEventListener(() => checkInZone("The Catac🍭ombs (M7)") || checkInZone("The Catac🍭ombs (F7)"),
    register('chat', () => {
        phase = 73;
    }).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")
);

registerEventListener(() => checkInZone("The Catac🍭ombs (M7)") || checkInZone("The Catac🍭ombs (F7)"),
    register('chat', () => {
        phase = 74;
    }).setCriteria("[BOSS] Necron: Finally, I heard so much about you. The Eye likes you very much.")
);

registerEventListener(() => checkInZone("The Catac🍭ombs (M7)") || checkInZone("The Catac🍭ombs (F7)"),
    register('chat', () => {
        phase = 74;
    }).setCriteria("[BOSS] Necron: You went further than any human before, congratulations.")
);

registerEventListener(() => checkInZone("The Catac🍭ombs (M7)") || checkInZone("The Catac🍭ombs (F7)"),
    register('chat', () => {
        phase = 75;
    }).setCriteria("[BOSS] Wither King: Ohhh?")
);

registerEventListener(() => checkInZone("The Catac🍭ombs (M7)") || checkInZone("The Catac🍭ombs (F7)"),
    register('chat', () => {
        phase = 75;
    }).setCriteria("[BOSS] Wither King: You.. again?")
);

registerEventListener(() => checkInZone("The Catac🍭ombs (M7)") || checkInZone("The Catac🍭ombs (F7)"),
    register('chat', () => {
        phase = 75;
    }).setCriteria("[BOSS] Wither King: You.. again?")
);

register("worldUnload", () => {
    phase = -1;
});

export function getDungeonPhase() {
    return phase;
}
