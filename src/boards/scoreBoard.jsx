import React from 'react';

class ScoreBoard extends React.Component {
    render() {
        const winnerIndex = this.props.winnerIndex;
        const winnerName = this.props.winnerName;
        const winnerAllSetsMade = this.props.winnerAllSetsMade;
        const winnerPoints = this.props.winnerPoints;
        
        return(
            <div>
                <h1>Winner: Player {winnerIndex} - {winnerName}!</h1>
                <div>
                    {Object.values(winnerAllSetsMade).map((setValue) => {
                        return (
                            <div className='set'>
                                <h3>{setValue.name}</h3>
                                <h3>{setValue.points}</h3>
                            </div>
                        );
                    })}
                </div>
                <h1>{winnerPoints} Points Won!</h1>
            </div>
        );
    }
}

export default ScoreBoard;