import React from 'react';

class Pile extends React.Component {
    render() {
        const cards = this.props.cards;
        const getCardElement = this.props.getCardElement;
        
        return (
            <div>
                {cards.map((card) => {
                    return getCardElement(card);
                })}
            </div>
        );
    }
}

export default Pile;