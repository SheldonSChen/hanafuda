//card background images

for (let i = 1; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
        const cardID = i * 10 + j;
        module.exports[cardID] = require('../assets/cards/' + cardID + '.svg');
    }
}