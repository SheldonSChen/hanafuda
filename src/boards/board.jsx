import React from 'react';
import DecideOrderBoard from './decideOrderBoard';

class HanafudaBoard extends React.Component {
    render() {
        if (this.props.ctx.phase === 'decideOrder') {
            return <DecideOrderBoard players={this.props.G.players}></DecideOrderBoard>;
        } else {
            return (
                <h3>playing</h3>
            );
        }
    }
}

export default HanafudaBoard;