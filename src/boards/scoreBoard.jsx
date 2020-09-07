import React from 'react';

class ScoreBoard extends React.Component {

    render() {
        const winnerIndex = this.props.winnerIndex;
        const players = this.props.players;
        const playerNames = this.props.playerNames;
        const winnerPoints = this.props.winnerPoints;
        if (winnerIndex) {
            return(
                <div>
                    <h1>Winner: Player {winnerIndex} - {playerNames[winnerIndex]}!</h1>
                    <div>
                        {Object.values(players[winnerIndex].allSetsMade).map((setValue) => {
                            return (
                                <div className='set'>
                                    <h3>{setValue.name}</h3>
                                    <h3>{setValue.points}</h3>
                                </div>
                            );
                        })}
                    </div>
                    <h1>{winnerPoints} Points Won!</h1>
                    <div>
                        {players.map((player, i) => {
                            return (
                                <h2>{playerNames[i]}: {player.points} points total</h2>
                            )
                        })}
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <h1>Draw</h1>
                </div>
            );
        }
    }
}

export default ScoreBoard;