import PogObject from "PogData";

export let userData = new PogObject("GriffinOwO", {
    firstUse: true,
    version: "2.2.7",
    gyroGUICoords: {
        x: 195,
        y: 77.5,
        scale: 1
    },
    alignmentGUICoords: {
        x: 195,
        y: 90,
        scale: 1
    },
    flareTimerCoords: {
        x: 336,
        y: 150,
        scale: 1
    },
    dragonTimerCoords: {
        x: 336,
        y: 150,
        scale: 1
    },
    foundEnigmaSouls: []
}, "UserData.json");

register("gameUnload", () => {
    userData.save();
});
