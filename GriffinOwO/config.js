import { @Vigilant, @TextProperty, @SwitchProperty, @SliderProperty } from "Vigilance";

@Vigilant("GriffinOWO")
class Settings {
    @SwitchProperty({
        name: "!warp",
        description: "Toggle warp party to the leader lobby",
        category: "Party Sub Command",
        subcategory: "!warp"
    })
    warp = true;

    @SliderProperty({
        name: "Delay of !warp",
        description: "The delay second to let party members leave before warp",
        category: "Party Sub Command",
        subcategory: "!warp",
        min: 0,
        max: 10
    })
    warpDelay = 5;

    @SwitchProperty({
        name: "!join",
        description: "Toggle join catatombs or master catatombs by the player who send this",
        category: "Party Sub Command",
        subcategory: "!join",
    })
    join = true;

    @SwitchProperty({
        name: "!allinv",
        description: "Toggle to enable/disable all invite by the player who send this",
        category: "Party Sub Command",
        subcategory: "!allinv",
    })
    allinv = true;

    @SwitchProperty({
        name: "!ptme",
        description: "Toggle transfer party to the player who send this",
        category: "Party Sub Command",
        subcategory: "!ptme",
    })
    ptme = true;

    @SwitchProperty({
        name: "!mute",
        description: "Toggle party mute by '/msg leader !mute [random text]' to fix channel in party chat",
        category: "Party Sub Command",
        subcategory: "!mute",
    })
    mute = true;

    @SwitchProperty({
        name: "!party",
        description: "Toggle party invite by '/msg leader !party [random text]' to get a invite to party",
        category: "Party Sub Command",
        subcategory: "!party",
    })
    party = true;

    @SwitchProperty({
        name: "!rp",
        description: "Toggle to send '/rp' to toggle other mod reparty function",
        category: "Party Sub Command",
        subcategory: "!rp",
    })
    rp = true;

    @SwitchProperty({
        name: "!rng",
        description: "Toggle to get a luck number for the player who send this",
        category: "Party Sub Command",
        subcategory: "!rng",
    })
    rng = true;

    constructor() {
        this.initialize(this);
    }

    sync() {
        ChatLib.command("GriffinOWO sync", true);
    }
}

export default new Settings();