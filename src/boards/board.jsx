import React from 'react';
import DecideOrderBoard from './decideOrderBoard';

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

    render() {
        if (this.props.ctx.phase === 'decideOrder') {
            return <DecideOrderBoard
                    currPlayerIndex={this.props.ctx.currentPlayer}
                    players={this.props.G.players}
                    playerNames={this.state.playerNames}
                    onDrawCard={this.handleDrawCard}
                ></DecideOrderBoard>;
        } else {
            return (
                <h3>playing</h3>
            );
        }
    }
}

export default HanafudaBoard;