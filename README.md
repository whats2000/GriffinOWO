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
1. `!warp`: Allow party members to warp the party (Can be canceled by `!c`)
2. `!allinv`: Allow party members to enable all invite
3. `!ptme`: Allow party members to be the new leader
4. `!join [dungeon floor (ex: f7, m7) | kuudra tier (ex: t1, t5)]`: Allow party members to start the dungeon or kuudra (No downtime)
5. `!rp`: Allow party members to reparty (need toggle others mod reparty */rp*)
6. `!tps`: Allow party members to get the 3s average tps

### DM Trigger Command
1. `/msg [IGN] !party [anything string]`: let the leader invite the player
2. `/msg [IGN] !mute [anything string]`: allow party members to mute and unmute party

### Diana
1. Inquis Alert: Allow you to tell the inquisher spot in the party chat

### Dungeon
1. Blessing Display: Show the blessing in dungeon
2. Dungeon Gyro Waypoint: Show where to use gyro or shadow warp
3. Dungeon Mining Waypoint: Show where to mine down phrases and where to get through
4. Dungeon Stack Arrow Waypoint: Show where to stack arrow for each dragon
5. Dragon Timer: Dragon Timer will display the dragon spawning countdown depending on skip order [R -> O -> B -> P -> G] or double skip order [[P -> O -> G -> R -> B], [B -> R -> G -> O -> P]]. You can change the mode in `Dragon Timer Mode`
6. Dragon Spawn Message/Title: Better dragon spawn detect to not trigger by fire veil wand
7. Dragon Box: Display the dragon box and remove when the dragon is killed
8. Decoy Killed Title/Message: Tell you and your party when the decoy is killed
9. Healer Wish Notification/Message: Tell you and your party when the healer need wish in boss room
10. Box Starred Mob: Display the boxes of the star mobs if they are visible to player, similar to Skytils but can customize
11. Tank Protect Range: Display the boxes of the tanks protect range, similar to skytils but hope it will never broken >_< (Please report bug in github)
12. Remove P1/P5 ArmorStand and P5 Falling Block: Will increase FPS

### Combat
1. Alignment Tracker: The alignment Tracker for the gyro wand will track both your and other players' alignment
2. Gyro Cool Down Tracker: Gyro Cool Down Tracker for the gyro wand will track the cd of the gyro wand right click ability
3. Gyro Range Marker: Gyro Range Marker will draw a gyro circle when in the valid distance and tell you if it is in cooldown
4. Flare Range Marker: Display the range of the flare
5. Flare Timer: Flare Timer will display the flare time when you are in flare range
6. Terminator Exchange Click: Will exchange your attack and use keybind while holding the terminator
7. Terminator Hide Animation: Will disable the Terminator left click swing animation
8. Shadow Warp Marker: Shadow Warp Marker will draw a radius circle when in valid distance, this only work with a blade with Shadow Warp Scroll only

### Crimson Island
1. Broke Hype Detect: Detect Hype stopped grand combat xp without using the book of state
2. Flare Trade: Party other players and send vanquisher spot and disband the party after send
3. Vanquisher Alert: Tell the location and x y z of the vanquisher and the location to the customized channel with patcher format coord
4. Lava Sea Creature Alert: Tell the location and x y z of the Mythic Lava Sea Creatures and the location to the customized channel with patcher format coord

### Rift
1. Enigma Souls Waypoint: Show Enigma Souls Waypoint, you can use `/enigma` too
2. Blood Effigy Timer Waypoint: Show Blood Effigy Timer at its location
3. Cadaver Marker: Mark Cadaver (The skull from the vampire boss)

### Kuudra
1. Kuudra 2/2 reparty: Skip cd when starting a new run
2. Kuudra Show Phrase: Show what kuudra stage it is
3. Kuudra Supply Waypoint: It can show if other players are around it, and can beacon change color
4. Kuudra Supply Pearl Helper: Mark the closest empty supply place location
5. Kuudra Build Progress: Show the build progress of all build locations
6. Kuudra Fuel Progress: Show the fuel progress
7. Kuudra Head Pointer: Tell you where is the kuudra head

### Miscellaneous
1. Hide NPC Abiphone Contact: Hide NPC Abiphone Contact will hide the NPC contact by inputting their name split by space
2. Show Pet Candy Used: Show pet candy used amounts when hover the pet even when it is max level
2. Show Pet XP: Show pet XP when hover the pet, you can also toggle to show overflow and to-max-level XP

### Fun command
1. `!rng`: show what your today luck
2. Custom Death Message: Send a custom death message in the dungeon, use `{player}` to replace the IGN of the player, and use `|` to spill for mutiple messages

## What's more?
* You can toggle `whitelist mode/blacklist mode` on config now, use `/griffin` or `/gf` to see more
* If you have found any bugs feel free to report them on GitHub
