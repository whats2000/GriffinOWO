import Settings from "../../config";
import { checkInWorld } from "../../utils/Location";
import { romanToInt } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

let shouldDisplay = false;

const Blessing = {
    power: {
        display: "§cPower",
        regex: /Blessing of Power (.+)/,
        current: 0
    },
    time: {
        display: "§dTime",
        regex: /Blessing of Time (.+)/,
        current: 0
    },
    life: {
        display: "§eLife",
        regex: /Blessing of Life (.+)/,
        current: 0
    },
    wisdom: {
        display: "§bWisdom",
        regex: /Blessing of Wisdom (.+)/,
        current: 0
    },
    stone: {
        display: "§aStone",
        regex: /Blessing of Stone (.+)/,
        current: 0
    },
}

function resetBlessing() {
    for (let blessing in Blessing) {
        Blessing[blessing].current = 0;
    }
}

registerEventListener(() => Settings.blessingTracker && checkInWorld("Dungeon"),
    register("step", () => {
        const TabFooter = TabList?.getFooter()?.removeFormatting();
        for (let blessing in Blessing) {
            let matchBlessing = TabFooter.match(Blessing[blessing].regex);

            if (matchBlessing) {
                shouldDisplay = true;
                Blessing[blessing].current = romanToInt(matchBlessing[1]);
            }
        }
    })
);

register("worldUnload", () => {
    resetBlessing();
    shouldDisplay = false;
});

export function getBlessing() {
    return [shouldDisplay, Blessing];
}