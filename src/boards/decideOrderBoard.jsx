import React from 'react';
import './styles/decideOrderBoard.css';

class DecideOrderBoard extends React.Component {
    getOrderCard = (player) => {
        if (player.hand.length === 0) {
            return (
                <div className='card'></div>
            );
        } else if (player.hand.length === 1) {
            const month = player.hand[0].month;
            const type = player.hand[0].type;
            return (
                <div className='order-card-ctr'>
                    <div className='card'>
                        <div className='card-inside'>
                            {month * 10 + type}
                        </div>
                    </div>
                    <h3 className='card-num'>{month}/{type}</h3>
                </div>
            );
        }
    };
    
    render() {
        const currPlayerIndex = this.props.currPlayerIndex;
        const players = this.props.players;
        const playerNames = this.props.playerNames;
        
        return (
            <div id='decide-order-ctr'>
                <h3>{playerNames[currPlayerIndex]}</h3>
                <div className='card' id='decide-order-deck' onClick={this.props.onDrawCard}></div>
                
                <div id='order-cards'>
                    {players.map((p) => {
                        return this.getOrderCard(p);
                    })}
                </div>
            </div>
        );
    }
}

export default DecideOrderBoard;