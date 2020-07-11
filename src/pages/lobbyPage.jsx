import React from 'react';
import { Link } from 'react-router-dom';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import { LobbyAPI } from '../lobbyAPI';
import { Hanafuda } from '../Game';
import HanafudaBoard from '../pages/board';
import TemplatePage from '../pages/templatePage';

import { APP_PRODUCTION, GAME_SERVER_URL, WEB_SERVER_URL } from '../config';

import './styles/lobbyPage.css';

/*********** constants ***********/
const api = new LobbyAPI();
const server = APP_PRODUCTION ? `https://${window.location.hostname}` : GAME_SERVER_URL;
const HanafudaClient = Client({ 
    game: Hanafuda,
    board: HanafudaBoard,
    multiplayer: SocketIO({ server: server }), 
});
/*********************************/

class LobbyPage extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        console.log('construct');
        this.state.roomID = props.match.params.id;
        this.state.joinedPlayers = [];
        this.state.playerID = null;
        this.state.playerAuthToken = null;
    }

    componentDidMount() {
        this.checkRoomStateAndJoin();
        this.interval = setInterval(this.checkRoomState, 1000);
        window.addEventListener('beforeunload', this.cleanup.bind(this));
    }

    cleanup() {
        console.log('cleaning up');
        api.leaveRoom(this.state.roomID, this.state.playerID, this.state.playerAuthToken);
        clearInterval(this.interval);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.cleanup.bind(this));
    }

    joinRoom = (playerID) => {
        const playerName = 'player ' + playerID;
        if (this.state.roomID) {
            api.joinRoom(this.state.roomID, playerName, playerID).then(
                (playerAuthToken) => {
                    console.log('Joined room: player ', playerID);
                    this.setState({ playerID: playerID, playerAuthToken: playerAuthToken });
                },
                (error) => { console.log(error);}
            );
        }
    };

    checkRoomStateAndJoin = () => {
        console.log('pinging room endpt for players...');
        if (this.state.roomID) {
            api.playersInRoom(this.state.roomID).then(
                (players) => {
                    const joinedPlayers = players.filter((p) => p.name);
                    this.setState({ joinedPlayers: joinedPlayers });
                    
                    const myPlayerID = joinedPlayers.length;
                    this.joinRoom(myPlayerID);
                },
                (error) => {
                    console.log(error);
                    this.setState({ roomID: null });
                }
            );
        }
    };

    checkRoomState = () => {
        if (this.state.roomID) {
            api.playersInRoom(this.state.roomID).then(
                (players) => {
                    const joinedPlayers = players.filter((p) => p.name);
                    this.setState({ joinedPlayers: joinedPlayers });
                },
                (error) => {
                    console.log(error);
                    this.setState({ roomID: null });
                }
            );
        }
    };

    getPlayerItem = (player) => {
        if (player) {
            if (player.id === this.state.playerID) {
                return (
                    <div>
                        <div className="player-item">
                            <a className="player-item-edit"> (Edit) </a>
                            {player.name} - You
                            <div className="player-ready"></div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="player-item">
                            {player.name}
                            <div className="player-ready"></div>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <div className="player-item loading">
                        Waiting for player
                        <div className="player-waiting"></div>
                    </div>
                </div>
            );
        }
    };

    //TODO: I feel like this can be shortened? 
    copyToClipboard = () => {
        var textField = document.createElement('textarea');
        textField.innerText = this.gameLinkBox.innerText;
        textField.style.opacity = "0";
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        this.setState({ copied: true });
        setTimeout(
            function () {
                this.setState({ copied: false });
            }.bind(this), 
            2000
        );
    };

    gameExistsView = () => {
        const players = [0, 1];
        const server = APP_PRODUCTION ? `https://${window.location.hostname}` : WEB_SERVER_URL;

        return (
            <>
                <h3>Invite your friend by sending them the link or game code below:</h3>
                <div id="game-link">
                    <div
                        id="game-link-box"
                        ref={(gameLinkBox) => (this.gameLinkBox = gameLinkBox)}
                    >
                        {`${server}/lobby/${this.state.roomID}`}
                    </div>

                    <div id="game-link-button" onClick={this.copyToClipboard}>
                        {this.state.copied ? "Copied️!" : " Copy "}
                    </div>
                </div>

                <div>
                    Game Code
                    <div id="game-code">
                        {this.state.roomID}
                    </div>
                </div>

                <div id="player-list">
                    {players.map((p) => {
                        const joinedPlayer = this.state.joinedPlayers[p];
                        return this.getPlayerItem(joinedPlayer);
                    })}
                </div>

                <div>
                    <br />
                    The game will begin once all the players join!
                </div>
            </>
        );
    };

    gameNotFoundView = () => {
        return (
            <>
                <div>
                    <h3>Sorry! This game does not exist.</h3>
                    <br />
                    <Link to="/">Create a new game</Link>
                </div>
            </>
        );
    };

    getGameClient = () => {
        return (
            <HanafudaClient
                gameID={ this.state.roomID }
                players={ this.state.joinedPlayers }
                playerID={ String(this.state.playerID) }
                credentials={ this.state.playerAuthToken }
            ></HanafudaClient>
        );
    };

    render() {
        if (this.state.joinedPlayers.length === 2) {
            //TODO: Add start game button, prevent players joining if room is full.
            return this.getGameClient();
        } else {
            return (
                <TemplatePage
                    content={
                        this.state.roomID ? this.gameExistsView() : this.gameNotFoundView()
                    }
                /> 
            );
        }
    }
}

export default LobbyPage;