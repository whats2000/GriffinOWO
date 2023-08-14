import Settings from "../config";

export function isHoldItem(id) {
    return Player.getHeldItem()?.getNBT()?.toObject()?.tag?.ExtraAttributes?.id === id;
}

export function getId(item) {
    return item?.getNBT()?.toObject()?.tag?.ExtraAttributes?.id;
}

export function getCandyUsed(pet) {
    return JSON.parse(pet.getNBT()?.toObject()?.tag?.ExtraAttributes?.petInfo).candyUsed;
}

export function checkWhitelist(player) {
    const whitelist_mode = Settings.whitelist;
    const blacklist_mode = Settings.blacklist;
    let lower_case_player_ign = player.toString().toLowerCase();

    if (blacklist_mode) {
        let blacklist_ign = Settings.blacklistIGN.split(" ");
        for (let a = 0; a < blacklist_ign.length; a++)
            if (lower_case_player_ign == blacklist_ign[a].toLowerCase()) {
                setTimeout(() => {
                    ChatLib.chat(`&2[GriffinOwO] &f[${player}] is on blacklist!`);
                }, 50);

                return false;
            }
    }

    if (whitelist_mode) {
        let whitelist_ign = Settings.whitelistIGN.split(" ");
        for (let a = 0; a < whitelist_ign.length; a++)
            if (lower_case_player_ign == whitelist_ign[a].toLowerCase())
                return true;

        setTimeout(() => {
            ChatLib.chat(`&2[GriffinOwO] &f[${player}] is not on whitelist!`);
        }, 50);

        return false;
    }

    return true;
}

export function getUniqueNumber(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

export function getUniqueValue(str) {
    const uniqueNumber = getUniqueNumber(str);
    const today = new Date().toISOString().substr(0, 10);
    const hash = getUniqueNumber(today + uniqueNumber);
    const value = Math.abs(hash % 101);
    return value;
}

export function getIGN(player) {
    let player_ign = player;

    // remove any suffixes that are not legal ign symbols starting from the tail
    player_ign = player_ign.replace(/[^0-9A-Za-z_]+$/, "");

    // preserve all legal ign symbols starting from the tail
    let match_list = player_ign.match(/[0-9A-Za-z_]+$/);

    if (match_list !== null) {
        player_ign = match_list[0];
    } else {
        player_ign = "";

        setTimeout(() => {
            ChatLib.chat(`error at IGN, input = "${player}"`);
        }, 50);
    }

    return player_ign;
}

export function getColorArray(color) {
    const red = color.getRed();
    const green = color.getGreen();
    const blue = color.getBlue();
    const alpha = color.getAlpha();

    return [red, green, blue, alpha];
}

export function romanToInt(roman) {
    const romanNumerals = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let letters = roman.split("");
    let result = 0;
    for (var i = 0; i < letters.length; i++) {
        if (romanNumerals[letters[i]] < romanNumerals[letters[i + 1]]) {
            result -= romanNumerals[letters[i]]
        } else {
            result += romanNumerals[letters[i]]
        }
    }
    return result;
}

export function getVec3Pos(vec) {
    // [Vec3.xCoord, Vec3.yCoord, Vec3.zCoord]
    return [vec.field_72450_a, vec.field_72448_b, vec.field_72449_c]
}

export function getVec3iPos(vec) {
    // [Vec3i.getX(), Vec3i.getY(), Vec3i.getZ()]
    return [parseInt(vec.func_177958_n()), parseInt(vec.func_177956_o()), parseInt(vec.func_177952_p())]
}
