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
        }
        
        if (isEqual(card, this.state.selectedCard)) {
            otherClasses += ' selected';
        }

        return this.getCardElement(card, otherClasses, events);
    }

    render() {
        const stage = this.props.stage;
        const playerHand = this.props.playerHand;
        const playerPile = this.props.playerPile;
        const opponentHand = this.props.opponentHand;
        const opponentPile = this.props.opponentPile;
        const fieldCards = this.props.fieldCards;
        const deckTop = this.props.deckTop;
        const onPlayHand = this.props.onPlayHand;
        const onPlayDeck = this.props.onPlayDeck;
        const newSetsMade = this.props.newSetsMade;
        const playerMadeSet = this.props.playerMadeSet;

        let setsDisplay = null;
        if (newSetsMade.length > 0) {
            setsDisplay = <SetsDisplay
                            stage={stage}
                            newSetsMade={newSetsMade}
                            currPlayerPile={stage === 'submitSets' ? playerPile : opponentPile}
                            playerMadeSet={playerMadeSet}
                            getCardElement={(cardID) => this.getCardElement(undefined, 'sets no-click', undefined, cardID)}
                        ></SetsDisplay>;
        }

        return (
            <div onClick={(event) => {
                if (stage === 'playHand') {
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
                    stage={stage}
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

                <div className='player'>
                    <Hand 
                        cards={playerHand} 
                        getCardElement={(card) => this.getHandCardElement(card, stage)}
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