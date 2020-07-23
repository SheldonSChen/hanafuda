import { GAME_NAME } from "../config";
import { getCardType } from './Cards';
import { initSets, updateSets } from './Sets';
import { TurnOrder } from 'boardgame.io/core';
// import { INVALID_MOVE } from "boardgame.io/core";

const isEqual = require('lodash.isequal');

/*********** functions ***********/
//GAME
const generateDeck = (ctx) => {
    let deck = []; 
    for (let i = 1; i < 13; i++) {
        for (let j = 0; j < 4; j++) {
            deck.push({
                id: i * 10 + j,
                month: i,
                type: getCardType(i, j),
            });
        }
    }
    deck = ctx.random.Shuffle(deck);
    return deck;
};

const generatePlayer = () => {
    var player = { 
        hand: [],
        pile: [],
        sets:  initSets()
    };
    return player;
}

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

function resetHands(G, ctx) {
    for (let i = 0; i < ctx.numPlayers; i++) {
        G.players[i].hand = [];
    }
}

//MOVES
function drawCard(G, ctx, player=null) {
    const p = player ? player : ctx.currentPlayer;
    const card = G.deck.pop();
    G.players[p].hand.push(card);
}

function playHand(G, ctx, handCard, fieldCard) {
    const player = G.players[ctx.currentPlayer];
    player.hand = player.hand.filter(card => !isEqual(card, handCard));
    playToField(G, ctx, handCard, fieldCard);
}

function playDeck(G, ctx, deckCard, fieldCard) {
    G.deck = G.deck.filter(card => !isEqual(card, deckCard));
    playToField(G, ctx, deckCard, fieldCard);
}

function playToField(G, ctx, sourceCard, fieldCard) {
    const player = G.players[ctx.currentPlayer];

    if (fieldCard) {
        G.field = G.field.filter(card => !isEqual(card, fieldCard));
        player.pile.push(sourceCard, fieldCard);
        updateSets(G, ctx, sourceCard);
        updateSets(G, ctx, fieldCard);
    } else {
        G.field.push(sourceCard);
    }
}

//OTHER
function saveOrder(G, _ctx) {
    const cardP0 = G.players[0].hand[0];
    const cardP1 = G.players[1].hand[0];
    if (cardP1.id < cardP0.id) {
        console.log('P1 goes first');
        G.order = ['1', '0'];
    } else {
        console.log('P0 goes first');
        G.order = ['0', '1'];
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
            order: null
        };

        start.deck = generateDeck(ctx);
        for (let i = 0; i < ctx.numPlayers; i++) {
            start.players[i] = generatePlayer();
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
            next: 'displayOrder',
            onEnd: saveOrder
        },

        displayOrder: {
            next: 'play'
        },

        play: {
            onBegin: (G, ctx) => {
                resetHands(G, ctx);
                G.deck = generateDeck(ctx);
                dealCards(G, ctx);
            },
            turn: {
                order: TurnOrder.CUSTOM_FROM('order'),
                moveLimit: 2,
                activePlayers: { currentPlayer: 'playHand'},
                stages: {
                    playHand: {
                        moves: {playHand},
                        next: 'playDeck'
                    },
                    playDeck: {
                        moves: {playDeck}
                    }
                }
            }
        }
    },
};