import React from 'react';
import {checkMatch} from '../helper';

class Field extends React.Component {
    getDeckElement = (stage, deckTop) => {
        if (stage === 'playDeck') {
            //deck always appears selected when visible
            return this.props.getCardElement(deckTop, 'deck selected');
        } else {
            return this.props.getCardElement(null, 'deck');
        }
    }

    getFieldCardElement = (fieldCard, hoveredCard, selectedCard, deckTop, stage, playerPile) => {
        var otherClasses = 'field-card';
        var events = {};
        
        // eslint-disable-next-line default-case
        switch(stage) {
            case 'playHand':
                if (!selectedCard && hoveredCard && (hoveredCard.month === fieldCard.month)) {
                    otherClasses += ' month-match';
                } else if (selectedCard && (selectedCard.month === fieldCard.month)) {
                    otherClasses += ' month-match';
                    events.onClick = () => {
                        this.props.onPlayHand(selectedCard, fieldCard);
                        this.props.onCardSelect(null);
                    };
                }
                break;
            case 'playDeck':
                if (deckTop && (deckTop.month === fieldCard.month)) {
                    otherClasses += ' month-match';
                    events.onClick = () => {
                        this.props.onPlayDeck(deckTop, fieldCard);
                    };
                }
                break;
        }

        return this.props.getCardElement(fieldCard, otherClasses, events);
    }

    getAddFieldElement = (fieldCards, hoveredCard, selectedCard, deckTop, stage, playerPile) => {
        var handleOnClick = null;
        var visible = false;
        
        // eslint-disable-next-line default-case
        switch(stage) {
            case 'playHand':
                if (selectedCard) {
                    if (!checkMatch(selectedCard, fieldCards)) {
                        handleOnClick = () => {
                            this.props.onPlayHand(selectedCard, null);
                            this.props.onCardSelect(null);
                        };
                        visible = true;
                    }
                } else if (hoveredCard) {
                    if (!checkMatch(hoveredCard, fieldCards)) {
                        visible = true;
                    }
                }
                break;
            case 'playDeck':
                if (deckTop) {
                    if (!checkMatch(deckTop, fieldCards)) {
                        handleOnClick = () => this.props.onPlayDeck(deckTop, null);
                        visible = true;
                    }
                }
                break;
        };

        if (visible) {
            return (
                <div className='game card add-field' 
                    onClick={handleOnClick}>
                    Add to field
                </div>
            );
        }
    }

    render() {
        const stage = this.props.stage;

        const cardsR0 = this.props.cards[0];
        const cardsR1 = this.props.cards[1];
        const cardsAll = this.props.cards.flat();
        
        const deckTop = this.props.deckTop;

        const hoveredCard = this.props.hoveredCard;
        const selectedCard = this.props.selectedCard;
        
        const playerPile = this.props.playerPile;

        return (
            <div className='field'>
                {this.getDeckElement(stage, deckTop)}

                <div className='field-cards'>
                    <div>
                        {cardsR0.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard, deckTop, stage, playerPile);
                        })}
                    </div>
                    
                    <div>
                        {cardsR1.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard, deckTop, stage, playerPile);
                        })}
                    </div>
                </div>

                {this.getAddFieldElement(cardsAll, hoveredCard, selectedCard, deckTop, stage, playerPile)}
            </div>
        );
    }
}

export default Field;