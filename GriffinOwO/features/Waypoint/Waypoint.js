import Settings from "../../config";
import { getIGN, getColorArray } from "../../utils/Function";
import renderBeaconBeam from "../../../BeaconBeam";
import { registerEventListener } from "../../utils/EventListener";

let waypoints = [];
const myIGN = getIGN(Player.getName()).toLowerCase();

function addWaypoint(x, y, z, player) {
    const newWaypoint = {
        x: parseInt(x),
        y: parseInt(y),
        z: parseInt(z),
        name: player
    };

    waypoints.push(newWaypoint);

    let show_message = new Message(
        `&2[GriffinOwO] &fYou received the coordinate [x: ${x}, y: ${y}, z: ${z}] from &b[${player}] &fand added waypoint!! `,
        new TextComponent("&a[Remove Coord] ")
            .setClick("run_command", `/griffin_remove ${player}`)
            .setHover("show_text", `Click to send /griffin_remove ${player}`),
        new TextComponent("&c[Remove All Coord]")
            .setClick("run_command", `/griffin_reset`)
            .setHover("show_text", "Click to send /griffin_reset"),
    );

    ChatLib.chat(show_message);
}

register("command", () => {
    waypoints = [];
    ChatLib.chat("&2[GriffinOwO] &fYou remove all coordinates!!");
}).setName("griffin_reset");

register("command", (name) => {
    const removedWaypoints = waypoints.filter(waypoint => waypoint.name === name);

    if (removedWaypoints.length > 0) {
        removedWaypoints.forEach(waypoint => {
            const index = waypoints.indexOf(waypoint);
            waypoints.splice(index, 1);
        });

        ChatLib.chat(`&2[GriffinOwO] &fRemoved waypoint(s) with name: &b[${name}]`);
    } else {
        ChatLib.chat(`&2[GriffinOwO] &fNo waypoint found with name: &b[${name}]`);
    }
}).setName("griffin_remove");

register("command", (x, y, z, name) => {
    if (!name) name = "Custom_Coord";
    const newWaypoint = {
        x: parseInt(x),
        y: parseInt(y),
        z: parseInt(z),
        name: name
    };
    waypoints.push(newWaypoint);

    let show_message = new Message(
        `&2[GriffinOwO] &fYou set a new coordinate at [x: ${x}, y: ${y}, z: ${z}] with the name &b[${name}] `,
        new TextComponent("&a[Remove Coord] ")
            .setClick("run_command", `/griffin_remove ${name}`)
            .setHover("show_text", "Click to send"),
        new TextComponent("&c[Remove All Coord]")
            .setClick("run_command", `/griffin_reset`)
            .setHover("show_text", "Click to send"),
    );

    ChatLib.chat(show_message);
}).setName("griffin_set_coord");

registerEventListener(() => Settings.recieveWaypoint,
    register("chat", (player, x, y, z, event) => {
        player = getIGN(player);

        if (!Settings.recieveOwnWaypoint)
            if (player.toLowerCase() === myIGN) return;

        addWaypoint(x, y, z, player);
    }).setCriteria(/^Party\s*>\s*\[.+?\]\s*(.+):\s*(?:.+?\s+)?(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+.*)?$/)
);

registerEventListener(() => Settings.recieveWaypoint,
    register("chat", (player, x, y, z, event) => {
        player = getIGN(player);

        if (!Settings.recieveOwnWaypoint)
            if (player.toLowerCase() === myIGN) return;

        addWaypoint(x, y, z, player);
    }).setCriteria(/^\[.+?\]\s*(.+):\s*(?:.+?\s+)?(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+.*)?$/)
);

registerEventListener(() => Settings.recieveWaypoint,
    register("chat", (player, x, y, z, event) => {
        player = getIGN(player);

        if (!Settings.recieveOwnWaypoint)
            if (player.toLowerCase() === myIGN) return;

        addWaypoint(x, y, z, player);
    }).setCriteria(/^From (.+): ([\d-]+) ([\d-]+) ([\d-]+)/)
);

// Support for patcher coord
registerEventListener(() => Settings.recieveWaypoint,
    register("chat", (player, x, y, z) => {
        player = getIGN(player);

        if (!Settings.recieveOwnWaypoint)
            if (player.toLowerCase() === myIGN) return;

        // Remove anything after z coords
        const spaceIndex = z.indexOf(' ');
        if (spaceIndex != -1) {
            z = z.substring(0, spaceIndex);
        }

        addWaypoint(x, y, z, player);
    }).setCriteria("${player}: x: ${x}, y: ${y}, z: ${z}")
);

// These function below is refer to slayerhelper to draw out the beacon light help by Eragon
registerEventListener(() => Settings.recieveWaypoint,
    register("renderWorld", () => {
        if (waypoints.length === 0) return;

        const player_abs_x = Math.abs(Math.round(Player.getX()));
        const player_abs_y = Math.abs(Math.round(Player.getY()));
        const player_abs_z = Math.abs(Math.round(Player.getZ()));

        waypoints.forEach(waypoint => {
            const beacon_abs_x = Math.abs(waypoint.x);
            const beacon_abs_y = Math.abs(waypoint.y);
            const beacon_abs_z = Math.abs(waypoint.z);
            const check_x = Math.abs(player_abs_x - beacon_abs_x);
            const check_y = Math.abs(player_abs_y - beacon_abs_y);
            const check_z = Math.abs(player_abs_z - beacon_abs_z);
            const index = waypoints.indexOf(waypoint);

            if (check_x < 5 && check_y < 5 && check_z < 5) {
                waypoints.splice(index, 1);
                ChatLib.chat(`&2[GriffinOwO] &fYou arrived at the coordinate &b[${waypoint.name}]&f!!`);
            } else {
                const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
                const distance = Math.floor(Math.sqrt(Math.pow(waypoint.x - playerPos[0], 2) + Math.pow(waypoint.y - playerPos[1], 2) + Math.pow(waypoint.z - playerPos[2], 2)));

                let [x, y, z] = [waypoint.x, waypoint.y, waypoint.z]

                if (distance > 200) {
                    const direction = [
                        waypoint.x - playerPos[0],
                        waypoint.y - playerPos[1],
                        waypoint.z - playerPos[2]
                    ];
                    const scaleFactor = 200 / distance;
                    x = playerPos[0] + direction[0] * scaleFactor;
                    y = playerPos[1] + direction[1] * scaleFactor;
                    z = playerPos[2] + direction[2] * scaleFactor;
                }

                const textColor = 0xFFFFFF;
                const scale = Settings.waypointTextSize;
                const increase = true;
                Tessellator.drawString(`§a[${index}] ${waypoint.name} [${distance}m]`, x + 0.5, y + 0.5, z + 0.5, textColor, true, scale, increase);

                const maxDistance = 40;
                const beamIntensity = 0.2 + distance / maxDistance;

                const beaconColor = getColorArray(Settings.waypointBeaconColor);
                renderBeaconBeam(x, y, z, beaconColor[0], beaconColor[1], beaconColor[2], beamIntensity, false);
            }
        });
    })
);

registerEventListener(() => Settings.waypointUnloadWhenSwapLobby,
    register("worldUnload", () => {
        // Prevent unload coord from Flare Trade
        if (Settings.flarePartyList === "") {
            waypoints = [];
        }
        else {
            const flarePartyMember = Settings.flarePartyList.split(" ")
                .map(player => player.toLowerCase());

            waypoints.forEach(waypoint => {
                if (!flarePartyMember.includes(waypoint.name.toLowerCase()))
                    waypoints.splice(waypoints.indexOf(waypoint), 1);
            });
        }
    })
);
