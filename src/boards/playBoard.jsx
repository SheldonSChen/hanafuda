import React from 'react';
import Hand from './components/hand';
import Field from './components/field';
import './styles/playBoard.css';

class PlayBoard extends React.Component {
    render() {
        const myCards = this.props.myCards;
        const opponentCards = this.props.opponentCards;
        const fieldCards = this.props.fieldCards;

        return (
            <div>
                <Hand cards={opponentCards} faceUp={false}></Hand>
                <Field cards={fieldCards}></Field>
                <Hand cards={myCards} faceUp={true}></Hand>
            </div>
        );
    }
}

export default PlayBoard;