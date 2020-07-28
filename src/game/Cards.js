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

//NOTE: only works for special cards
export function getSpecialCardID(month, type) {
    let index = EACH_TYPE[month].indexOf(type);
    return generateCardID(month, index);
}