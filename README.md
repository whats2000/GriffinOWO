# GriffinOWO
A chattrigger script helper for hypixel skyblock

## What's it do?
* Helping people tell the waypoint and display the waypoint received by supporting many formats (ex: patcher format). 
* Allow party members to use some leader commands. (ex: allinvite)
* Some fun feature

### Command
1. `griffin` : toggle on/off or module
2. `griffin_reset` : reset waypoint
3. `griffin_set_coord x y z` : set waypoint manually
4. `pk [IGN1] [IGN2]...` : polite remove a player from party by reparty without invite them

### Send waypoint
1. The script will allow you to tell the inquisher spot in party chat
2. The script will allow you to tell the location and x y z of vanquisher to party

### Party Chat Trigger Command
1. `!warp` : allow party members to warp the party
2. `!allinv` : allow party members enable all invite
3. `!ptme` : allow party members to be the new leader
4. `!join [dungeon floor (ex: f7, m7)]` : allow party members to start dungeon (No downtime)
5. `!rp` : allow party members to reparty (need toggle others mod reparty */rp*)

### DM Trigger Command
1. `/msg [IGN] !party [anything string]` : let leader invite the player
2. `/msg [IGN] !mute [anything string]` : allow party members to mute and unmute party

### Fun command
1. `!rng` : show what your today luck

## What's more?
* Your can toggle `whitelist_mode/blacklist_mode` to `true/false` by edit the index.js and put the whitelist/blacklist member in `whitelist_ign/blacklist_ign`, and then do `/ct reload`. I will move it to a config in later version but you can use it directly now.
