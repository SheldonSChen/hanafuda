import React from 'react';
import DecideOrderBoard from './decideOrderBoard';
import DisplayOrderBoard from './displayOrderBoard'

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

    render() {
        if (this.props.ctx.phase === 'decideOrder') {
            return <DecideOrderBoard
                    currPlayerIndex={this.props.ctx.currentPlayer}
                    players={this.props.G.players}
                    playerNames={this.state.playerNames}
                    onDrawCard={this.handleDrawCard}
                ></DecideOrderBoard>;
        } else if (this.props.ctx.phase === 'displayOrder'){
            return <DisplayOrderBoard
                    players={this.props.G.players}
                    playerNames={this.state.playerNames}
                    firstPlayerName={this.state.playerNames[parseInt(this.props.G.order[0], 10)]}
                    onEndPhase={this.handleEndPhase}
                ></DisplayOrderBoard>;
        } else {
            return (
                <h3>playing</h3>
            );
        }
    }
}

export default HanafudaBoard;