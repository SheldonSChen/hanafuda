import React from 'react';

class Hand extends React.Component {
    render() {
        const cards = this.props.cards;
        const getCardElement = this.props.getCardElement;
        
        return (
            <div className='hand'>
                {cards.map((card) => {
                    return getCardElement(card);
                })}
            </div>
        );
    }
}

export default Hand;