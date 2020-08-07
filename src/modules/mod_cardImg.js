//card background images
const svgs = [1, 3, 4, 6, 7, 8, 10, 12];

for (let i = 1; i < 13; i++) {
    if (svgs.includes(i)) {
        for (let j = 0; j < 4; j++) {
            const cardID = i * 10 + j;
            module.exports[cardID] = require('../assets/cards/' + cardID + '.svg');
        }
    } else {
        for (let j = 0; j < 4; j++) {
            const cardID = i * 10 + j;
            module.exports[cardID] = require('../assets/cards/' + cardID + '.png');
        }
    }
}