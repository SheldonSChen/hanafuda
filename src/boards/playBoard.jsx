import React from 'react';
import Hand from './components/hand';
import './styles/playBoard.css';

class PlayBoard extends React.Component {
    render() {
        const myCards = this.props.myCards;
        const opponentCards = this.props.opponentCards;

        return (
            <div>
                <Hand cards={opponentCards} faceUp={false}></Hand>
                <Hand cards={myCards} faceUp={true}></Hand>
            </div>
        );
    }
}

export default PlayBoard;