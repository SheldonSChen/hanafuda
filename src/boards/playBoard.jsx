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

    onCardHover = (card) => {
        this.setState({ hoveredCard: card});
    };

    onCardSelect = (card) => {
        this.setState({ selectedCard: card});
    };

    onCardDeselect = (event) => {
        const classes = event.target.classList;
        if (!classes.contains('player-card') && 
            !classes.contains('field-card')) {
            this.setState({ selectedCard: null});
        }
    };

    getCardElement = (card, type) => {
        switch (type) {
            case components.OPPONENT:
                return (
                    <div className='card opponent-card'></div>
                );
            case components.FIELD:
                var className = 'card field-card';
                const hoveredCard = this.state.hoveredCard;
                const selectedCard = this.state.selectedCard;
                if ((hoveredCard && (card.month === hoveredCard.month)) || 
                    (selectedCard && (card.month === selectedCard.month))) {
                    className += ' month-match';
                }
                return (
                    <div className={className}>
                        <div className='card-inside field-card'>
                            {card.month * 10 + card.type}
                        </div>
                    </div>
                );
            case components.PLAYER:
                return (
                    <div className='card player-card' 
                        onMouseEnter={() => this.onCardHover(card)}
                        onMouseLeave={() => this.onCardHover(null)}
                        onClick={() => this.onCardSelect(card)} >
                        <div className='card-inside player-card'>
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
            <div onClick={(event) => this.onCardDeselect(event)}>
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