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
        const players = this.props.players;
        console.log(players);
        
        return (
            <div id='order-cards'>
                {players.map((p) => {
                    return this.getOrderCard(p);
                })}
            </div>
        );
    }
}

export default DecideOrderBoard;