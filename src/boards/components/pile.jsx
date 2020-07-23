import React from 'react';
import { CARD_TYPES } from '../../game/Cards';

class Pile extends React.Component {
    getRow = (cards, type) => {
        const rowCards = cards.filter(card => card.type === type)
        return (
            <div className={type}>
                    {rowCards.map((card) => {
                        return this.props.getCardElement(card);
                    })}
            </div>
        );
    }

    render() {
        const cards = this.props.cards;

        return (
            <div className='pile'>
                {this.getRow(cards, CARD_TYPES.GOKO)}
                {this.getRow(cards, CARD_TYPES.TANE)}
                {this.getRow(cards, CARD_TYPES.TAN)}
                {this.getRow(cards, CARD_TYPES.KASU)}
            </div>
        );
    }
}

export default Pile;