import { @Vigilant, @ButtonProperty, @TextProperty, @SwitchProperty, @DecimalSliderProperty @SliderProperty, @SelectorProperty, @ColorProperty, Color } from "Vigilance";

@Vigilant("GriffinOWO", "Some people call it iahnaddons", {
})
class Settings {
    gyroGUI = new Gui();
    alignmentGUI = new Gui();
    flareTimerGUI = new Gui();
    dragonTimerGUI = new Gui();
    kuudraHeadPointerGUI = new Gui();

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
        description: "Gyro Cool Down Tracker for gyro wand will track the cd of the gyro wand right click ability",
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

    @SelectorProperty({
        name: "Flare Range Marker",
        description: "Display the range of the flare",
        category: "Combat",
        subcategory: "Flare Range Marker",
        options: ["none", "box", "floor"],
    })
    flareRangeMarker = 0;

    @SwitchProperty({
        name: "Flare Timer",
        description: "Flare Timer will display the flare time when you in flare range",
        category: "Combat",
        subcategory: "Flare Timer HUD",
    })
    flareTimer = false;

    @ButtonProperty({
        name: "Flare Timer Location",
        description: "Moves the Flare Timer display hud",
        category: "Combat",
        subcategory: "Flare Timer HUD",
        placeholder: "Move"
    })
    MoveflareTimerGUI() {
        this.flareTimerGUI.open()
    };

    @SwitchProperty({
        name: "Gyro Range Marker Radius",
        description: "Gyro Range Marker Radius will draw a gyro radius circle when in valid distance",
        category: "Combat",
        subcategory: "Gyro Range Marker",
    })
    gyroRangeMarker = false;

    @SwitchProperty({
        name: "Gyro Range Marker Target Block Mode",
        description: "Gyro Range Marker Target Block Mode will draw a block you are point at and adjust radius into precision block position when in valid distance",
        category: "Combat",
        subcategory: "Gyro Range Marker",
    })
    gyroRangeBlock = false;

    @SwitchProperty({
        name: "Terminator Exchange Click",
        description: "&b[WIP] &fWill exchange your attack and use keybind while hold terminator \n&e(Note: This feature will change your client local keybind setting in Controls while hold terminator)",
        category: "Combat",
        subcategory: "Terminator Exchange Click",
    })
    exchangeTerminatorClick = false;

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
    vanquisher = false;

    @SelectorProperty({
        name: "Vanquisher Alert Chat",
        description: "Select an option to send the coordinate of vanquisher",
        category: "Crimson Island",
        subcategory: "Vanquisher Alert",
        options: ["party", "guild", "all"],
    })
    vanquisherAlertChat = 0;

    @SwitchProperty({
        name: "Lava Sea Creature Alert",
        description: "Toggle to send the coordinate of Mythic Lava Sea Creatures",
        category: "Crimson Island",
        subcategory: "Lava Sea Creature Alert"
    })
    lavaSeaCreature = false;

