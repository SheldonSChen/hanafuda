import React from 'react';

class ScoreBoard extends React.Component {    
    render() {
        const winner = this.props.winner;
        const winnerAllSetsMade = this.props.winnerAllSetsMade;
        const prevChallenger = this.props.prevChallenger;
        return(
            <div>
                <h1>{winner}</h1>
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
                <h1>{prevChallenger}</h1>
            </div>
        );
    }
}

export default ScoreBoard;