const SETS = {
    'GOKO': 0,
    'AME': 1,
    'HANAMI': 2,
    'TSUKIMI': 3,
    'INOSHIKACHO': 4,
    'AKATAN': 5,
    'AOTAN': 6,
    'TAN': 7,
    'TANE': 8,
    'KASU': 9
};

export function initSets() {
    var hasSet = {};
    for (const set in SETS) {
        hasSet[SETS[set]] = false;
    }
    return hasSet;
}

// export function newSetMade(playerPile, newCards) {

// }