import { GAME_NAME } from "./config";
import { INVALID_MOVE } from 'boardgame.io/core';

export const Hanafuda = {
    name: GAME_NAME,
    
    setup: (ctx) => {
        var start = {
            deck: [],
            players: {},
            field: [],
        };

        start.deck = generateDeck(ctx);

        for (let i = 0; i < ctx.numPlayers; i++) {
            start.players[i] = generatePlayer();
            for (let _ = 0; _ < 8; _++) {
                start.players[i].hand.push(start.deck.pop());
            }
        }

        for (let _ = 0; _ < 8; _++) {
            start.field.push(start.deck.pop());
        }

        // Actual way, will anyone notice if it's not this?
        // for (let i = 0; i < 4; i++) {
        //     start.players[1].hand.push(start.deck.pop());
        //     start.players[1].hand.push(start.deck.pop());
        //     start.field.push(start.deck.pop());
        //     start.field.push(start.deck.pop());
        //     start.players[0].hand.push(start.deck.pop());
        //     start.players[0].hand.push(start.deck.pop());
        // }
        
        return start;
    },

    moves: {},
};

const generatePlayer = () => {
    let player = { hand: [], pile: [] }
    return player;
};

const generateDeck = (ctx) => {
    let deck = []; 
    for (let i = 1; i < 13; i++) {
        for (let j = 0; j < 4; j++) {
            deck.push({
                month: i,
                type: j,
            });
        }
    }
    deck = ctx.random.Shuffle(deck);
    return deck;
};