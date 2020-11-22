import React from 'react';
// import PropTypes from 'prop-types';
import {getOrderCard} from './decideOrderBoard';
import './styles/decideOrderBoard.css';
import './styles/displayOrderBoard.css';

class DisplayOrderBoard extends React.Component {
    componentDidMount() {
        //move on to next phase after 4 seconds
        setTimeout(this.props.onEndPhase, 4000);
    }
    
    render() {
        const players = this.props.players;
        const playerNames = this.props.playerNames;
        const firstPlayerName = this.props.firstPlayerName;
        const getPlayerCardImage = this.props.getPlayerCardImage;
        
        return (
            <div id='decide-order-ctr'>
                <h1>Order Determined!</h1>
                <h2><b>{firstPlayerName}</b> will go first</h2>
                <div id='order-cards'>
                    {players.map((p, i) => {
                        return getOrderCard(p, playerNames[i], getPlayerCardImage);
                    })}
                </div>
                <div className='loading-txt' id='game-starting'>Game starting</div>
            </div>
        );
    }
}

export default DisplayOrderBoard;