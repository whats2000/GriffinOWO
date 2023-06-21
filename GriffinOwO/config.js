import { @Vigilant, @ButtonProperty, @TextProperty, @SwitchProperty, @DecimalSliderProperty @SliderProperty, @SelectorProperty, @ColorProperty, Color } from "Vigilance";

@Vigilant("GriffinOWO", "Some people call it iahnaddons", {
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ["Whitelist Mode", "Kick Not Welcome Player", "Transfer Back Not Welcome Player"];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    }
})
class Settings {
    gyroGUI = new Gui()
    alignmentGUI = new Gui()

    @SwitchProperty({
        name: "Blacklist Mode",
        description: "Note : if player both on whitelist and blacklist will take blacklist ",
        category: "Blacklist and Whitelist",
        subcategory: "Blacklist Mode"
    })
    blacklist = true;

    @TextProperty({
        name: "Blacklist IGN",
        description: "Put player you want put on blacklist split by space",
        category: "Blacklist and Whitelist",
        subcategory: "Blacklist Mode",
        triggerActionOnInitialization: false,
    })
    blacklistIGN = "";

    @SwitchProperty({
        name: "Whitelist Mode",
        description: "Note : if player both on whitelist and blacklist will take blacklist",
        category: "Blacklist and Whitelist",
        subcategory: "Whitelist Mode"
    })
    whitelist = false;

    @TextProperty({
        name: "Whitelist IGN",
        description: "Put player you want put on whitelist split by space",
        category: "Blacklist and Whitelist",
        subcategory: "Whitelist Mode",
        triggerActionOnInitialization: false,
    })
    whitelistIGN = "";

    @SwitchProperty({
        name: "Kick Not Welcome Player",
        description: "Kick if the player is not in the whitelist or the player is in the blacklist",
        category: "Blacklist and Whitelist",
        subcategory: "Kick Not Welcome Player"
    })
    kickNotWelcomePlayer = false;

    @SwitchProperty({
        name: "Transfer Back Not Welcome Player",
        description: "Transfer Back the leader if the player is not in the whitelist or the player is in the blacklist",
        category: "Blacklist and Whitelist",
        subcategory: "Transfer Back Not Welcome Player"
    })
    transferBackNotWelcomePlayer = false;

    @SwitchProperty({
        name: "Alignment Tracker",
        description: "Alignment Tracker for gyro wand will track both yourself and other players aligment",
        category: "Combat",
        subcategory: "Alignment Tracker HUD",
    })
    alignmentTracker = false;

    @ButtonProperty({
        name: "Alignment Tracker Location",
        description: "Moves the Alignment Tracker display hud",
        category: "Combat",
        subcategory: "Alignment Tracker HUD",
        placeholder: "Move"
    })
    MoveAlignmentGUI() {
        this.alignmentGUI.open()
    };

    @SwitchProperty({
        name: "Gyro Cool Down Tracker",
        description: "Gyro Cool Down Tracker for gyro wand will track the cd of the gyro wand",
        category: "Combat",
        subcategory: "Gyro Cool Down HUD",
    })
    gyroCoolDownTracker = false;

    @ButtonProperty({
        name: "Gyro Cool Down Tracker Location",
        description: "Moves the Gyro Cool Down Tracker display hud",
        category: "Combat",
        subcategory: "Gyro Cool Down HUD",
        placeholder: "Move"
    })
    MoveGyroGUI() {
        this.gyroGUI.open()
    };

    @SwitchProperty({
        name: "Broken Hype Detect",
        description: "Toggle to detect if use hype but not get combat exp",
        category: "Crimson Island",
        subcategory: "Broken Hype"
    })
    brokenHyper = true;

    @SwitchProperty({
        name: "Broken Hype Detect Only On Flare",
        description: "Toggle off to detect not only on flare",
        category: "Crimson Island",
        subcategory: "Broken Hype"
    })
    brokenHyperDetectFlareOnly = true;

    @SwitchProperty({
        name: "Vanquisher Alert",
        description: "Toggle to send the coordinate of vanquisher",
        category: "Crimson Island",
        subcategory: "Vanquisher Alert"
    })
    vanquisher = true;

