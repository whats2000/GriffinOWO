export function in_rift() {
    if (Scoreboard.getLines().find((line) => line.getName().includes("ф")) !== undefined)
        return true;

    return false;
}
