import React from 'react';
import { getSetValues } from '../../game/Sets';

class SetsDisplay extends React.Component {
    getSetElement = (setType, currPlayerPile) => {
        const values = getSetValues(setType, currPlayerPile);

        return (
            <div className='new-set'>
                <div>{values.name}</div>
                <div>
                    {values.setCardIDs.map((cardID) => {
                        return this.props.getCardElement(cardID);
                    })}
                </div>
                <div>{values.points}</div>
            </div>
        );
    }

    getSubmitSetsElement = () => {
        return (
            <div></div>
        );
    }

    render() {
        //somehow animate display the new sets?
        //display these for both players
        const stage = this.props.stage;
        const newSetsMade = this.props.newSetsMade;
        const currPlayerPile = this.props.currPlayerPile;
        //use these for curr player's submit
        const playerMadeSet = this.props.playerMadeSet;
        return (
            <div>
                <div className='new-sets'>
                    {newSetsMade.map((setType) => {
                        return this.getSetElement(setType, currPlayerPile);
                    })}
                </div>
                {stage === 'submitSets' ? this.getSubmitSetsElement() : null}
            </div>
        );
    }
}

export default SetsDisplay;