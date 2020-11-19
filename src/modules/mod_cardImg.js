//card background images
const isEmpty = require('lodash.isempty');

var mod = {
    noNumbers: {},
    numbers: {}
}

module.exports = function(cardSet) {
    if (isEmpty(mod[cardSet])) {
        for (let i = 1; i < 13; i++) {
            for (let j = 0; j < 4; j++) {
                const cardID = i * 10 + j;
                mod[cardSet][cardID] = require(`../assets/cards/${cardSet}/${cardID}.svg`);
            }
        }
    }
    return mod[cardSet];
}