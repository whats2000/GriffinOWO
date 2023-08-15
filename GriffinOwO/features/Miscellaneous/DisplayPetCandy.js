import Settings from "../../config";
import { getId, getCandyUsed, addLore } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.showPetCandyUsed,
    register("itemTooltip", (lore, item, event) => {
        if (getId(item) !== "PET") return;

        const candy = getCandyUsed(item);
        if (candy === 0) return;

        const itemName = item.getName();

        addLore(item, "§6Pet Candy Used: ", `§b(${candy}/10)`);

        if (itemName.endsWith("Pet Candy Used]") || !Settings.showPetCandyUsedBehindName) return;
        item.setName(`${itemName} &f&a[${candy} Pet Candy Used]`);
    })
);
