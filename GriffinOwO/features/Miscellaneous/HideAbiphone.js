import Settings from "../../config";
import { registerEventListener } from "../../utils/EventListener";

let ringingCancel = false;

function isNpcInHideList(npcName) {
    const hideAbiphone = Settings.hideAbiphone ? Settings.hideAbiphone.toLowerCase().split(" ") : [];
    return hideAbiphone.includes(npcName.toLowerCase());
}

registerEventListener(() => Settings.hideAbiphone !== "",
    register("chat", (name, event) => {
        if (name && isNpcInHideList(name)) {
            event.cancel();
            //ChatLib.chat(`&2[GriffinOwO] &fHide ${name} contact`);
            ringingCancel = true;
            setTimeout(() => {
                ringingCancel = false;
            }, 5000);
        }
    }).setCriteria("✆ ${name} ✆ ")
);

registerEventListener(() => Settings.hideAbiphone !== "",
    register("chat", (front, event) => {
        if (ringingCancel) {
            event.cancel();
        }
    }).setCriteria("✆ ${front} [PICK UP]")
);

registerEventListener(() => Settings.hideAbiphone !== "",
    register("soundPlay", (pos, name, vol, pitch, category, event) => {
        if (name.equals("note.pling") && ringingCancel) {
            event.cancel();
        }
    })
);
