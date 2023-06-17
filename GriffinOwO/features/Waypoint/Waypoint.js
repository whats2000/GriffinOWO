import Settings from "../../config";
import renderBeaconBeam from "../../../BeaconBeam";

let waypoint = null;

register("command", () => {
    waypoint = null;
    ChatLib.chat("&2[GriffinOwO] &fYou remove the coordinate!!");
}).setName("griffin_reset");

register("command", (x, y, z) => {
    waypoint = [x, y, z].map(a => parseInt(a));
    ChatLib.chat(`&2[GriffinOwO] &fYou set the coordinate to ${x} ${y} ${z}!!`);
}).setName("griffin_set_coord");

register("Chat", (event) => {
    if (!Settings.inquis) return;

    let formatted_message = ChatLib.getChatMessage(event, true);

    if (!formatted_message.includes("&r&eYou dug out &r&2a Minos Champion&r&e!&r")) return;

    setTimeout(() => {
        waypoint[0] = Player.getX();
        waypoint[1] = Player.getY();
        waypoint[2] = Player.getZ();

        let show_message = new Message(
            "&2[GriffinOwO] &fClick to show coord to party member. ",
            new TextComponent("&a[Show coord]")
                .setClick("run_command", `/pc ` +
                    `x: ${Math.floor(Player.getX())}` +
                    `, y: ${Math.floor(Player.getY())}` +
                    `, z: ${Math.floor(Player.getZ())} [!] Inquis is dug out Warning [!]`)
                .setHover("show_text", "Click to send"),
        );

        ChatLib.chat(show_message);
    }, 300);
})

// These function below is refer to slayerhelper to draw out the beacon light which written by Eragon
register("chat", (player, x, y, z, event) => {
    if (!Settings.recieveWaypoint) return;

    waypoint = [x, y, z].map(a => parseInt(a));
    ChatLib.chat(`&2[GriffinOwO] &fYou received the coordinate [x: ${x}, y: ${y}, z: ${z}] from chat and add waypoint!!`);
}).setCriteria(/^Party\s*>\s*\[.+?\]\s*(.+):\s*(?:.+?\s+)?(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+.*)?$/)

register("chat", (player, x, y, z, event) => {
    if (!Settings.recieveWaypoint) return;

    waypoint = [x, y, z].map(a => parseInt(a));
    ChatLib.chat(`&2[GriffinOwO] &fYou received the coordinate [x: ${x}, y: ${y}, z: ${z}] from chat and add waypoint!!`);
}).setCriteria(/^From (.+): ([\d-]+) ([\d-]+) ([\d-]+)/)

// Support for patcher coord
register("chat", (player, x, y, z) => {
    if (!Settings.recieveWaypoint) return;

    // Remove anything after z coords
    const spaceIndex = z.indexOf(' ')
    if (spaceIndex != -1) {
        z = z.substring(0, spaceIndex);
    }

    waypoint = [x, y, z].map(a => parseInt(a));
    ChatLib.chat(`&2[GriffinOwO] &fYou received the coordinate [x: ${x}, y: ${y}, z: ${z}] from chat and add waypoint!!`);
}).setCriteria("${player}: x: ${x}, y: ${y}, z: ${z}");

register("renderWorld", () => {
    if (!Settings.recieveWaypoint) return;

    if (!waypoint) return

    const player_abs_x = Math.abs(Math.round(Player.getX()));
    const player_abs_y = Math.abs(Math.round(Player.getY()));
    const player_abs_z = Math.abs(Math.round(Player.getZ()));
    const beacon_abs_x = Math.abs(waypoint[0]);
    const beacon_abs_y = Math.abs(waypoint[1]);
    const beacon_abs_z = Math.abs(waypoint[2]);
    const check_x = Math.abs(player_abs_x - beacon_abs_x);
    const check_y = Math.abs(player_abs_y - beacon_abs_y);
    const check_z = Math.abs(player_abs_z - beacon_abs_z);
    if (check_x < 5 && check_y < 5 && check_z < 5) {
        waypoint = null;
        ChatLib.chat("&2[GriffinOwO] &fYou arrive to the coordinate!!");
    }

    let [x, y, z] = waypoint
    renderBeaconBeam(x, y, z, 255, 255, 0, 1, false);
})