import React from 'react';

class ScoreBoard extends React.Component {
    render() {
        const winner = this.props.winner;
        const winnerName = this.props.winnerName;
        const winnerAllSetsMade = this.props.winnerAllSetsMade;
        const score = this.props.score;
        return(
            <div>
                <h1>Winner: Player {winner} - {winnerName}!</h1>
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
                <h1>{score} Points Won!</h1>
            </div>
        );
    }
}

export default ScoreBoard;