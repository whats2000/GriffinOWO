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

### Party Chat Trigger Command
1. `!warp` : allow party members to warp the party
2. `/msg [IGN] !party [anything string]` : let leader invite the player
3. `!allinv` : allow party members enable all invite
4. `!ptme` : allow party members to be the new leader
5. `/msg [IGN] !mute [anything string]` : allow party members to mute and unmute party
6. `!join [dungeon floor (ex: f7, m7)]` : allow party members to start dungeon (No downtime)
7. `!rp` : allow party members to reparty (need toggle others mod reparty */rp*)
### Fun command
1. `!rng` : show what your today luck

## What's more?
Your can toggle `whitelist_mode` to `true` by edit the index.json and put the whitelist member in `whitelist_ign`, and then do `/ct reload`. I will move it to a config in later version but you can use it directly now.