    @SelectorProperty({
        name: "Vanquisher Alert Chat",
        description: "Select an option to send the coordinate of vanquisher",
        category: "Crimson Island",
        subcategory: "Vanquisher Alert",
        options: ["party", "guild", "all"],
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
        name: "Flare Trade party IGN",
        description: "Put player you want to reparty in other group split by space, you can use /fw for manually warp if someone is afk",
        category: "Crimson Island",
        subcategory: "Flare Trade",
        triggerActionOnInitialization: false,
    })
    flarePartyList = "";

    @SwitchProperty({
        name: "Flare Trade party auto accept",
        description: "If the party invite from flare trade will auto accept",
        category: "Crimson Island",
        subcategory: "Flare Trade"
    })
    flareTradeAutoJoin = false;

    @SwitchProperty({
        name: "Recieve waypoint from chat",
        description: "Toggle to recieve waypoint from chat",
        category: "Waypoint",
        subcategory: "Recieve Waypoint"
    })
    recieveWaypoint = true;

    @SwitchProperty({
        name: "Recieve waypoint from chat include yourself",
        description: "Toggle to recieve waypoint from chat if the coord send by yourself",
        category: "Waypoint",
        subcategory: "Recieve Waypoint"
    })
    recieveOwnWaypoint = true;

    @ColorProperty({
        name: "Waypoint Beacon Color",
        description: "Pick a color for beacon",
        category: "Waypoint",
        subcategory: "Waypoint Beacon Color",
    })
    waypointBeaconColor = Color.BLUE;

    @DecimalSliderProperty({
        name: "Waypoint Text Size",
        description: "The waypoint text size",
        category: "Waypoint",
        subcategory: "Waypoint Text Size",
        minF: 0.0,
        maxF: 5.0,
        decimalPlaces: 1
    })
    waypointTextSize = 2.0;

    @SwitchProperty({
        name: "Waypoint Unload When Swap Lobby",
        description: "The waypoint will remove when you swap lobby",
        category: "Waypoint",
        subcategory: "Waypoint Unload When Swap Lobby"
    })
    waypointUnloadWhenSwapLobby = true;

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
    warp = false;

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
    join = false;

    @SwitchProperty({
        name: "!allinv",
        description: "Toggle to enable/disable all invite by the player who send this",
        category: "Trigger Command (Party)",
        subcategory: "!allinv",
    })
    allinv = false;

    @SwitchProperty({
        name: "!ptme",
        description: "Toggle transfer party to the player who send this",
        category: "Trigger Command (Party)",
        subcategory: "!ptme",
    })
    ptme = false;

    @SwitchProperty({
        name: "!rp",
        description: "Toggle to send '/rp' to toggle other mod reparty function",
        category: "Trigger Command (Party)",
        subcategory: "!rp",
    })
    rp = false;

    @SwitchProperty({
        name: "!mute",
        description: "Toggle party mute by '/msg leader !mute [random text]' to fix channel in party chat",
        category: "Trigger Command (DM)",
        subcategory: "!mute",
    })
    mute = false;

    @SwitchProperty({
        name: "!party",
        description: "Toggle party invite by '/msg leader !party [random text]' to get a invite to party",
        category: "Trigger Command (DM)",
        subcategory: "!party",
    })
    party = false;

    @SwitchProperty({
        name: "!rng",
        description: "Toggle to get a luck number for the player who send this",
        category: "Fun Command",
        subcategory: "!rng",
    })
    rng = false;

    @SwitchProperty({
        name: "Kuudra Show Phrase",
        description: "Tell you what is current phrase",
        category: "Kuudra",
        subcategory: "Kuudra Show Phrase"
    })
    kuudraShowPhrase = false;

    @TextProperty({
        name: "Kuudra 2/2 reparty IGN",
        description: "Put player you want to reparty in other group split by space, you can use /kw for manually warp if warp is fail",
        category: "Kuudra",
        subcategory: "Kuudra 2/2 Reparty",
        triggerActionOnInitialization: false,
    })
    kuudraRepartyList = "";

