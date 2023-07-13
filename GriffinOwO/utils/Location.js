let inStillgore = false;

register("chat", (time, zone) => {
    if (zone === "Stillgore Château") {
        inStillgore = true;
    }
    else
        inStillgore = false;
}).setCriteria("You used ${time} ф Rift Time to teleport to ${zone}!");

register("worldUnload", () => {
    inStillgore = false;
});

export function in_rift() {
    if (Scoreboard.getLines().find((line) => line.getName().includes("ф")) !== undefined)
        return true;

    return false;
}

export function in_stillgore() {
    return inStillgore;
}
