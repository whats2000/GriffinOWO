import Settings from "../../config";
import RenderLib from "../../../RenderLib";

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


function getBlock(x, y, z) {
    let newY;
    for (let i = y; i >= 0; i--) {
        let blockat = World.getBlockAt(x, i, z);
        if (blockat.type.getID() != 0) {
            newY = parseInt(i);
            return newY;
        }
    }
}

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

register("renderWorld", () => {
    if (!Settings.flareRangeMarker) return;

    let armorstands = World.getAllEntitiesOfType(ArmorStand.class);

    armorstands.find((armorstand) => {
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

        let y = getBlock(armorstand.getX(), armorstand.getY(), armorstand.getZ());
        let [r, g, b] = type >= 0 ? FlareColors[type] : [0, 0, 0]; // Black

        if (Settings.flareRangeMarker === 2)
            // Floor
            RenderLib.drawCyl(armorstand.getX(), y + 1, armorstand.getZ(), 0, 40, 0.2, 30, 1, 0, 90, 90, r, g, b, 0.25, false, false);
        else
            // Box
            RenderLib.drawCyl(armorstand.getX(), armorstand.getY() - 40, armorstand.getZ(), 39.9, 40, 80, 30, 1, 0, 90, 90, r, g, b, 0.25, false, false);
    });
});
