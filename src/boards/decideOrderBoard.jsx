import React from 'react';
import './styles/decideOrderBoard.css';

export function getOrderCard(player, playerName) {
    if (player.hand.length === 1) {
        return (
            <div className='order-card-ctr'>
                <div className='card'>
                    <div className='card-inside'>
                        {player.hand[0].id}
                    </div>
                </div>
                <h3 className='name-num'>{playerName}<br></br>{player.hand[0].id}</h3>
            </div>
        );
    }
};

class DecideOrderBoard extends React.Component {    
    render() {
        const currPlayerIndex = this.props.currPlayerIndex;
        const players = this.props.players;
        const playerNames = this.props.playerNames;
        
        return (
            <div id='decide-order-ctr'>
                <h1 className='loading-txt'>Determining Order</h1>
                <h4>
                    Each player will draw a card. <br></br> 
                    The player who draws an earlier month will go first. <br></br>
                    If the months are the same, the higher value will go first.
                </h4>
                <h3><b>{playerNames[currPlayerIndex]}</b>, please draw a card from the deck.</h3>

                <div className='card' id='decide-order-deck' onClick={this.props.onDrawCard}>
                    <span className='back-text'>DECK</span>
                </div>

                <div id='order-cards'>
                    {players.map((p, i) => {
                        return getOrderCard(p, playerNames[i]);
                    })}
                </div>
            </div>
        );
    }
}

export default DecideOrderBoard;