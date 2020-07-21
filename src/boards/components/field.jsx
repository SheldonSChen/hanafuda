import React from 'react';

class Field extends React.Component {
    getFieldCardElement = (fieldCard, hoveredCard, selectedCard, deckTop, stage) => {
        var className = 'game card field-card';
        var handleOnClick = null;
        
        if (!selectedCard && hoveredCard && (fieldCard.month === hoveredCard.month)) {
            className += ' month-match';
        } else if (selectedCard && (fieldCard.month === selectedCard.month)) {
            className += ' month-match';
            handleOnClick = () => { 
                this.props.onPlayHand(stage, selectedCard, fieldCard);
                this.props.onCardSelect(deckTop); 
            };
        }

        return (
            <div className={className}
                onClick={handleOnClick}>
                <div className='game card-inside field-card'>
                    {fieldCard.month * 10 + fieldCard.type}
                </div>
            </div>
        );
    }

    getAddFieldElement = (matchPair, hoveredCard, selectedCard, deckTop, stage) => {
        if ((hoveredCard || selectedCard) && !matchPair) {
            return (
                <div className='game card add-field' 
                    onClick={() => {
                        this.props.onPlayHand(stage, selectedCard, null);
                        this.props.onCardSelect(deckTop); 
                    }}>
                    Add to field
                </div>
            );
        }
    }

    render() {
        const halfNumCards = this.props.cards.length / 2;
        const cardsR1 = this.props.cards.slice(0, halfNumCards);
        const cardsR2 = this.props.cards.slice(halfNumCards);
        
        const hoveredCard = this.props.hoveredCard;
        const selectedCard = this.props.selectedCard;

        const matchPair = this.props.matchPair;
        const deckTop = this.props.deckTop;
        const stage = this.props.stage;

        return (
            <div className='field'>
                {this.props.getDeckElement(deckTop)}

                <div className='field-cards'>
                    <div>
                        {cardsR1.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard, deckTop, stage);
                        })}
                    </div>
                    
                    <div>
                        {cardsR2.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard, deckTop, stage);
                        })}
                    </div>
                </div>

                {this.getAddFieldElement(matchPair, hoveredCard, selectedCard, deckTop, stage)}
            </div>
        );
    }
}

export default Field;