    @SwitchProperty({
        name: "Kuudra 2/2 party auto accept",
        description: "If the party invite from kuudra 2/2 will auto accept",
        category: "Kuudra",
        subcategory: "Kuudra 2/2 Reparty"
    })
    kuudraAutoJoin = false;

    @SwitchProperty({
        name: "Kuudra Supply Waypoint",
        description: "Highlight the supply position",
        category: "Kuudra",
        subcategory: "Kuudra Supply Waypoint",
    })
    kuudraSupplyWaypoint = false;

    @ColorProperty({
        name: "Kuudra Supply Waypoint Beacon Color",
        description: "Pick a color for beacon",
        category: "Kuudra",
        subcategory: "Kuudra Supply Waypoint",
    })
    kuudraSupplyBeaconColor = Color.YELLOW;

    @DecimalSliderProperty({
        name: "Kuudra Supply Waypoint Text Size",
        description: "The waypoint text size",
        category: "Kuudra",
        subcategory: "Kuudra Supply Waypoint",
        minF: 0.0,
        maxF: 5.0,
        decimalPlaces: 1
    })
    kuudraSupplyTextSize = 2.0;

    @SwitchProperty({
        name: "Kuudra Supply Pearl Helper",
        description: "Marks a nearest supply place location to throw an ender pearl",
        category: "Kuudra",
        subcategory: "Kuudra Supply Pearl Helper"
    })
    kuudraSupplyPearlHelper = false;

    @DecimalSliderProperty({
        name: "Kuudra Supply Pearl Helper Distance Text Size",
        description: "The distance text size",
        category: "Kuudra",
        subcategory: "Kuudra Supply Pearl Helper",
        minF: 0.0,
        maxF: 5.0,
        decimalPlaces: 1
    })
    kuudraSupplyPearlHelperTextSize = 2.0;

    @SwitchProperty({
        name: "Kuudra Build Progress",
        description: "Show current build progress for each location",
        category: "Kuudra",
        subcategory: "Kuudra Build Progress"
    })
    kuudraBuildProgress = false;

    @SwitchProperty({
        name: "Kuudra Build Progress Show Beacon",
        description: "Show a beacon mark if it not done",
        category: "Kuudra",
        subcategory: "Kuudra Build Progress"
    })
    kuudraBuildProgressBeacon = true;

    @DecimalSliderProperty({
        name: "Kuudra Build Progress Text Size",
        description: "The progress text size",
        category: "Kuudra",
        subcategory: "Kuudra Build Progress",
        minF: 0.0,
        maxF: 5.0,
        decimalPlaces: 1
    })
    kuudraBuildProgressTextSize = 2.0;

    constructor() {
        this.initialize(this);
        this.addDependency("Alignment Tracker Location", "Alignment Tracker");
        this.addDependency("Gyro Cool Down Tracker Location", "Gyro Cool Down Tracker");

        this.addDependency("Kuudra Supply Waypoint Beacon Color", "Kuudra Supply Waypoint");
        this.addDependency("Kuudra Supply Waypoint Text Size", "Kuudra Supply Waypoint");

        this.addDependency("Kuudra Supply Pearl Helper Distance Text Size", "Kuudra Supply Pearl Helper");

        this.addDependency("Kuudra Build Progress Show Beacon", "Kuudra Build Progress");
        this.addDependency("Kuudra Build Progress Text Size", "Kuudra Build Progress");

        this.addDependency("Delay of !warp", "!warp");

        this.addDependency("Broken Hype Detect Only On Flare", "Broken Hype Detect");

        this.addDependency("Vanquisher Alert Chat", "Vanquisher Alert");

        this.addDependency("Recieve waypoint from chat include yourself", "Recieve waypoint from chat");
        this.addDependency("Waypoint Beacon Color", "Recieve waypoint from chat");
        this.addDependency("Waypoint Text Size", "Recieve waypoint from chat");
        this.addDependency("Waypoint Unload When Swap Lobby", "Recieve waypoint from chat");
    }

    sync() {
        ChatLib.command("GriffinOWO sync", true);
    }
}

export default new Settings();