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
                <div>{setValues.name} : {setValues.points}</div>
                <div>
                    {setValues.setCardIDs.map((cardID) => {
                        return showCards && this.props.getCardElement(cardID);
                    })}
                </div>
            </div>
        );
    }

    getSubmitSetsElement = (playerStage, playerAllSetsMade, playerHandEmpty) => {
        if (playerStage === 'submitSets') {
            if (playerHandEmpty) {
                return (
                    <div>
                        {this.getSetElements('all-sets', Object.values(playerAllSetsMade), false)}
                        <div className='submit-sets-btns'>
                            You won!! Ending Game.
                            <div className='btn' onClick={() => this.props.onSubmitSets(false)}>OK</div>
                        </div>
                    </div>
                );
            } else {
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
            }
        } else {
            return (
                <h3 className='loading-txt'>Waiting for opponent decision</h3>
            );
        }
    }

    render() {
        //somehow animate display the new sets?
        const playerStage = this.props.playerStage;
        const newSetsMade = this.props.newSetsMade;
        const playerAllSetsMade = this.props.playerAllSetsMade;
        const playerHandEmpty = this.props.playerHandEmpty;

        return (
            <div className='sets-display'>
                {this.getSetElements('new-sets', Object.values(newSetsMade), true)}
                {this.getSubmitSetsElement(playerStage, playerAllSetsMade, playerHandEmpty)}
            </div>
        );
    }
}

export default SetsDisplay;