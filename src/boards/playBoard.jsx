import React from 'react';
import Hand from './components/hand';
import Field from './components/field';
import './styles/playBoard.css';

const components = {
    OPPONENT: 'opponent',
    FIELD: 'field',
    PLAYER: 'player'
}

class PlayBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            hoveredCard: null,
            selectedCard: null
        };
    }

    onCardEnter = (card) => {
        this.setState({ hoveredCard: card});
    }

    onCardLeave = () => {
        this.setState({ hoveredCard: null});
    }

    onCardSelect = (card) => {
        this.setState({ selectedCard: card});
    }

    getCardElement = (card, type) => {
        switch (type) {
            case components.OPPONENT:
                return (
                    <div className='card opponent-card'></div>
                );
            case components.FIELD:
                var className = 'card';
                const hoveredCard = this.state.hoveredCard;
                const selectedCard = this.state.selectedCard;
                if ((hoveredCard && (card.month === hoveredCard.month)) || 
                    (selectedCard && (card.month === selectedCard.month))) {
                    className += ' month-match';
                }
                return (
                    <div className={className}>
                        <div className='card-inside'>
                            {card.month * 10 + card.type}
                        </div>
                    </div>
                );
            case components.PLAYER:
                return (
                    <div className='card' 
                        onMouseEnter={() => this.onCardEnter(card)}
                        onMouseLeave={this.onCardLeave}
                        onClick={() => this.onCardSelect(card)} >
                        <div className='card-inside'>
                            {card.month * 10 + card.type}
                        </div>
                    </div>
                );
        }
    };

    render() {
        const myCards = this.props.myCards;
        const opponentCards = this.props.opponentCards;
        const fieldCards = this.props.fieldCards;

        return (
            <div>
                <Hand 
                    cards={opponentCards} 
                    getCardElement={ (card) => this.getCardElement(card, components.OPPONENT) }
                ></Hand>
                <Field
                    cards={fieldCards} 
                    getCardElement={ (card) => this.getCardElement(card, components.FIELD) }
                ></Field>
                <Hand 
                    cards={myCards} 
                    getCardElement={ (card) => this.getCardElement(card, components.PLAYER) }
                ></Hand>
            </div>
        );
    }
}

export default PlayBoard;