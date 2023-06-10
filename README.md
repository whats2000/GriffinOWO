# GriffinOWO
A chattrigger script helper for Hypixel skyblock

## What's it do?
* Helping people tell the waypoint and display the waypoint received by supporting many formats (ex: patcher format). 
* Allow party members to use some leader commands. (ex: allinvite)
* Some fun feature

### Command
1. `griffin` / `gf` : open the config GUI
2. `griffin_reset` : reset waypoint
3. `griffin_set_coord x y z` : set waypoint manually
4. `pk [IGN1] [IGN2]...` : polite remove a player from the party by reparty without inviting them
5. `kw` : Manually warp 2/2 kuudra party
6. `fw` : Ignore waiting for all other player and warp party when flare trade

### Send waypoint
1. The script will allow you to tell the inquisher spot in the party chat
2. The script will allow you to tell the location and x y z of vanquisher to the party

### Party Chat Trigger Command
1. `!warp` : allow party members to warp the party
2. `!allinv` : allow party members enable all invite
3. `!ptme` : allow party members to be the new leader
4. `!join [dungeon floor (ex: f7, m7)]` : allow party members to start dungeon (No downtime)
5. `!rp` : allow party members to reparty (need toggle others mod reparty */rp*)

### DM Trigger Command
1. `/msg [IGN] !party [anything string]` : let the leader invite the player
2. `/msg [IGN] !mute [anything string]` : allow party members to mute and unmute party

### Crimson Island
1. Detect Hype stopped grand combat xp without using the book of state
2. Flare Trade **[Beta]**

### Kuudra
1. Kuudra 2/2 reparty

### Fun command
1. `!rng` : show what your today luck

## What's more?
* You can toggle `whitelist_mode/blacklist_mode` on config now, use `griffin` to see more