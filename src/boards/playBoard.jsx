import React from 'react';
import Hand from './components/hand';
import Field from './components/field';
import './styles/playBoard.css';

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

    getOpponentCardElement = (_card) => {
        return ( <div className='card opponent-card'></div> );
    }

    getFieldCardElement = (card) => {
        var className = 'card field-card';
        const hoveredCard = this.state.hoveredCard;
        const selectedCard = this.state.selectedCard;
        var handleOnClick = null;
        
        if (!selectedCard && hoveredCard && (card.month === hoveredCard.month)) {
            className += ' month-match';
        } else if (selectedCard && (card.month === selectedCard.month)) {
            className += ' month-match';
            handleOnClick = () => { 
                this.props.onPlayHand(selectedCard, card); 
            };
        }

        return (
            <div className={className}
                onClick={handleOnClick}>
                <div className='card-inside field-card'>
                    {card.month * 10 + card.type}
                </div>
            </div>
        );
    }

    getPlayerCardElement = (card) => {
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

    render() {
        const myCards = this.props.myCards;
        const opponentCards = this.props.opponentCards;
        const fieldCards = this.props.fieldCards;

        return (
            <div onClick={(event) => this.onCardDeselect(event)}>
                <Hand 
                    cards={opponentCards} 
                    getCardElement={this.getOpponentCardElement}
                ></Hand>
                <Field
                    cards={fieldCards} 
                    getCardElement={this.getFieldCardElement}
                ></Field>
                <Hand 
                    cards={myCards} 
                    getCardElement={this.getPlayerCardElement}
                ></Hand>
            </div>
        );
    }
}

export default PlayBoard;