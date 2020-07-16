import { GAME_NAME } from "./config";
import { TurnOrder } from 'boardgame.io/core';
// import { INVALID_MOVE } from "boardgame.io/core";

/*********** functions ***********/
//DECK
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

function dealCards(G, ctx) {
    for (let player = 0; player < ctx.numPlayers; player++) {
        for (let _ = 0; _ < 8; _++) {
            drawCard(G, ctx, player);
        }
    }

    for (let _ = 0; _ < 8; _++) {
        G.field.push(G.deck.pop());
    }
}

function cardNum(card) {
    //card number is month followed by type
    return card.month * 10 + card.type;
}

//HANDS
function resetHands(G, ctx) {
    for (let i = 0; i < ctx.numPlayers; i++) {
        G.players[i].hand = [];
    }
}

function drawCard(G, ctx, player=null) {
    const p = player ? player : ctx.currentPlayer
    const card = G.deck.pop();
    G.players[p].hand.push(card);
}

//OTHER
function setOrder(G, _ctx) {
    const cardP0 = G.players[0].hand.pop();
    const cardP1 = G.players[1].hand.pop();
    if (cardNum(cardP1) < cardNum(cardP0)) {
        console.log('P1 goes first');
        G.order = ['1', '0'];
    } else {
        console.log('P0 goes first');
    }
}
/*********************************/

export const Hanafuda = {
    name: GAME_NAME,
    setup: (ctx) => {
        var start = {
            deck: [],
            players: [],
            field: [],
            order: ['0', '1']
        };

        start.deck = generateDeck(ctx);
        for (let i = 0; i < ctx.numPlayers; i++) {
            start.players[i] = { hand: [], pile: [] };
        }

        return start;
    },
    
    phases: {
        decideOrder: {
            start: true,
            turn: { 
                order: TurnOrder.ONCE,
                moveLimit: 1
            },
            moves: { drawCard },
            next: 'play',
            onEnd: setOrder
        },

        play: {
            onBegin: (G, ctx) => {
                // resetHands(G, ctx);
                G.deck = generateDeck(ctx);
                dealCards(G, ctx);
            },
            turn: {
                order: TurnOrder.CUSTOM_FROM('order'),
                moveLimit: 1
            },
            moves: { drawCard },
        }
    },
};