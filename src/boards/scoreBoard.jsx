import React from 'react';

class ScoreBoard extends React.Component {
    getScore = (winner, prevChallenger, winnerAllSetsMade) => {
        let score = Object.values(winnerAllSetsMade).map((setValue) => setValue.points).reduce((a, b) => a + b);
        if (prevChallenger && winner !== prevChallenger) {
            score *= 2;
        }
        return score;
    }

    render() {
        const winner = this.props.winner;
        const winnerName = this.props.winnerName;
        const winnerAllSetsMade = this.props.winnerAllSetsMade;
        const prevChallenger = this.props.prevChallenger;
        return(
            <div>
                <h1>Winner: {winnerName}!</h1>
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
                <h1>{this.getScore(winner, prevChallenger, winnerAllSetsMade)} Points Won!</h1>
            </div>
        );
    }
}

export default ScoreBoard;