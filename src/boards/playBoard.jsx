import React from 'react';
import Hand from './components/hand';
import Field from './components/field';
import Pile from './components/pile';
import SetsDisplay from './components/setsDisplay';
import { getCardImage } from './board';
import './styles/playBoard.css';

const isEqual = require('lodash.isequal');

class PlayBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredCard: null,
            selectedCard: null,
        };
    }
    //PLAYHAND EVENTS
    onCardHover = (card) => {
        this.setState({ hoveredCard: card});
    };

    onCardSelect = (card) => {
        this.setState({ selectedCard: card});
    };

    onCardDeselectClick = (event) => {
        const classes = event.target.classList;
        if (!classes.contains('hand-card') && 
            !classes.contains('field-card') &&
            !classes.contains('add-field')) {
            this.setState({ selectedCard: null});
        }
    };
    
    //GENERATE CARD HTML
    getCardElement = (card=null, otherClasses='', events={}, cardID=null) => {
        if (card || cardID) {
            return (
                <div className={'game card ' + otherClasses}
                    onMouseEnter={events.onMouseEnter}
                    onMouseLeave={events.onMouseLeave}
                    onClick={events.onClick}>
                    <div className={'game card-inside ' + otherClasses}
                        style={getCardImage(card, cardID)}>
                    </div>
                </div>
            );
        } else {
            return ( <div className={'game card ' + otherClasses}></div> );
        }
    }

    getHandCardElement = (card, stage) => {
        let otherClasses = 'hand-card';

        let events;
        if (stage === 'playHand') {
            otherClasses += ' active';
            events = {
                onMouseEnter: () => this.onCardHover(card),
                onMouseLeave: () => this.onCardHover(null),
                onClick: () => this.onCardSelect(card),
            }
        } else {
            otherClasses += ' no-click'
        }
        
        if (isEqual(card, this.state.selectedCard)) {
            otherClasses += ' selected';
        }

        return this.getCardElement(card, otherClasses, events);
    }

    render() {
        const playerStage = this.props.playerStage;
        const opponentStage = this.props.opponentStage;
        const playerHand = this.props.playerHand;
        const playerPile = this.props.playerPile;
        const opponentHand = this.props.opponentHand;
        const opponentPile = this.props.opponentPile;
        const fieldCards = this.props.fieldCards;
        const deckTop = this.props.deckTop;
        const onPlayHand = this.props.onPlayHand;
        const onPlayDeck = this.props.onPlayDeck;
        const newSetsMade = this.props.newSetsMade;
        const playerAllSetsMade = this.props.playerAllSetsMade;
        const onSubmitSets = this.props.onSubmitSets;
        const currPlayerName = this.props.currPlayerName;

        let setsDisplay = null;
        if (playerStage === 'submitSets' || opponentStage === 'submitSets') {
            setsDisplay = <SetsDisplay
                            playerStage={playerStage}
                            newSetsMade={newSetsMade}
                            playerHandEmpty={playerHand.length === 0}
                            playerAllSetsMade={playerAllSetsMade}
                            getCardElement={(cardID) => this.getCardElement(undefined, 'sets no-click', undefined, cardID)}
                            onSubmitSets={onSubmitSets}
                        ></SetsDisplay>;
        }

        return (
            <div onClick={(event) => {
                if (playerStage === 'playHand') {
                    this.onCardDeselectClick(event)
                }}}>
                
                <div className='player'>
                    <Hand 
                        cards={opponentHand} 
                        getCardElement={(_card) => this.getCardElement(undefined, 'no-click')}
                    ></Hand>
                    <Pile
                        cards={opponentPile}
                        getCardElement={(card) => this.getCardElement(card, 'no-click pile-card')}
                    ></Pile>
                </div>

                <Field
                    playerStage={playerStage}
                    cards={fieldCards}
                    deckTop={deckTop}
                    getCardElement={this.getCardElement}
                    hoveredCard={this.state.hoveredCard}
                    selectedCard={this.state.selectedCard}
                    onPlayHand={onPlayHand}
                    onPlayDeck={onPlayDeck}
                    onCardSelect={this.onCardSelect}
                ></Field>

                {setsDisplay}

                <h3>Current Player: {currPlayerName}</h3>

                <div className='player'>
                    <Hand 
                        cards={playerHand} 
                        getCardElement={(card) => this.getHandCardElement(card, playerStage)}
                    ></Hand>
                    <Pile
                        cards={playerPile}
                        getCardElement={(card) => this.getCardElement(card, 'pile-card')}
                    ></Pile>
                </div>
            </div>
        );
    }
}

export default PlayBoard;