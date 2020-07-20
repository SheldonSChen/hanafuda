import React from 'react';

class Field extends React.Component {
    getFieldCardElement = (card, hoveredCard, selectedCard) => {
        var className = 'game card field-card';
        var handleOnClick = null;
        
        if (!selectedCard && hoveredCard && (card.month === hoveredCard.month)) {
            className += ' month-match';
        } else if (selectedCard && (card.month === selectedCard.month)) {
            className += ' month-match';
            handleOnClick = () => { 
                this.props.onPlayHand(selectedCard, card);
                this.props.onCardSelect(null); 
            };
        }

        return (
            <div className={className}
                onClick={handleOnClick}>
                <div className='game card-inside field-card'>
                    {card.month * 10 + card.type}
                </div>
            </div>
        );
    }

    getAddFieldElement = (matchPair, hoveredCard, selectedCard) => {
        if ((hoveredCard || selectedCard) && !matchPair) {
            return ( 
                <div className='game card add-field' 
                    onClick={() => this.props.onPlayHand(selectedCard, null)}>
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

        return (
            <div className='field'>
                <div className='game card deck'>DECK</div>

                <div className='field-cards'>
                    <div>
                        {cardsR1.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard);
                        })}
                    </div>
                    
                    <div>
                        {cardsR2.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard);
                        })}
                    </div>
                </div>

                {this.getAddFieldElement(matchPair, hoveredCard, selectedCard)}
            </div>
        );
    }
}

export default Field;