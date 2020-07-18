import React from 'react';
import {getCardElement} from './hand'

class Field extends React.Component {
    render() {
        const halfNumCards = this.props.cards.length / 2;
        const cardsR1 = this.props.cards.slice(0, halfNumCards);
        const cardsR2 = this.props.cards.slice(halfNumCards);

        return (
            <div>
                <div className='card'>DECK</div>
                <div className='field-cards'>
                    <div>
                        {cardsR1.map((card) => {
                            return getCardElement(card, true);
                        })}
                    </div>
                    
                    <div>
                        {cardsR2.map((card) => {
                            return getCardElement(card, true);
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Field;