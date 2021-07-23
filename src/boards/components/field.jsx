import React from 'react';
import {checkMatch} from '../helper';
import { getCardMonth } from '../../game/Cards';

class Field extends React.Component {
    getDeckElement = (stage, deckTop) => {
        if (stage === 'playDeck') {
            //deck always appears selected when visible
            return this.props.getCardElement(deckTop, 'deck selected');
        } else {
            return this.props.getCardElement(undefined, 'deck');
        }
    }

    getFieldCardElement = (fieldCard, hoveredCard, selectedCard, deckTop, stage) => {
        let otherClasses = 'field-card';
        let events = {};
        
        switch(stage) {
            case 'playHand':
                if (!selectedCard && hoveredCard && 
                    (getCardMonth(hoveredCard) === getCardMonth(fieldCard))) {
                        otherClasses += ' month-match';
                } else if (selectedCard && 
                    (getCardMonth(selectedCard) === getCardMonth(fieldCard))) {
                        otherClasses += ' month-match';
                        events.onClick = () => {
                            this.props.onPlayHand(selectedCard, fieldCard);
                            this.props.onCardSelect(null);
                        };
                }
                break;
            case 'playDeck':
                if (deckTop && 
                    (getCardMonth(deckTop) === getCardMonth(fieldCard))) {
                        otherClasses += ' month-match';
                        events.onClick = () => {
                            this.props.onPlayDeck(deckTop, fieldCard);
                        };
                }
                break;
            default:
                otherClasses += ' no-click'
                break;
        }

        return this.props.getCardElement(fieldCard, otherClasses, events);
    }

    getAddFieldElement = (fieldCards, hoveredCard, selectedCard, deckTop, stage) => {
        let handleOnClick = null;
        let visible = false;
        
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
        const playerStage = this.props.playerStage;

        const cardsR0 = this.props.cards[0];
        const cardsR1 = this.props.cards[1];
        const cardsAll = this.props.cards.flat();
        
        const deckTop = this.props.deckTop;

        const hoveredCard = this.props.hoveredCard;
        const selectedCard = this.props.selectedCard;

        return (
            <div className='field'>
                {this.getDeckElement(playerStage, deckTop)}

                <div className='field-cards'>
                    <div> {cardsR0.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard, deckTop, playerStage);
                    })}</div>
                    
                    <div> {cardsR1.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard, deckTop, playerStage);
                    })}</div>
                </div>

                {this.getAddFieldElement(cardsAll, hoveredCard, selectedCard, deckTop, playerStage)}
            </div>
        );
    }
}

export default Field;