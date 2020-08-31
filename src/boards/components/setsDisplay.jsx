import React from 'react';

class SetsDisplay extends React.Component {
    getSetElements = (className, allSetValues, showCards) => {
        return (
            <div className={className}>
                    {allSetValues.map((setValues) => {
                        return this.getSetElement(className, setValues, showCards);
                    })}
            </div>
        );
    }
    getSetElement = (className, setValues, showCards) => {
        return (
            <div className={className.slice(0, -1)}>
                <div>{setValues.name}</div>
                <div>
                    {setValues.setCardIDs.map((cardID) => {
                        return showCards && this.props.getCardElement(cardID);
                    })}
                </div>
                <div>{setValues.points}</div>
            </div>
        );
    }

    getSubmitSetsElement = (stage, playerAllSetsMade) => {
        if (stage === 'submitSets') {
            return (
                <div>
                    {this.getSetElements('all-sets', Object.values(playerAllSetsMade), false)}
                    <div className='submit-sets-btns'>
                        Continue this round?
                        <div className='btn' onClick={() => this.props.onSubmitSets(true)}>YES</div>
                        <div className='btn' onClick={() => this.props.onSubmitSets(false)}>NO</div>
                    </div>
                </div>
            );
        } else {
            return (
                <h3 className='loading-txt'>Waiting for opponent decision</h3>
            );
        }
    }

    render() {
        //somehow animate display the new sets?
        const stage = this.props.stage;
        const newSetsMade = this.props.newSetsMade;
        const playerAllSetsMade = this.props.playerAllSetsMade;
        return (
            <div className='sets-display'>
                {this.getSetElements('new-sets', Object.values(newSetsMade), true)}
                {this.getSubmitSetsElement(stage, playerAllSetsMade)}
            </div>
        );
    }
}

export default SetsDisplay;