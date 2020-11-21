//Module for loading card background artwork
const { CARD_SETS, ALL_CARD_IDS } = require("../game/Cards");
const isEmpty = require('lodash.isempty');

const ALL_CARD_IDS_FLAT = ALL_CARD_IDS.flat();

var mod = {}
Object.values(CARD_SETS).forEach(function (cardSet) {
    mod[cardSet] = {};
});

module.exports = function(cardSet) {
    if (isEmpty(mod[cardSet])) {
        for (const cardID of ALL_CARD_IDS_FLAT) {
            mod[cardSet][cardID] = require(`../assets/cards/${cardSet}/${cardID}.svg`);
        }
    }
    return mod[cardSet];
}