export const CARD_SETS = {
    NO_NUMBERS: 'noNumbers',
    NUMBERS: 'numbers',
}

export const DEFAULT_CARD_SET = CARD_SETS.NO_NUMBERS;

export const CARD_TYPES = {
    GOKO: 'GOKO',
    TANE: 'TANE',
    TAN: 'TAN',
    KASU: 'KASU',
}

const EACH_TYPE = [
    [], //just so that index matches w/ month
    [CARD_TYPES.GOKO, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //jan
    [CARD_TYPES.TANE, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //feb
    [CARD_TYPES.GOKO, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //mar
    [CARD_TYPES.TANE, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //apr
    [CARD_TYPES.TANE, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //may
    [CARD_TYPES.TANE, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //jun
    [CARD_TYPES.TANE, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //jul
    [CARD_TYPES.GOKO, CARD_TYPES.TANE, CARD_TYPES.KASU, CARD_TYPES.KASU], //aug
    [CARD_TYPES.TANE, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //sep
    [CARD_TYPES.TANE, CARD_TYPES.TAN, CARD_TYPES.KASU, CARD_TYPES.KASU],  //oct
    [CARD_TYPES.GOKO, CARD_TYPES.TANE, CARD_TYPES.TAN, CARD_TYPES.KASU],   //nov
    [CARD_TYPES.GOKO, CARD_TYPES.KASU, CARD_TYPES.KASU, CARD_TYPES.KASU]  //dec
];

const ALL_CARD_IDS_TEMP = [];
for (let month = 1; month < 13; month++) {
    const row = [];
    for (let index = 0; index < 4; index++) {
        row.push(generateCardID(month, index));
    }
    ALL_CARD_IDS_TEMP.push(row);
}
export const ALL_CARD_IDS = ALL_CARD_IDS_TEMP;

export function newCard(month, index) {
    return {
        id: generateCardID(month, index),
        month: month,
        type: EACH_TYPE[month][index]
    };
}

export function getCardMonth(card) {
    return card.month;
}

export function getCardID(card) {
    return card.id;
}

export function generateCardID(month, index) {
    return month * 10 + index;
}

export function compareCards(card0, card1) {
    return card0.id - card1.id;
}

//NOTE: only works for special cards
export function getSpecialCardID(month, type) {
    let index = EACH_TYPE[month].indexOf(type);
    return generateCardID(month, index);
}