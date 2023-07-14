let phase = -1;

register('chat', () => {
    phase = 71;
}).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!");

register('chat', () => {
    phase = 72;
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.");

register('chat', () => {
    phase = 73;
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?");

register('chat', () => {
    phase = 74;
}).setCriteria("[BOSS] Necron: Finally, I heard so much about you. The Eye likes you very much.");

register('chat', () => {
    phase = 74;
}).setCriteria("[BOSS] Necron: You went further than any human before, congratulations.");

register('chat', () => {
    phase = 75;
}).setCriteria("[BOSS] Wither King: Ohhh?");

register('chat', () => {
    phase = 75;
}).setCriteria("[BOSS] Wither King: You.. again?");

register('chat', () => {
    phase = 75;
}).setCriteria("[BOSS] Wither King: You.. again?");

register("worldUnload", () => {
    phase = -1;
});

export function getDungeonPhase() {
    return phase;
}
