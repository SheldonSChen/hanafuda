import React from 'react';

import DecideOrderBoard from './decideOrderBoard';
import DisplayOrderBoard from './displayOrderBoard';
import PlayBoard from './playBoard';

import './styles/board.css';

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
    handleEndStage = () => {
        this.props.events.endStage();
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
                return <PlayBoard
                    stage={ctx.activePlayers[playerID]}
                    playerHand={G.players[playerID].hand}
                    playerPile={G.players[playerID].pile}
                    opponentHand={G.players[playerID_opponent].hand}
                    opponentPile={G.players[playerID_opponent].pile}
                    fieldCards={G.field}
                    deckTop={G.deck[G.deck.length - 1]}
                    onPlayHand={this.handlePlayHand}
                    onPlayDeck={this.handlePlayDeck}
                    onEndStage={this.handleEndStage}
                ></PlayBoard>;
        }
    }
}

export default HanafudaBoard;