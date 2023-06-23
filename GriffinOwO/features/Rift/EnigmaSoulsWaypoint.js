import Settings from "../../config";
import { getColorArray } from "../../utils/Function";
import { EnigmaSouls } from "../../utils/Variable";
import { userData } from "../../utils/UserData";
import renderBeaconBeam from "../../../BeaconBeam";

const enigmaSoulsWaypoints = EnigmaSouls;
let prevSoul = null;
let inRift = false;

function getNameCorlor(zone) {
    let color = "§b"
    switch (zone) {
        case "Wyld Woods":
            color = "§a";
            break;
        case "Black Lagoon":
            color = "§7";
            break;
        case "West Village":
            color = "§3";
            break;
        case "Dreadfarm":
            color = "§e";
            break;
        case "Village Plaza":
            color = "§6";
            break;
        case "Living Cave":
            color = "§1";
            break;
        case "Colosseum":
            color = "§b";
            break;
        case "Stillgore Ch\u00e2teau":
            color = "§c";
            break;
        default:
            color = "§b";
    }
    return color;
}

register("command", (...args) => {
    if (args == undefined) {
        ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
        ChatLib.chat("                          &6[GriffinOwO] &f&aEnigma Souls");
        ChatLib.chat(`&b/enigma on &f- Turn on Enigma Souls Waypoints`);
        ChatLib.chat(`&b/enigma off &f- Turn off Enigma Souls Waypoints`);
        ChatLib.chat(`&b/enigma remove &f[&bName of the waypoint&f] &f- Remove a Enigma Souls Waypoint`);
        ChatLib.chat(`&b/enigma clear &f- Mark all Enigma Souls Waypoint as found`);
        ChatLib.chat(`&b/enigma unclear &f- Mark all Enigma Souls Waypoint as no found`);
        ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
    }
    const subCommand = args[0] == undefined ? undefined : args[0].toLowerCase();
    const foundSouls = userData.foundEnigmaSouls;

    switch (subCommand) {
        case "on":
            ChatLib.chat(`&2[GriffinOwO] &fEnigma Souls Waypoints is &aon`);
            Settings.enigmaSouls = true;
            inRift = true;
            break;
        case "off":
            ChatLib.chat(`&2[GriffinOwO] &fEnigma Souls Waypoints is &coff`);
            Settings.enigmaSouls = false;
            break;
        case "remove":
            args.shift();
            const soulName = args.join(" ");
            const exists = enigmaSoulsWaypoints.some(waypoint => waypoint.Name === soulName);
            if (exists) {
                foundSouls.push(soulName);

                ChatLib.chat(`&2[GriffinOwO] &fEnigma Souls [&b${soulName}&f] marked as complete`);
                userData.foundEnigmaSouls = foundSouls;
                userData.save();
            } else {
                ChatLib.chat(`The soul [${soulName}] does not exist in Enigma Souls Waypoints.`);
            }
            break;
        case "clear":
            ChatLib.chat(`&2[GriffinOwO] &fAll Enigma Souls marked as found`);
            enigmaSoulsWaypoints.forEach(waypoint => {
                foundSouls.push(waypoint.Name);
            });
            userData.foundEnigmaSouls = foundSouls;
            userData.save();
            break;
        case "unclear":
            ChatLib.chat(`&2[GriffinOwO] &fAll Enigma Souls marked as not found`);
            userData.foundEnigmaSouls = [];
            userData.save();
            break;
        default:
            ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
            ChatLib.chat("                          &6[GriffinOwO] &f&aEnigma Souls");
            ChatLib.chat(`&b/enigma on &f- Turn on Enigma Souls Waypoints`);
            ChatLib.chat(`&b/enigma off &f- Turn off Enigma Souls Waypoints`);
            ChatLib.chat(`&b/enigma remove &f[&bName of the waypoint&f] &f- Remove a Enigma Souls Waypoint`);
            ChatLib.chat(`&b/enigma clear &f- Mark all Enigma Souls Waypoint as found`);
            ChatLib.chat(`&b/enigma unclear &f- Mark all Enigma Souls Waypoint as no found`);
            ChatLib.chat("&r&r&b&m--------------------------------------------------------------------------------");
            break;
    }
}).setName("enigma");

