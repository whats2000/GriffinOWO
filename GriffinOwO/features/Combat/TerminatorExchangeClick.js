import Settings from "../../config";
import { isHoldItem } from "../../utils/Function";
import { registerEventListener } from "../../utils/EventListener";

let buttonDownState = false;

const leftClick = Client.getMinecraft().field_71474_y.field_74312_F; // net.minecraft.client.settings.GameSettings.keyBindAttack
const rightClick = Client.getMinecraft().field_71474_y.field_74313_G; // net.minecraft.client.settings.GameSettings.keyBindUseItem

// Mouse Left Click default is -100
// Mouse Right Click default is -99
registerEventListener(() => Settings.exchangeTerminatorClick,
    register("step", () => {
        const rightClickCode = rightClick.func_151463_i(); // rightClick.getKeyCode()

        // Only change when key is not hold (Or it will keep the hold state after swap keybind even you are not click)
        if (!isHoldItem("TERMINATOR") && rightClickCode === -100 && !buttonDownState) {
            Client.getMinecraft().field_71474_y.func_151440_a(leftClick, -100);
            Client.getMinecraft().field_71474_y.func_151440_a(rightClick, -99);

            // net.minecraft.client.settings.GameSettings.loadOptions()
            Client.getMinecraft().field_71474_y.func_74300_a();
        }
    })
);

registerEventListener(() => Settings.exchangeTerminatorClick,
    register("clicked", (mouseX, mouseY, button, isButtonDown) => {
        const rightClickCode = rightClick.func_151463_i(); // rightClick.getKeyCode()

        buttonDownState = isButtonDown;

        // Check if hold correct item
        if (isHoldItem("TERMINATOR")) {
            // If right click code is mouse right click then invert it
            // net.minecraft.client.settings.GameSettings.setOptionKeyBinding()
            if (rightClickCode === -99) {
                Client.getMinecraft().field_71474_y.func_151440_a(leftClick, -99);
                Client.getMinecraft().field_71474_y.func_151440_a(rightClick, -100);

                // net.minecraft.client.settings.GameSettings.loadOptions()
                Client.getMinecraft().field_71474_y.func_74300_a();
            }
        }
    })
);

register("gameUnload", () => {
    Client.getMinecraft().field_71474_y.func_151440_a(leftClick, -100);
    Client.getMinecraft().field_71474_y.func_151440_a(rightClick, -99);

    // net.minecraft.client.settings.GameSettings.loadOptions()
    Client.getMinecraft().field_71474_y.func_74300_a();
});