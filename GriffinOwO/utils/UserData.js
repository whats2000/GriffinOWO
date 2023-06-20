import PogObject from "PogData";

export let userData = new PogObject("GriffinOwO", {
    firstUse: true
}, "UserData.json");

register("gameUnload", () => {
    userData.save();
});
