import Settings from "../../config";
import { registerEventListener } from "../../utils/EventListener";

const leftClick = Client.getMinecraft().field_71474_y.field_74312_F; // net.minecraft.client.settings.GameSettings.keyBindAttack
const rightClick = Client.getMinecraft().field_71474_y.field_74313_G; // net.minecraft.client.settings.GameSettings.keyBindUseItem

// Mouse Left Click default is -100
// Mouse Right Click default is -99
registerEventListener(() => Settings.exchangeTerminatorClick,
    register("clicked", () => {
        const rightClickCode = rightClick.func_151463_i(); // rightClick.getKeyCode()

        // Check if hold correct item
        if (Player.getHeldItem()?.getName()?.includes("Terminator")) {
            // If right click code is mouse right click then invert it
            // net.minecraft.client.settings.GameSettings.setOptionKeyBinding()
            if (rightClickCode === -99) {
                Client.getMinecraft().field_71474_y.func_151440_a(leftClick, -99);
                Client.getMinecraft().field_71474_y.func_151440_a(rightClick, -100);

                // net.minecraft.client.settings.GameSettings.loadOptions()
                Client.getMinecraft().field_71474_y.func_74300_a();
            }
        }
        else {
            // if right click code is mouse left click then invert it
            if (rightClickCode === -100) {
                Client.getMinecraft().field_71474_y.func_151440_a(leftClick, -100);
                Client.getMinecraft().field_71474_y.func_151440_a(rightClick, -99);

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