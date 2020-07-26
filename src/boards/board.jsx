import React from 'react';
import { getCardID } from '../game/Cards';

import DecideOrderBoard from './decideOrderBoard';
import DisplayOrderBoard from './displayOrderBoard';
import PlayBoard from './playBoard';

import './styles/board.css';

const CARD_IMGS = require('../modules/mod_cardImg.js');

export function getCardImage(card, givenCardID=null) {
    const cardID = givenCardID ? givenCardID : getCardID(card);
    return { backgroundImage: 'url('+ CARD_IMGS[cardID]+')' };
}

class HanafudaBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNames: this.props.playerNames
        };
    }

    handleDrawCard = () => {
        this.props.moves.drawCard();
    };
    handleEndPhase = () => {
        this.props.events.endPhase();
    };

    handlePlayHand = (handCard, fieldCard) => {
        this.props.moves.playHand(handCard, fieldCard);
    };
    handlePlayDeck = (deckCard, fieldCard) => {
        this.props.moves.playDeck(deckCard, fieldCard);
    };
    handleSubmitSets = (isSubmit) => {
        this.props.moves.submitSets(isSubmit);
    };

    render() {
        const G = this.props.G;
        const ctx = this.props.ctx;
        //only supports 2 players
        const playerID = parseInt(this.props.playerID, 10);
        const playerID_opponent = (playerID + 1) % 2;

        // eslint-disable-next-line default-case
        switch(this.props.ctx.phase) {
            case 'decideOrder':
                return <DecideOrderBoard
                    currPlayerIndex={ctx.currentPlayer}
                    players={G.players}
                    playerNames={this.state.playerNames}
                    onDrawCard={this.handleDrawCard}
                ></DecideOrderBoard>;
            case 'displayOrder':
                return <DisplayOrderBoard
                    players={G.players}
                    playerNames={this.state.playerNames}
                    firstPlayerName={this.state.playerNames[parseInt(G.order[0], 10)]}
                    onEndPhase={this.handleEndPhase}
                ></DisplayOrderBoard>;
            case 'play':
                //only supports 2 players
                const stage = ctx.activePlayers[playerID];
                const deckTop = stage === 'playDeck' ? G.deck[G.deck.length - 1] : null;
                return <PlayBoard
                    stage={stage}
                    playerHand={G.players[playerID].hand}
                    playerPile={G.players[playerID].pile}
                    opponentHand={G.players[playerID_opponent].hand}
                    opponentPile={G.players[playerID_opponent].pile}
                    fieldCards={G.field}
                    deckTop={deckTop}
                    onPlayHand={this.handlePlayHand}
                    onPlayDeck={this.handlePlayDeck}
                    onSubmitSets={this.handleSubmitSets}
                    newSetsMade={G.newSetsMade}
                    playerAllSetsMade={G.players[playerID].allSetsMade}
                ></PlayBoard>;
        }
    }
}

export default HanafudaBoard;