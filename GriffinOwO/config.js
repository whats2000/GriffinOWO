import { @Vigilant, @TextProperty, @SwitchProperty, @SliderProperty, @SelectorProperty } from "Vigilance";

@Vigilant("GriffinOWO")
class Settings {
    @SwitchProperty({
        name: "Blacklist Mode",
        description: "Note : if player both on whitelist and blacklist will take blacklist ",
        category: "Blacklist and Whitelist",
        subcategory: "Blacklist Mode"
    })
    blacklist = true;

    @TextProperty({
        name: 'Blacklist IGN',
        description: 'Put player you want put on blacklist split by space',
        category: "Blacklist and Whitelist",
        subcategory: "Blacklist Mode",
        triggerActionOnInitialization: false,
    })
    blacklistIGN = '';

    @SwitchProperty({
        name: "Whitelist Mode",
        description: "Note : if player both on whitelist and blacklist will take blacklist",
        category: "Blacklist and Whitelist",
        subcategory: "Whitelist Mode"
    })
    whitelist = false;

    @TextProperty({
        name: 'Whitelist IGN',
        description: 'Put player you want put on whitelist split by space',
        category: "Blacklist and Whitelist",
        subcategory: "Whitelist Mode",
        triggerActionOnInitialization: false,
    })
    whitelistIGN = '';

    @SwitchProperty({
        name: "Recieve waypoint from chat",
        description: "Toggle to recieve waypoint from chat",
        category: "Waypoint and Send Coordinate",
        subcategory: "Recieve Waypoint"
    })
    recieveWaypoint = true;

    @SwitchProperty({
        name: "Vanquisher Alert",
        description: "Toggle to send the coordinate of vanquisher",
        category: "Waypoint and Send Coordinate",
        subcategory: "Vanquisher Alert"
    })
    vanquisher = true;

    @SelectorProperty({
        name: 'Vanquisher Alert Chat',
        description: 'Select an option to send the coordinate of vanquisher',
        category: "Waypoint and Send Coordinate",
        subcategory: "Vanquisher Alert",
        options: ['party', 'guild', 'all'],
    })
    vanquisherAlertChat = 0;

    @SwitchProperty({
        name: "Vanquisher killed Alert",
        description: "Toggle to tell vanquisher is killed",
        category: "Waypoint and Send Coordinate",
        subcategory: "Vanquisher Alert"
    })
    vanquisherDeadAlert = true;

    @SwitchProperty({
        name: "Inquis Alert",
        description: "Toggle to send the coordinate of inquis",
        category: "Waypoint and Send Coordinate",
        subcategory: "Inquis Alert"
    })
    inquis = true;

    @SwitchProperty({
        name: "!warp",
        description: "Toggle warp party to the leader lobby",
        category: "Party Chat Trigger Command",
        subcategory: "!warp"
    })
    warp = true;

    @SliderProperty({
        name: "Delay of !warp",
        description: "The delay second to let party members leave before warp",
        category: "Party Chat Trigger Command",
        subcategory: "!warp",
        min: 0,
        max: 10
    })
    warpDelay = 5;

    @SwitchProperty({
        name: "!join",
        description: "Toggle join catatombs or master catatombs by the player who send this",
        category: "Party Chat Trigger Command",
        subcategory: "!join",
    })
    join = true;

    @SwitchProperty({
        name: "!allinv",
        description: "Toggle to enable/disable all invite by the player who send this",
        category: "Party Chat Trigger Command",
        subcategory: "!allinv",
    })
    allinv = true;

    @SwitchProperty({
        name: "!ptme",
        description: "Toggle transfer party to the player who send this",
        category: "Party Chat Trigger Command",
        subcategory: "!ptme",
    })
    ptme = true;

    @SwitchProperty({
        name: "!rp",
        description: "Toggle to send '/rp' to toggle other mod reparty function",
        category: "Party Chat Trigger Command",
        subcategory: "!rp",
    })
    rp = true;

    @SwitchProperty({
        name: "!mute",
        description: "Toggle party mute by '/msg leader !mute [random text]' to fix channel in party chat",
        category: "DM Trigger Command",
        subcategory: "!mute",
    })
    mute = true;

    @SwitchProperty({
        name: "!party",
        description: "Toggle party invite by '/msg leader !party [random text]' to get a invite to party",
        category: "DM Trigger Command",
        subcategory: "!party",
    })
    party = true;

    @SwitchProperty({
        name: "!rng",
        description: "Toggle to get a luck number for the player who send this",
        category: "Fun Command",
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