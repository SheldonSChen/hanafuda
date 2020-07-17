import React from 'react';
import PropTypes from 'prop-types';
import './styles/decideOrderBoard.css';
// import './styles/displayOrderBoard.css';

class DisplayOrderBoard extends React.Component {
    static propTypes = {
        events: PropTypes.any.isRequired,
    };

    getOrderCard = (player, playerName) => {
        if (player.hand.length === 1) {
            const month = player.hand[0].month;
            const type = player.hand[0].type;
            return (
                <div className='order-card-ctr'>
                    <div className='card'>
                        <div className='card-inside'>
                            {month * 10 + type}
                        </div>
                    </div>
                    <h3 className='name-num'>{playerName}<br></br>{month}/{type}</h3>
                </div>
            );
        }
    };
    
    render() {
        const players = this.props.players;
        const playerNames = this.props.playerNames;
        const firstPlayerName = this.props.firstPlayerName;
        
        return (
            <div id='decide-order-ctr'>
                <h1>Order Determined: {firstPlayerName} will go first!</h1>

                <div id='order-cards'>
                    {players.map((p, i) => {
                        return this.getOrderCard(p, playerNames[i]);
                    })}
                </div>

                <button onClick={this.props.onEndPhase}> END PHASE </button>
            </div>
        );
    }
}

export default DisplayOrderBoard;