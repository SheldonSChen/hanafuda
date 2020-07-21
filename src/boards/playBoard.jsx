import React from 'react';
import Hand from './components/hand';
import Field from './components/field';
import Pile from './components/pile';
import './styles/playBoard.css';

const isEqual = require('lodash.isequal');

class PlayBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            hoveredCard: null,
            selectedCard: null,
            matchPair: false
        };
    }
    //EVENTS
    onCardHover = (card) => {
        this.setState({ hoveredCard: card});
        if (!this.state.selectedCard) {
            this.checkMatch(card);
        }
    };

    onCardSelect = (card) => {
        this.setState({ selectedCard: card});
        this.checkMatch(card);
    };

    onCardDeselect = (event) => {
        const classes = event.target.classList;
        if (!classes.contains('hand-card') && 
            !classes.contains('field-card')) {
            this.setState({ selectedCard: null});
            this.checkMatch(null);
        }
    };
    
    //HELPER
    checkMatch = (card) => {
        if (card && this.props.fieldCards.some((fCard) => fCard.month === card.month)) {
            this.setState({ matchPair: true });
        } else {
            this.setState({ matchPair: false });
        }
    };
    
    //GENERATE CARD HTML
    getCardElement = (card) => {
        return (
            <div className='game card'>
                <div className='game card-inside'>
                    {card.month * 10 + card.type}
                </div>
            </div>
        );
    }

    getHiddenCardElement = (_card) => {
        return ( <div className='game card hidden-card'></div> );
    }

    getHandCardElement = (card) => {
        const selected = isEqual(card, this.state.selectedCard) ? ' selected' : ''
        return (
            <div className={'game card hand-card' + selected}
                onMouseEnter={() => this.onCardHover(card)}
                onMouseLeave={() => this.onCardHover(null)}
                onClick={() => this.onCardSelect(card)} >
                <div className={'game card-inside hand-card' + selected}>
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
        const deckTop = this.props.deckTop;

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
                    deckTop={deckTop}
                    getDeckElement={(card) => this.getCardElement(card, 'deck')}
                    hoveredCard={this.state.hoveredCard}
                    selectedCard={this.state.selectedCard}
                    onPlayHand={this.props.onPlayHand}
                    onCardSelect={this.onCardSelect}
                    matchPair={this.state.matchPair}
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