    @SelectorProperty({
        name: "Lava Sea Creature Alert Chat",
        description: "Select an option to send the coordinate of Mythic Lava Sea Creatures",
        category: "Crimson Island",
        subcategory: "Lava Sea Creature Alert",
        options: ["party", "guild", "all"],
    })
    lavaSeaCreatureAlertChat = 0;

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
        name: "Enigma Souls Waypoint",
        description: "Show Enigma Souls Waypoint, you can use '/enigma' too",
        category: "Rift",
        subcategory: "Enigma Souls Waypoint"
    })
    enigmaSouls = true;

    @ColorProperty({
        name: "Enigma Souls Waypoint Beacon Color",
        description: "Pick a color for beacon",
        category: "Rift",
        subcategory: "Enigma Souls Waypoint",
    })
    enigmaSoulsBeaconColor = Color.MAGENTA;

    @SliderProperty({
        name: "Enigma Souls Waypoint Max Distance",
        description: "The waypoint show within this distance",
        category: "Rift",
        subcategory: "Enigma Souls Waypoint",
        min: 0,
        max: 1024
    })
    enigmaSoulsDistance = 256;

    @SliderProperty({
        name: "Enigma Souls Waypoint Text Max Distance",
        description: "The waypoint text show within this distance",
        category: "Rift",
        subcategory: "Enigma Souls Waypoint",
        min: 0,
        max: 1024
    })
    enigmaSoulsTextDistance = 128;

    @DecimalSliderProperty({
        name: "Enigma Souls Waypoint Text Size",
        description: "The waypoint text size",
        category: "Rift",
        subcategory: "Enigma Souls Waypoint",
        minF: 0.0,
        maxF: 5.0,
        decimalPlaces: 1
    })
    enigmaSoulsTextSize = 2.0;

    @SwitchProperty({
        name: "Blood Effigy Timer Waypoint",
        description: "Show Blood Effigy Timer at it location",
        category: "Rift",
        subcategory: "Blood Effigy Timer Waypoint"
    })
    bloodEffigy = false;

    @SwitchProperty({
        name: "Cadaver Marker",
        description: "Mark Cadaver (The skull from vampire boss)",
        category: "Rift",
        subcategory: "Cadaver Marker"
    })
    cadaverMarker = false;

    @ColorProperty({
        name: "Cadaver Marker Color",
        description: "The color of Cadaver Marker",
        category: "Rift",
        subcategory: "Cadaver Marker"
    })
    cadaverMarkerColor = Color.BLUE;

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
        name: "!tps",
        description: "Toggle to calculate the tps of the server (Will take about 3s)",
        category: "Trigger Command (Party)",
        subcategory: "!tps",
    })
    tps = false;

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

    @TextProperty({
        name: "Custom Death Message",
        description: "Send a custom death message in dungeon, use {player} to replace the ign of the player, use | to spilt for mutiple messages",
        category: "Fun Command",
        subcategory: "Custom Death Message",
        triggerActionOnInitialization: false,
    })
    customDeathMessage = "";

    @SwitchProperty({
        name: "Kuudra Show Phase",
        description: "Tell you what is current phase",
        category: "Kuudra",
        subcategory: "Kuudra Show Phase"
    })
    kuudraShowPhase = false;

    @SwitchProperty({
        name: "Kuudra Head Pointer",
        description: "Tell you where is the kuudra head",
        category: "Kuudra",
        subcategory: "Kuudra Head Pointer"
    })
    kuudraHeadPointer = false;

    @ButtonProperty({
        name: "Kuudra Head Pointer Location",
        description: "Moves the Kuudra Head Pointer display hud",
        category: "Kuudra",
        subcategory: "Kuudra Head Pointer",
        placeholder: "Move"
    })
    MoveKuudraHeadPointerGUI() {
        this.kuudraHeadPointerGUI.open()
    };

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

    @SwitchProperty({
        name: "Kuudra Fuel Progress",
        description: "Show current fuel progress",
        category: "Kuudra",
        subcategory: "Kuudra Fuel Progress"
    })
    kuudraFuelProgress = false;

    @SwitchProperty({
        name: "Kuudra Fuel Progress Show Beacon",
        description: "Show a beacon mark",
        category: "Kuudra",
        subcategory: "Kuudra Fuel Progress"
    })
    kuudraFuelProgressBeacon = true;

    @DecimalSliderProperty({
        name: "Kuudra Fuel Progress Text Size",
        description: "The progress text size",
        category: "Kuudra",
        subcategory: "Kuudra Fuel Progress",
        minF: 0.0,
        maxF: 5.0,
        decimalPlaces: 1
    })
    kuudraFuelProgressTextSize = 2.0;

    @SelectorProperty({
        name: "Dungeon Waypoint Mode",
        description: "Select to make only show specify class waypoint instead of all (Need disable SBA hide boss message, others mod is fine)",
        category: "Dungeon",
        subcategory: "Dungeon Waypoint",
        options: ["All Class", "Archer", "Berserk", "Healer", "Tank", "Mage", "Auto Detect"],
    })
    dungeonWaypointMode = 0;

    @SelectorProperty({
        name: "Dungeon Waypoint Pre P4 decoy class",
        description: "Change P4 pre decoy class",
        category: "Dungeon",
        subcategory: "Dungeon Waypoint",
        options: ["Healer", "Berserk", "Mage"],
    })
    dungeonWaypointP4Class = 0;

    @SwitchProperty({
        name: "Dungeon Waypoint Practice Mode",
        description: "Show all the waypoint no matter the phase, for practice usage",
        category: "Dungeon",
        subcategory: "Dungeon Waypoint",
    })
    dungeonWaypointPracticeMode = false;

    @SwitchProperty({
        name: "Dungeon Decoy Waypoint",
        description: "Show where to place decoy \n§e(Need disable §lSBA §f§ehide boss message, others mod is fine)",
        category: "Dungeon",
        subcategory: "Dungeon Waypoint",
    })
    dungeonDecoyWaypoint = false;

    @SwitchProperty({
        name: "Dungeon Gyro Waypoint",
        description: "Show where to use gyro \n§e(Need disable §lSBA §f§ehide boss message, others mod is fine)",
        category: "Dungeon",
        subcategory: "Dungeon Waypoint",
    })
    dungeonGyroWaypoint = false;

    @SwitchProperty({
        name: "Dungeon Mining Waypoint",
        description: "Show where to mine down phase and where to get through \n§e(Need disable §lSBA §f§ehide boss message, others mod is fine)",
        category: "Dungeon",
        subcategory: "Dungeon Waypoint",
    })
    dungeonMiningWaypoint = false;

    @SwitchProperty({
        name: "Dungeon Stack Arrow Waypoint",
        description: "Show where to stack arrow for each dragon \n§e(Need disable §lSBA §f§ehide boss message, others mod is fine)",
        category: "Dungeon",
        subcategory: "Dungeon Waypoint",
    })
    dungeonStackArrowWaypoint = false;

    @DecimalSliderProperty({
        name: "Dungeon Waypoint Text Size",
        description: "The Dungeon Waypoint text size",
        category: "Dungeon",
        subcategory: "Dungeon Waypoint",
        minF: 0.0,
        maxF: 5.0,
        decimalPlaces: 1
    })
    dungeonWaypointTextSize = 2.0;

    @SwitchProperty({
        name: "Dragon Timer",
        description: "Dragon Timer will display the dragon spawning count down depand on skip order, similar to skytils but have order and turn into HUD",
        category: "Dungeon",
        subcategory: "Dragon Timer HUD",
    })
    dragonTimer = false;

    @ButtonProperty({
        name: "Dragon Timer Location",
        description: "Moves the Dragon Timer display hud",
        category: "Dungeon",
        subcategory: "Dragon Timer HUD",
        placeholder: "Move"
    })
    MovedragonTimerGUI() {
        this.dragonTimerGUI.open()
    };

    @SwitchProperty({
        name: "Dragon Spawn Message",
        description: "Dragon spawn will show message in chat",
        category: "Dungeon",
        subcategory: "Dragon Spawn",
    })
    dragonSpawnMessage = false;

    @SwitchProperty({
        name: "Dragon Spawn Title",
        description: "Dragon spawn will show Title in screen",
        category: "Dungeon",
        subcategory: "Dragon Spawn",
    })
    dragonSpawnTitle = false;

    @SwitchProperty({
        name: "Dragon Spawn Title show timer",
        description: "Dragon spawn will show Title in screen with timer",
        category: "Dungeon",
        subcategory: "Dragon Spawn",
    })
    dragonSpawnTitleShowTimer = false;

    @SwitchProperty({
        name: "Dragon Box",
        description: "Display the dragon box and remove when the dragon is killed",
        category: "Dungeon",
        subcategory: "Dragon Box",
    })
    dragonBox = false;

    @SwitchProperty({
        name: "Decoy Killed Title",
        description: "Show a title when the decoy is dead",
        category: "Dungeon",
        subcategory: "Decoy Tracker",
    })
    decoyKilledTitle = false;

    @TextProperty({
        name: "Decoy Killed Message",
        description: "Show a message when the decoy is dead, leave empty if don't want show",
        category: "Dungeon",
        subcategory: "Decoy Tracker",
        triggerActionOnInitialization: false,
    })
    decoyKilledMessage = "";

    @SwitchProperty({
        name: "Box Starred Mob",
        description: "Display the boxes of the star mobs if they are visible to player, similar to Skytils but can customize",
        category: "Dungeon",
        subcategory: "Box Starred Mob",
    })
    boxStarredMob = false;

    @ColorProperty({
        name: "Box Starred Mob Color",
        description: "Pick a color for Starred Mob Boxes",
        category: "Dungeon",
        subcategory: "Box Starred Mob",
    })
    boxStarredMobColor = Color.YELLOW;

    @DecimalSliderProperty({
        name: "Box Starred Mob Box Line Width",
        description: "Change the box line width for Starred Mob Boxes",
        category: "Dungeon",
        subcategory: "Box Starred Mob",
        minF: 0.0,
        maxF: 10.0,
        decimalPlaces: 1
    })
    boxStarredMobBoxLineWidth = 2.0;

    @TextProperty({
        name: "Hide NPC Abiphone Contact",
        description: "Hide NPC Abiphone Contact will hide the NPC contact by input their name spilit by space, &bNPC list: [Pablo Suus Aranya Kat Kaus Rollim Igrupan Oringo]",
        category: "Miscellaneous",
        subcategory: "Abiphone",
        triggerActionOnInitialization: false,
    })
    hideAbiphone = "";

    @SwitchProperty({
        name: "Show Pet Candy Used",
        description: "Show Pet Candy Used amounts below the pet lore even it is level 100",
        category: "Miscellaneous",
        subcategory: "Show Pet Candy Used",
    })
    showPetCandyUsed = false;

    @SwitchProperty({
        name: "Show Pet Candy Used Behind Name",
        description: "Show Pet Candy Used will also add behind the pet's name",
        category: "Miscellaneous",
        subcategory: "Show Pet Candy Used",
    })
    showPetCandyUsedBehindName = false;

    @SwitchProperty({
        name: "Show Pet XP",
        description: "Show Pet XP below the pet lore",
        category: "Miscellaneous",
        subcategory: "Show Pet XP",
    })
    showPetXP = false;

    @SwitchProperty({
        name: "Show Pet XP Overflow",
        description: "Show Pet XP will also show overflow percentage",
        category: "Miscellaneous",
        subcategory: "Show Pet XP",
    })
    showPetXPOverflow = false;

    @SwitchProperty({
        name: "Show Pet XP To Max Level",
        description: "Show Pet XP will also show how much XP require to max level",
        category: "Miscellaneous",
        subcategory: "Show Pet XP",
    })
    showPetXPToMaxLevel = false;

    constructor() {
        this.initialize(this);
        this.addDependency("Enigma Souls Waypoint Beacon Color", "Enigma Souls Waypoint");
        this.addDependency("Enigma Souls Waypoint Max Distance", "Enigma Souls Waypoint");
        this.addDependency("Enigma Souls Waypoint Text Max Distance", "Enigma Souls Waypoint");
        this.addDependency("Enigma Souls Waypoint Text Size", "Enigma Souls Waypoint");

        this.addDependency("Cadaver Marker Color", "Cadaver Marker");

        this.addDependency("Alignment Tracker Location", "Alignment Tracker");
        this.addDependency("Gyro Cool Down Tracker Location", "Gyro Cool Down Tracker");
        this.addDependency("Flare Timer Location", "Flare Timer");

        this.addDependency("Kuudra Supply Waypoint Beacon Color", "Kuudra Supply Waypoint");
        this.addDependency("Kuudra Supply Waypoint Text Size", "Kuudra Supply Waypoint");

        this.addDependency("Kuudra Supply Pearl Helper Distance Text Size", "Kuudra Supply Pearl Helper");

        this.addDependency("Kuudra Build Progress Show Beacon", "Kuudra Build Progress");
        this.addDependency("Kuudra Build Progress Text Size", "Kuudra Build Progress");

        this.addDependency("Kuudra Fuel Progress Show Beacon", "Kuudra Fuel Progress");
        this.addDependency("Kuudra Fuel Progress Text Size", "Kuudra Fuel Progress");

        this.addDependency("Kuudra Head Pointer Location", "Kuudra Head Pointer");

        this.addDependency("Delay of !warp", "!warp");

        this.addDependency("Broken Hype Detect Only On Flare", "Broken Hype Detect");

        this.addDependency("Vanquisher Alert Chat", "Vanquisher Alert");

        this.addDependency("Lava Sea Creature Alert Chat", "Lava Sea Creature Alert");

        this.addDependency("Recieve waypoint from chat include yourself", "Recieve waypoint from chat");
        this.addDependency("Waypoint Beacon Color", "Recieve waypoint from chat");
        this.addDependency("Waypoint Text Size", "Recieve waypoint from chat");
        this.addDependency("Waypoint Unload When Swap Lobby", "Recieve waypoint from chat");

        this.addDependency("Dragon Timer Location", "Dragon Timer");
        this.addDependency("Dragon Spawn Title show timer", "Dragon Spawn Title");

        this.addDependency("Box Starred Mob Color", "Box Starred Mob");
        this.addDependency("Box Starred Mob Box Line Width", "Box Starred Mob");

        this.addDependency("Show Pet Candy Used Behind Name", "Show Pet Candy Used");

        this.addDependency("Show Pet XP Overflow", "Show Pet XP");
        this.addDependency("Show Pet XP To Max Level", "Show Pet XP");
    }

    sync() {
        ChatLib.command("GriffinOWO sync", true);
    }
}

export default new Settings();