import { CARD_TYPES, getSpecialCardID, getCardMonth, getCardID } from './Cards';

const SET_TYPES = {
    SANKO: 'SANKO',
    SHIKO: 'SHIKO',
    A_SHIKO: 'A_SHIKO',
    GOKO: [CARD_TYPES.GOKO],
    TANE: [CARD_TYPES.TANE],
    TAN: [CARD_TYPES.TAN],
    KASU: [CARD_TYPES.KASU],
    HNM: 'HNM',
    TKM: 'TKM',
    ISC: 'ISC',
    AKA: 'AKA',
    AO: 'AO'
}

const SET_TYPES_KO = {
    [SET_TYPES.SANKO]: {
        name: 'sanko',
        numCards: 3
    },
    [SET_TYPES.SHIKO]: {
        name: 'shiko',
        numCards: 4
    },
    [SET_TYPES.A_SHIKO]: {
        name: 'ameshiko',
        numCards: 4
    },
    [SET_TYPES.GOKO]: {
        name: 'goko',
        numCards: 5
    }
}

const SET_TYPES_NOT_KO = {
    [SET_TYPES.TANE]: {
        name: 'tane',
        minNumCards: 5
    },
    [SET_TYPES.TAN]: {
        name: 'tan',
        minNumCards: 5
    },
    [SET_TYPES.KASU]: {
        name: 'kasu',
        minNumCards: 10
    }
}

const SET_TYPES_SPECIAL = {
    [SET_TYPES.HNM]: {
        name: 'hanami',
        setCardIDs: [getSpecialCardID(3, CARD_TYPES.GOKO), 
                   getSpecialCardID(9, CARD_TYPES.TANE)]
    },
    [SET_TYPES.TKM]: {
        name: 'tsukimi',
        setCardIDs: [getSpecialCardID(8, CARD_TYPES.GOKO), 
                   getSpecialCardID(9, CARD_TYPES.TANE)]
    },
    [SET_TYPES.ISC]: {
        name: 'inoshikacho',
        setCardIDs: [getSpecialCardID(7, CARD_TYPES.TANE), 
                   getSpecialCardID(10, CARD_TYPES.TANE), 
                   getSpecialCardID(6, CARD_TYPES.TANE)]
    },
    [SET_TYPES.AKA]: {
        name: 'akatan',
        setCardIDs: [getSpecialCardID(1, CARD_TYPES.TAN), 
                   getSpecialCardID(2, CARD_TYPES.TAN), 
                   getSpecialCardID(3, CARD_TYPES.TAN)]
    },
    [SET_TYPES.AO]: {
        name: 'aotan',
        setCardIDs: [getSpecialCardID(6, CARD_TYPES.TAN), 
                   getSpecialCardID(9, CARD_TYPES.TAN), 
                   getSpecialCardID(10, CARD_TYPES.TAN)]
    }
};

export function newNumSets() {
    var numInSet = {};
    for (const setKey in SET_TYPES) {
        numInSet[SET_TYPES[setKey]] = 0;
    }
    return numInSet;
}

export function newMadeSets() {
    var madeSet = {};
    for (const setKey in SET_TYPES) {
        madeSet[SET_TYPES[setKey]] = false;
    }
    return madeSet;
}

export function updateSets(G, ctx, cards) {
    for (const card of cards) {
        if (card.type === CARD_TYPES.GOKO) {
            if (getCardMonth(card) !== 11) {
                for (const setType in SET_TYPES_KO) {
                    updateSetKo(G, ctx, setType);
                }
            } else {
                updateSetKo(G, ctx, SET_TYPES.A_SHIKO);
                updateSetKo(G, ctx, SET_TYPES.GOKO);
            }
        } else {
            for (const setType in SET_TYPES_NOT_KO) {
                updateSetNotKo(G, ctx, card, setType);
            }
        }

        for (const setType in SET_TYPES_SPECIAL) {
            updateSetSpecial(G, ctx, card, setType);
        }
    }
}

function addNewSet(G, ctx, setType) {
    const player = G.players[ctx.currentPlayer];
    player.madeSet[setType] = true;
    G.newSetsMade.push(setType);
}

function updateSetKo(G, ctx, setType) {
    const player = G.players[ctx.currentPlayer];
    player.numInSet[setType] += 1;
    
    const set = SET_TYPES_KO[setType];
    if (player.numInSet[setType] === set.numCards) {
        addNewSet(G, ctx, setType);
    } else {
        player.madeSet[setType] = false;
    }
}

function updateSetNotKo(G, ctx, card, setType) {
    const player = G.players[ctx.currentPlayer];
    if (card.type === setType) {
        player.numInSet[setType] += 1;

        const set = SET_TYPES_NOT_KO[setType];
        if (player.numInSet[setType] >= set.minNumCards) {
            addNewSet(G, ctx, setType);
        }
    }
}

function updateSetSpecial(G, ctx, card, setType) {
    const player = G.players[ctx.currentPlayer];
    const set = SET_TYPES_SPECIAL[setType];
    if (set.setCardIDs.includes(getCardID(card))) {
        player.numInSet[setType] += 1;
        if (player.numInSet[setType] === set.setCardIDs.length) {
            addNewSet(G, ctx, setType);
        }
    }
}