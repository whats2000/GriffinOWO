import Settings from "../../config";
import { isHoldItem } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

registerEventListener(() => Settings.TerminatorHideAnimation,
    register("renderHand", (event) => {
        if (!isHoldItem("TERMINATOR")) return;

        Player.getPlayer().field_70733_aJ = 0;
    })
);
