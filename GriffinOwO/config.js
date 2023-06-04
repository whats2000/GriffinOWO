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
        name: "Broken Hype Detect",
        description: "Toggle to detect if use hype but not get combat exp",
        category: "Crimson Island",
        subcategory: "Broken Hype"
    })
    brokenHyper = true;

    @SwitchProperty({
        name: "Vanquisher Alert",
        description: "Toggle to send the coordinate of vanquisher",
        category: "Crimson Island",
        subcategory: "Vanquisher Alert"
    })
    vanquisher = true;

    @SelectorProperty({
        name: 'Vanquisher Alert Chat',
        description: 'Select an option to send the coordinate of vanquisher',
        category: "Crimson Island",
        subcategory: "Vanquisher Alert",
        options: ['party', 'guild', 'all'],
    })
    vanquisherAlertChat = 0;

    @SwitchProperty({
        name: "Vanquisher killed Alert",
        description: "Toggle to tell vanquisher is killed",
        category: "Crimson Island",
        subcategory: "Vanquisher Alert"
    })
    vanquisherDeadAlert = true;

    @TextProperty({
        name: 'Flare Trade party IGN',
        description: 'Put player you want to reparty in other group split by space',
        category: "Crimson Island",
        subcategory: "Flare Trade",
        triggerActionOnInitialization: false,
    })
    flarePartyList = '';

    @SwitchProperty({
        name: "Recieve waypoint from chat",
        description: "Toggle to recieve waypoint from chat",
        category: "Waypoint",
        subcategory: "Recieve Waypoint"
    })
    recieveWaypoint = true;

    @SwitchProperty({
        name: "Inquis Alert",
        description: "Toggle to send the coordinate of inquis",
        category: "Diana",
        subcategory: "Inquis Alert"
    })
    inquis = true;

    @SwitchProperty({
        name: "!warp",
        description: "Toggle warp party to the leader lobby",
        category: "Trigger Command (Party)",
        subcategory: "!warp"
    })
    warp = true;

    @SliderProperty({
        name: "Delay of !warp",
        description: "The delay second to let party members leave before warp",
        category: "Trigger Command (Party)",
        subcategory: "!warp",
        min: 0,
        max: 10
    })
    warpDelay = 5;

    @SwitchProperty({
        name: "!join",
        description: "Toggle join catatombs or master catatombs by the player who send this",
        category: "Trigger Command (Party)",
        subcategory: "!join",
    })
    join = true;

    @SwitchProperty({
        name: "!allinv",
        description: "Toggle to enable/disable all invite by the player who send this",
        category: "Trigger Command (Party)",
        subcategory: "!allinv",
    })
    allinv = true;

    @SwitchProperty({
        name: "!ptme",
        description: "Toggle transfer party to the player who send this",
        category: "Trigger Command (Party)",
        subcategory: "!ptme",
    })
    ptme = true;

    @SwitchProperty({
        name: "!rp",
        description: "Toggle to send '/rp' to toggle other mod reparty function",
        category: "Trigger Command (Party)",
        subcategory: "!rp",
    })
    rp = true;

    @SwitchProperty({
        name: "!mute",
        description: "Toggle party mute by '/msg leader !mute [random text]' to fix channel in party chat",
        category: "Trigger Command (DM)",
        subcategory: "!mute",
    })
    mute = true;

    @SwitchProperty({
        name: "!party",
        description: "Toggle party invite by '/msg leader !party [random text]' to get a invite to party",
        category: "Trigger Command (DM)",
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

    @TextProperty({
        name: 'Kuudra 2/2 reparty IGN',
        description: 'Put player you want to reparty in other group split by space',
        category: "Kuudra",
        subcategory: "Kuudra 2/2 Reparty",
        triggerActionOnInitialization: false,
    })
    kuudraRepartyList = '';

    constructor() {
        this.initialize(this);
    }

    sync() {
        ChatLib.command("GriffinOWO sync", true);
    }
}

export default new Settings();