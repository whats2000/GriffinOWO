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

### Blacklist and Whitelist
1. Kick Not Welcome Player: Kick if the player is not in the whitelist or the player is on the blacklist
2. Transfer Back Not Welcome Player: Transfer Back the leader if the player is not in the whitelist or the player is in the blacklist

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

### Dungeon
1. Dungeon Decoy Waypoint: Show where to place decoy
2. Dungeon Gyro Waypoint: Show where to use gyro
3. Dungeon Mining Waypoint: Show where to mine down phrase and where to get through
4. Dragon Timer: Dragon Timer will display the dragon spawning count down depend on skip order [R -> O -> B -> P -> G] **[Beta]**
5. Dragon Spawn Message/Title: Better dragon spawn detect to not trigger by fire veil wand **[Beta]**

### Combat
1. Alignment Tracker: The alignment Tracker for the gyro wand will track both your and other players' alignment
2. Gyro Cool Down Tracker: Gyro Cool Down Tracker for the gyro wand will track the cd of the gyro wand right click ability
3. Flare Range Marker: Display the range of the flare
4. Flare Timer: Flare Timer will display the flare time when you are in flare range

### Crimson Island
1. Broke Hype Detect: Detect Hype stopped grand combat xp without using the book of state
2. Flare Trade: Party other players and send vanquisher spot and disband the party after send
3. Vanquisher Alert: Tell the location and x y z of the vanquisher and the location to the party with patcher format coord

### Rift
1. Enigma Souls Waypoint: Show Enigma Souls Waypoint, you can use `/enigma` too
2. Blood Effigy Timer Waypoint: Show Blood Effigy Timer at its location
3. Cadaver Marker: Mark Cadaver (The skull from the vampire boss)

### Kuudra
1. Kuudra 2/2 reparty: Skip cd when starting a new run
2. Kuudra Show Phrase: Show what kuudra stage is it
3. Kuudra Supply Waypoint: It can show if other players are around it, and can beacon change color
4. Kuudra Supply Pearl Helper: Mark the closest empty supply place location
5. Kuudra Build Progress: Show the build progress of all build locations
6. Kuudra Fuel Progress: Show the fuel progress

### Fun command
1. `!rng`: show what your today luck
2. Custom Death Message: Send a custom death message in dungeon, use `{player}` to replace the ign of the player, use `|` to spilt for mutiple messages

## What's more?
* You can toggle `whitelist mode/blacklist mode` on config now, use `/griffin` or `/gf` to see more
* If you have found any bugs feel free to report them on GitHub
