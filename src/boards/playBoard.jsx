import React from 'react';
import Hand from './components/hand';
import Field from './components/field';
import Pile from './components/pile';
import './styles/playBoard.css';

class PlayBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            hoveredCard: null,
            selectedCard: null
        };
    }
    //EVENTS
    onCardHover = (card) => {
        this.setState({ hoveredCard: card});
    };

    onCardSelect = (card) => {
        this.setState({ selectedCard: card});
    };

    onCardDeselect = (event) => {
        const classes = event.target.classList;
        if (!classes.contains('hand-card') && 
            !classes.contains('field-card')) {
            this.setState({ selectedCard: null});
        }
    };
    //GENERATE CARD HTML
    getCardElement = (card) => {
        return (
            <div className='card'>
                <div className='card-inside'>
                    {card.month * 10 + card.type}
                </div>
            </div>
        );
    }

    getHiddenCardElement = (_card) => {
        return ( <div className='card hidden-card'></div> );
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

    getHandCardElement = (card) => {
        return (
            <div className='card hand-card' 
                onMouseEnter={() => this.onCardHover(card)}
                onMouseLeave={() => this.onCardHover(null)}
                onClick={() => this.onCardSelect(card)} >
                <div className='card-inside hand-card'>
                    {card.month * 10 + card.type}
                </div>
            </div>
        );
    }

    render() {
        const playerHand = this.props.playerHand;
        const playerPile = this.props.playerPile;
        const opponentHand = this.props.opponentHand;
        const opponentPile = this.props.opponentPile;
        const fieldCards = this.props.fieldCards;

        return (
            <div onClick={(event) => this.onCardDeselect(event)}>
                <Hand 
                    cards={opponentHand} 
                    getCardElement={this.getHiddenCardElement}
                ></Hand>
                <Pile
                    cards={opponentPile}
                    getCardElement={this.getHiddenCardElement}
                ></Pile>
                <Field
                    cards={fieldCards} 
                    getCardElement={this.getFieldCardElement}
                ></Field>
                <Hand 
                    cards={playerHand} 
                    getCardElement={this.getHandCardElement}
                ></Hand>
                <Pile
                    cards={playerPile}
                    getCardElement={this.getCardElement}
                ></Pile>
            </div>
        );
    }
}

export default PlayBoard;