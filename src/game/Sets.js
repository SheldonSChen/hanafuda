import { CARD_TYPES, getCardID } from './Cards';

const SET_TYPES = {
    [CARD_TYPES.GOKO]: 'goko',
    [CARD_TYPES.TANE]: 'tane',
    [CARD_TYPES.TAN]: 'tan',
    [CARD_TYPES.KASU]: 'kasu',
    //special sets
    'AME': 'ame',
    'HNM': 'hanami',
    'TKM': 'tsukimi',
    'ISC': 'inoshikacho',
    'AKA': 'akatan',
    'AO': 'aotan'
};

const TYPE_SET_NUMS = {
    [CARD_TYPES.GOKO]: 3,
    [CARD_TYPES.TANE]: 5,
    [CARD_TYPES.TAN]: 5,
    [CARD_TYPES.KASU]: 10,
}

const SPECIAL_SET_CARDS = {
    [SET_TYPES.AME]: [getCardID(11, CARD_TYPES.GOKO)],
    [SET_TYPES.HNM]: [getCardID(3, CARD_TYPES.GOKO), getCardID(9, CARD_TYPES.TANE)],
    [SET_TYPES.TKM]: [getCardID(8, CARD_TYPES.GOKO), getCardID(9, CARD_TYPES.TANE)],
    [SET_TYPES.ISC]: [getCardID(7, CARD_TYPES.TANE), getCardID(10, CARD_TYPES.TANE), getCardID(6, CARD_TYPES.TANE)],
    [SET_TYPES.AKA]: [getCardID(1, CARD_TYPES.TAN), getCardID(2, CARD_TYPES.TAN), getCardID(3, CARD_TYPES.TAN)],
    [SET_TYPES.AO]: [getCardID(6, CARD_TYPES.TAN), getCardID(9, CARD_TYPES.TAN), getCardID(10, CARD_TYPES.TAN)]
}

export function initSets() {
    var numInSet = {};
    for (const setKey in SET_TYPES) {
        numInSet[SET_TYPES[setKey]] = 0;
    }
    return numInSet;
}

export function updateSets(G, ctx, cards) {
    for (const card of cards) {
        for (const typeKey in CARD_TYPES) {
            updateTypeSet(G, ctx, card, CARD_TYPES[typeKey]);
        }
        for (const set in SPECIAL_SET_CARDS) {
            updateSpecialSet(G, ctx, card, set);
        }
    }
}

function updateTypeSet(G, ctx, card, cardType) {
    const player = G.players[ctx.currentPlayer];
    const setType = SET_TYPES[cardType];
    
    if (card.type === cardType) {
        player.numInSet[setType] += 1;
        if (player.numInSet[setType] >= TYPE_SET_NUMS[setType]) {
            //new set made
        }
    }
}

function updateSpecialSet(G, ctx, card, set) {
    const player = G.players[ctx.currentPlayer];
    if (SPECIAL_SET_CARDS[set].includes(card.id)) {
        player.numInSet[set] += 1;
        if (player.numInSet[set] === SPECIAL_SET_CARDS[set].length) {
            //new set made
        }
    }
}