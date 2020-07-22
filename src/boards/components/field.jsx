import React from 'react';

class Field extends React.Component {
    makeMove = (fieldCard, selectedCard, deckTop, stage, playerPile) => {
        if (stage === 'playHand') {
            this.props.onPlayHand(selectedCard, fieldCard);
            console.log(playerPile.concat(selectedCard, fieldCard));
            this.props.onCardSelect(deckTop); 
        } else if (stage === 'playDeck') {
            this.props.onPlayDeck(selectedCard, fieldCard);
            console.log(playerPile.concat(selectedCard, fieldCard));
            this.props.onCardSelect(null);
        } 
        this.props.onEndStage();
    }

    getFieldCardElement = (fieldCard, hoveredCard, selectedCard, deckTop, stage, playerPile) => {
        var className = 'game card field-card';
        var handleOnClick = null;
        
        if (!selectedCard && hoveredCard && (fieldCard.month === hoveredCard.month)) {
            className += ' month-match';
        } else if (selectedCard && (fieldCard.month === selectedCard.month)) {
            className += ' month-match';
            handleOnClick = () => this.makeMove(fieldCard, selectedCard, deckTop, stage, playerPile);
        }

        return (
            <div className={className}
                onClick={handleOnClick}>
                <div className='game card-inside field-card'>
                    {fieldCard.id}
                </div>
            </div>
        );
    }

    getAddFieldElement = (matchPair, hoveredCard, selectedCard, deckTop, stage, playerPile) => {
        if ((hoveredCard || selectedCard) && !matchPair) {
            return (
                <div className='game card add-field' 
                    onClick={() => this.makeMove(null, selectedCard, deckTop, stage, playerPile)}>
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
        const playerPile = this.props.playerPile;

        return (
            <div className='field'>
                {this.props.getDeckElement(deckTop)}

                <div className='field-cards'>
                    <div>
                        {cardsR1.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard, deckTop, stage, playerPile);
                        })}
                    </div>
                    
                    <div>
                        {cardsR2.map((card) => {
                            return this.getFieldCardElement(card, hoveredCard, selectedCard, deckTop, stage, playerPile);
                        })}
                    </div>
                </div>

                {this.getAddFieldElement(matchPair, hoveredCard, selectedCard, deckTop, stage, playerPile)}
            </div>
        );
    }
}

export default Field;