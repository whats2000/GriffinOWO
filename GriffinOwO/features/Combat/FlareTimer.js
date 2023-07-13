import Settings from "../../config";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

const Flare = [
    "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMwNjIyMywKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjJlMmJmNmMxZWMzMzAyNDc5MjdiYTYzNDc5ZTU4NzJhYzY2YjA2OTAzYzg2YzgyYjUyZGFjOWYxYzk3MTQ1OCIKICAgIH0KICB9Cn0",
    "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMyNjQzMiwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOWQyYmY5ODY0NzIwZDg3ZmQwNmI4NGVmYTgwYjc5NWM0OGVkNTM5YjE2NTIzYzNiMWYxOTkwYjQwYzAwM2Y2YiIKICAgIH0KICB9Cn0",
    "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzM0NzQ4OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzAwNjJjYzk4ZWJkYTcyYTZhNGI4OTc4M2FkY2VmMjgxNWI0ODNhMDFkNzNlYTg3YjNkZjc2MDcyYTg5ZDEzYiIKICAgIH0KICB9Cn0"
];

const FlareColors = [
    [0.56, 0.93, 0.56], // Light Green
    [0.68, 0.84, 0.91], // Light Blue
    [0.50, 0, 0.50],    // Purple
];

let flare = {
    type: -1,
    time: 0
};
let inFlareRange = false;

register("step", () => {
    if (!Settings.flareTimer) return;

    const armorstands = World.getAllEntitiesOfType(ArmorStand.class);
    inFlareRange = false;

    flare = {
        type: -1,
        time: 0
    };

    armorstands.find((armorstand) => {
        const playerPos = [Player.getX(), Player.getY(), Player.getZ()];
        const [x, y, z] = [armorstand.getX(), armorstand.getY(), armorstand.getZ()];
        const distance = Math.floor(Math.sqrt(Math.pow(x - playerPos[0], 2) + Math.pow(y - playerPos[1], 2) + Math.pow(z - playerPos[2], 2)));

        if (distance > 40 || armorstand.getTicksExisted() > 3600) return;

        let as = new EntityLivingBase(armorstand.getEntity());
        let head = as.getItemInSlot(4)?.getRawNBT();

        if (!head) return;

        let type = -1;

        for (let i = 0; i < Flare.length; i++) {
            if (head.includes(Flare[i])) {
                type = i;
                break;
            }
        }

        if (type === -1) return;

        inFlareRange = true;
        const flareTime = parseInt(180 - armorstand.getTicksExisted() / 20);

        if (type > flare.type) {
            flare.type = type;
            flare.time = flareTime;
        } else if (type === flare.type && flareTime > flare.time) {
            flare.time = flareTime;
        }
    });
});

register("worldUnload", () => {
    if (!Settings.flareTimer) return;

    flare = {
        type: -1,
        time: 0
    };
});

export function getFlareTimeFormatted() {
    let displayType = "Unknow";
    switch (flare.type) {
        case 0:
            displayType = "&a&lWarning"
            break;
        case 1:
            displayType = "&1&lAlert"
            break;
        case 2:
            displayType = "&5&lSOS"
            break;
        default:
            displayType = "Unknow";
            break;
    }

    if (inFlareRange)
        return [displayType, flare.time]
    else
        return ["Unknow", -1]
}