register("chat", () => {
    inRift = true;
}).setCriteria("    Your dimensional infusion has been consumed!");

register("renderWorld", () => {
    if (!Settings.enigmaSouls) return;
    if (!inRift) return;

    const foundSouls = userData.foundEnigmaSouls;

    const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
    let soulsToShow = [];

    let nearestDistance = Infinity;
    let nearestSoul = null;

    enigmaSoulsWaypoints.forEach(waypoint => {
        const found = foundSouls.includes(waypoint.Name);

        if (found) return;

        const distance = Math.floor(Math.sqrt(Math.pow(waypoint.x - playerPos[0], 2) + Math.pow(waypoint.y - playerPos[1], 2) + Math.pow(waypoint.z - playerPos[2], 2)));

        let [x, y, z] = [waypoint.x, waypoint.y, waypoint.z];

        const textColor = 0xFFFFFF;
        const scale = Settings.enigmaSoulsTextSize;
        const increase = true;
        const color = getNameCorlor(waypoint.Zone);

        if (distance < 16) {
            soulsToShow.push(waypoint);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestSoul = waypoint;
            }
        }

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

        const beaconColor = getColorArray(Settings.enigmaSoulsBeaconColor);
        if (distance < Settings.enigmaSoulsDistance)
            renderBeaconBeam(x, y, z, beaconColor[0], beaconColor[1], beaconColor[2], 1, false);

        if (!soulsToShow.length && distance < Settings.enigmaSoulsTextDistance) {
            Tessellator.drawString(`${color}${waypoint.Name} [${distance}m]`, x + 0.5, y + 0.5, z + 0.5, textColor, true, scale, increase);

            renderBeaconBeam(x, y, z, beaconColor[0], beaconColor[1], beaconColor[2], 1, false);
        }
    });

    soulsToShow.forEach(soulToShow => {
        const soulName = soulToShow.Name;
        const found = foundSouls.includes(soulName);

        if (!found && prevSoul !== nearestSoul) {
            let show_message = new Message(
                `&2[GriffinOwO] &fYouv arrive at [&b${nearestSoul.Name}&f] `,
                new TextComponent("&a[Mark As Complete]")
                    .setClick("run_command", `/enigma remove ${nearestSoul.Name}`)
                    .setHover("show_text", "Click to send"),
            );

            ChatLib.chat(show_message);
            prevSoul = nearestSoul;
        }

        if (found) return;

        const x = soulToShow.x;
        const y = soulToShow.y;
        const z = soulToShow.z;
        const distance = Math.floor(Math.sqrt(Math.pow(soulToShow.x - playerPos[0], 2) + Math.pow(soulToShow.y - playerPos[1], 2) + Math.pow(soulToShow.z - playerPos[2], 2)));

        const textColor = 0xFFFFFF;
        const scale = Settings.enigmaSoulsTextSize;
        const increase = true;
        const color = getNameCorlor(soulToShow.Zone);

        Tessellator.drawString(`§a${soulToShow["Obtaining or Requirements"]}`, x + 0.5, y - 0.75, z + 0.5, textColor, true, scale, increase);
        Tessellator.drawString(`${color}${soulToShow.Name} [${distance}m]`, x + 0.5, y + 0.5, z + 0.5, textColor, true, scale, increase);

        const beaconColor = getColorArray(Settings.enigmaSoulsBeaconColor);
        renderBeaconBeam(x, y, z, beaconColor[0], beaconColor[1], beaconColor[2], 1, false);
    });
});

register("worldUnload", () => {
    inRift = false;
});
