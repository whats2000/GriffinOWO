import Settings from "../../config";
import { getId, getCandyUsed } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.showPetCandyUsed,
    register("itemTooltip", (lore, item, event) => {
        if (getId(item) !== "PET") return;

        const candy = getCandyUsed(item);
        if (candy === 0) return;

        const itemName = item.getName();
        if (itemName.endsWith("]")) return;

        item.setName(`${itemName} &f&a[${candy} Pet Candy Used]`);
    })
);
