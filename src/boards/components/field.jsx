import React from 'react';

class Field extends React.Component {
    render() {
        const halfNumCards = this.props.cards.length / 2;
        const cardsR1 = this.props.cards.slice(0, halfNumCards);
        const cardsR2 = this.props.cards.slice(halfNumCards);
        const getCardElement = this.props.getCardElement;
        const getAddFieldElement = this.props.getAddFieldElement;
        const monthMatch = this.props.monthMatch;

        return (
            <div className='field'>
                <div className='game card deck'>DECK</div>

                <div className='field-cards'>
                    <div>
                        {cardsR1.map((card) => {
                            return getCardElement(card);
                        })}
                    </div>
                    
                    <div>
                        {cardsR2.map((card) => {
                            return getCardElement(card);
                        })}
                    </div>
                </div>

                {getAddFieldElement()}
            </div>
        );
    }
}

export default Field;