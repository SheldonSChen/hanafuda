import React from 'react';
import { getSetValues } from '../../game/Sets';

class SetsDisplay extends React.Component {
    getSetElements = (className, setTypes, currPlayerPile, showCards) => {
        return (
            <div className={className}>
                    {setTypes.map((setType) => {
                        return this.getSetElement(className, setType, currPlayerPile, showCards);
                    })}
            </div>
        );
    }
    getSetElement = (className, setType, currPlayerPile, showCards) => {
        const values = getSetValues(setType, currPlayerPile);

        return (
            <div className={className.slice(0, -1)}>
                <div>{values.name}</div>
                <div>
                    {values.setCardIDs.map((cardID) => {
                        return showCards && this.props.getCardElement(cardID);
                    })}
                </div>
                <div>{values.points}</div>
            </div>
        );
    }

    getSubmitSetsElement = (allSetsMade, currPlayerPile) => {
        return (
            <div>
                {this.getSetElements('all-sets', allSetsMade, currPlayerPile, false)}
                <div className='submit-sets-btns'>
                    Continue this round?
                    <div className='btn' onClick={() => this.props.onSubmitSets(true)}>YES</div>
                    <div className='btn' onClick={() => this.props.onSubmitSets(false)}>NO</div>
                </div>
            </div>
        );
    }

    render() {
        //somehow animate display the new sets?
        //display these for both players
        const stage = this.props.stage;
        const newSetsMade = this.props.newSetsMade;
        const currPlayerPile = this.props.currPlayerPile;
        //use these for curr player's submit
        const playerAllSetsMade = this.props.playerAllSetsMade;
        return (
            <div className='sets-display'>
                {this.getSetElements('new-sets', newSetsMade, currPlayerPile, true)}
                {stage === 'submitSets' ? this.getSubmitSetsElement(playerAllSetsMade, currPlayerPile) : null}
            </div>
        );
    }
}

export default SetsDisplay;