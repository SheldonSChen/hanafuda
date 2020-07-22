import React from 'react';
import Hand from './components/hand';
import Field from './components/field';
import Pile from './components/pile';
import './styles/playBoard.css';

const isEqual = require('lodash.isequal');

class PlayBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            hoveredCard: null,
            selectedCard: null,
            matchPair: false
        };
    }
    //EVENTS
    onCardHover = (card) => {
        this.setState({ hoveredCard: card});
        if (!this.state.selectedCard) {
            this.checkMatch(card);
        }
    };

    onCardSelect = (card) => {
        this.setState({ selectedCard: card});
        this.checkMatch(card);
    };

    onCardDeselect = (event) => {
        const classes = event.target.classList;
        if (!classes.contains('hand-card') && 
            !classes.contains('field-card') &&
            !classes.contains('add-field')) {
            this.setState({ selectedCard: null});
            this.checkMatch(null);
        }
    };
    
    //HELPER
    checkMatch = (card) => {
        if (card && this.props.fieldCards.some((fCard) => fCard.month === card.month)) {
            this.setState({ matchPair: true });
        } else {
            this.setState({ matchPair: false });
        }
    };
    
    //GENERATE CARD HTML
    getCardElement = (card, otherClasses='') => {
        if (card) {
            return (
                <div className={'game card ' + otherClasses}>
                    <div className={'game card-inside ' + otherClasses}>
                        {card.month * 10 + card.type}
                    </div>
                </div>
            );
        } else {
            return ( <div className={'game card ' + otherClasses}></div> );
        }
    }

    getHandCardElement = (card, stage) => {
        const selected = isEqual(card, this.state.selectedCard) ? ' selected' : '';
        var active, onMouseEnter, onMouseLeave, onClick;
        if (stage === 'playHand') {
            active = ' active';
            onMouseEnter = () => this.onCardHover(card);
            onMouseLeave = () => this.onCardHover(null);
            onClick = () => this.onCardSelect(card);
        }
        return (
            <div className={'game card hand-card' + active + selected}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick} >
                <div className={'game card-inside hand-card' + active + selected}>
                    {card.month * 10 + card.type}
                </div>
            </div>
        );
    }

    render() {
        const stage = this.props.stage;
        const playerHand = this.props.playerHand;
        const playerPile = this.props.playerPile;
        const opponentHand = this.props.opponentHand;
        const opponentPile = this.props.opponentPile;
        const fieldCards = this.props.fieldCards;
        const deckTop = this.props.deckTop;

        return (
            <div onClick={(event) => {
                if (stage === 'playHand') {
                    this.onCardDeselect(event)
                }}}>
                
                <div className='player'>
                    <Hand 
                        cards={opponentHand} 
                        getCardElement={(_card) => this.getCardElement(null, 'hidden-card')}
                    ></Hand>
                    <Pile
                        cards={opponentPile}
                        getCardElement={(card) => this.getCardElement(card, 'hidden-card')}
                    ></Pile>
                </div>

                <Field
                    stage={stage}
                    cards={fieldCards}
                    deckTop={deckTop}
                    getDeckElement={(card) => {
                        if (stage === 'playDeck') {
                            //deck always appears selected when visible
                            return this.getCardElement(card, 'deck selected');
                        } else {
                            return this.getCardElement(null, 'deck');
                        }
                    }}
                    hoveredCard={this.state.hoveredCard}
                    selectedCard={this.state.selectedCard}
                    onPlayHand={this.props.onPlayHand}
                    onPlayDeck={this.props.onPlayDeck}
                    onEndStage={this.props.onEndStage}
                    onCardSelect={this.onCardSelect}
                    matchPair={this.state.matchPair}
                ></Field>

                <div className='player'>
                    <Hand 
                        cards={playerHand} 
                        getCardElement={(card) => this.getHandCardElement(card, stage)}
                    ></Hand>
                    <Pile
                        cards={playerPile}
                        getCardElement={this.getCardElement}
                    ></Pile>
                </div>
            </div>
        );
    }
}

export default PlayBoard;