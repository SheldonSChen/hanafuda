import React from 'react';

export function getCardElement(card, faceUp) {
    if (faceUp) {
        return (
            <div className='card'>
                <div className='card-inside'>
                    {card.month * 10 + card.type}
                </div>
            </div>
        );
    } else {
        return ( <div className='card'></div> );
    }
}

class Hand extends React.Component {
    render() {
        const cards = this.props.cards;
        const faceUp = this.props.faceUp;
        return (
            <div>
                {cards.map((card) => {
                    return getCardElement(card, faceUp);
                })}
            </div>
        );
    }
}

export default Hand;