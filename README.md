# GriffinOWO
A chattrigger script helper for Hypixel Skyblock

## What's it do?
* Helping people tell the waypoint and display the waypoint received by supporting many formats (ex: patcher format). 
* Allow party members to use some leader commands. (ex: allinvite)
* Some fun feature

### Command
1. `griffin` / `gf`: open the config GUI
2. `griffin_reset`: reset waypoint
3. `griffin_set_coord x y z`: set waypoint manually
4. `pk [IGN1] [IGN2]...`: polite remove a player from the party by reparty without inviting them
5. `/kw`: Manually warp 2/2 kuudra party
6. `/fw`: Ignore waiting for all other players and warp the party when flare trade

### Party Chat Trigger Command
1. `!warp`: allow party members to warp the party
2. `!allinv`: allow party members to enable all invite
3. `!ptme`: allow party members to be the new leader
4. `!join [dungeon floor (ex: f7, m7)]`: allow party members to start the dungeon (No downtime)
5. `!rp`: allow party members to reparty (need toggle others mod reparty */rp*)

### DM Trigger Command
1. `/msg [IGN] !party [anything string]`: let the leader invite the player
2. `/msg [IGN] !mute [anything string]`: allow party members to mute and unmute party

### Diana
1. Inquis Alert: Allow you to tell the inquisher spot in the party chat

### Crimson Island
1. Broke Hype Detect: Detect Hype stopped grand combat xp without using the book of state
2. Flare Trade: Party other players and send vanquisher spot and disband the party after send
3. Vanquisher Alert: Tell the location and x y z of the vanquisher and the location to the party with patcher format coord

### Kuudra
1. Kuudra 2/2 reparty: Skip cd when starting a new run
2. Kuudra Show Phrase: Show what kuudra stage is it **[Beta]**
3. Kuudra Supply Waypoint: It can show if other players are around it, and can beacon change color **[Beta]**
4. Kuudra Supply Pearl Helper: Mark the closest empty supply place location **[Beta]**
5. Kuudra Build Progress: Show the build progress of all build locations **[Beta]**

### Fun command
1. `!rng`: show what your today luck

## What's more?
* You can toggle `whitelist mode/blacklist mode` on config now, use `/griffin` or `/gf` to see more
* If you have found any bugs feel free to report them on GitHub