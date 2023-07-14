import Settings from "../../config";
import RenderLib from "../../../RenderLib";
import { getColorArray } from "../../utils/Function";
import { checkInZone } from "../../utils/Location";

const Cadaver = "ewogICJ0aW1lc3RhbXAiIDogMTY3NzUwNDQ5NTIxOSwKICAicHJvZmlsZUlkIiA6ICJlMWFmMzI1NzM4MjU0MDE1YTYyZDZmZmFhY2U1YTIyNCIsCiAgInByb2ZpbGVOYW1lIiA6ICJfcHZwU21hc2hfIiwKICAic2lnbmF0dXJlUmVxdWlyZWQiIDogdHJ1ZSwKICAidGV4dHVyZXMiIDogewogICAgIlNLSU4iIDogewogICAgICAidXJsIiA6ICJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlLzVlZTkzNWIxNWExODdjMjMzZTRkMTczZWU2MjFjMTYyYTI4OTFjNTc1ODI1MGIxNzFjZDM2Y2I3MmNhYjYzMiIsCiAgICAgICJtZXRhZGF0YSIgOiB7CiAgICAgICAgIm1vZGVsIiA6ICJzbGltIgogICAgICB9CiAgICB9CiAgfQp9";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

register("renderWorld", () => {
    if (!Settings.cadaverMarker) return;
    if (!checkInZone("Stillgore Château")) return;

    let armorstands = World.getAllEntitiesOfType(ArmorStand.class);

    armorstands.find((armorstand) => {
        let as = new EntityLivingBase(armorstand.getEntity());
        let head = as.getItemInSlot(4)?.getRawNBT();

        if (!head) return;

        if (!head.includes(Cadaver)) return;

        const [x, y, z] = [armorstand.getX(), armorstand.getY(), armorstand.getZ()];
        const [r, g, b, a] = getColorArray(Settings.cadaverMarkerColor);
        RenderLib.drawInnerEspBox(x, y + 1.35, z, 0.75, 0.75, r / 255, g / 255, b / 255, a / 255, false);
    });
});
