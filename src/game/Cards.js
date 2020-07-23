export const CARD_TYPES = {
    'KASU': 'kasu',
    'TAN': 'tanzaku',
    'TANE': 'tane',
    'GOKO': 'goko'
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

export function getCardType(month, index) {
    return EACH_TYPE[month][index];
}

//NOTE: only works for special cards
export function getCardID(month, type) {
    return month * 10 + EACH_TYPE[month].indexOf(type);
}