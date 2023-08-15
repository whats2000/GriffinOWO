import Settings from "../../config";
import { getId, getPetXP, getPetType, formatNumber, addLore } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.showPetXP,
    register("itemTooltip", (lore, item, event) => {
        if (getId(item) !== "PET") return;

        const PetXP = getPetXP(item);
        const MaxXP = getPetType(item) === "GOLDEN_DRAGON" ? 210255385 : 25353230;

        let displayText = `§b${formatNumber(PetXP)}`;

        if (PetXP >= MaxXP && Settings.showPetXPOverflow) {
            displayText += ` §e(Overflow: ${(PetXP / MaxXP * 100).toFixed(2)}%)`;
        }
        if (PetXP < MaxXP && Settings.showPetXPToMaxLevel) {
            displayText += ` §e(To Max Need: ${formatNumber(MaxXP - PetXP)})`;
        }
        addLore(item, "§6Pet Xp: ", displayText);
    })
);
