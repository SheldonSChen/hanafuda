import React from 'react';
import { Link } from 'react-router-dom';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import { LobbyAPI } from '../lobbyAPI';
import { Hanafuda } from '../Game';
import HanafudaBoard from '../pages/board';
import TemplatePage from '../pages/templatePage';

import { APP_PRODUCTION, GAME_SERVER_URL, WEB_SERVER_URL, MAX_PLAYERS } from '../config';

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
    state = {}
    
    constructor(props) {
        super(props);
        //TODO: regex id here too
        this.state.roomID = props.match.params.roomID;
        this.state.leave = false;
    }

    componentDidMount() {
        window.addEventListener('beforeunload', () => {
            this.setState({ leave: true });
        });
    }

    render() {
        if (this.state.leave) {
            return false;
        } else {
            return (<LobbyPageView roomID={ this.state.roomID }/>);
        }
    }
}


class LobbyPageView extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        console.log('construct');
        this.state.roomID = props.roomID;
        this.state.gameCanStart = false;
        this.state.joinedPlayers = [];
        this.state.playerID = null;
        this.state.playerCredentials = null;
    }

    componentDidMount() {
        this.checkRoomStateAndJoin();
        this.interval = setInterval(this.checkRoomState, 1000);
    }

    componentWillUnmount() {
        this.cleanup();
    }

    cleanup() {
        console.log('cleaning up');
        api.leaveRoom(this.state.roomID, this.state.playerID, this.state.playerCredentials);
        clearInterval(this.interval);
    }

    joinRoom = (playerID) => {
        const playerName = 'player ' + playerID;
        if (this.state.roomID) {
            api.joinRoom(this.state.roomID, playerName, playerID).then(
                (playerCredentials) => {
                    console.log(playerCredentials);
                    console.log('Joined room: player ', playerID);
                    this.setState({ playerID: playerID, playerCredentials: playerCredentials });
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
                    if (myPlayerID < MAX_PLAYERS) {
                        this.joinRoom(myPlayerID);
                    }
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
                    <div className='player-item'>
                        {player.name} - You
                        <div className='player-status ready'></div>
                    </div>
                );
            } else {
                return (
                    <div className='player-item'>
                        {player.name}
                        <div className='player-status ready'></div>
                    </div>
                );
            }
        } else {
            return (
                <div className='player-item'>
                    Waiting for player
                    <div className='player-status waiting'></div>
                </div>
            );
        }
    };

    updatePlayerName = (sourceID) => {
        const el = document.getElementById(sourceID);
        const newName = el.value;
        api.updatePlayerName(this.state.roomID, this.state.playerID, this.state.playerCredentials, newName);
        el.value = '';
    };

    getGameStartBtn = () => {
        if (this.state.joinedPlayers.length === MAX_PLAYERS) {
            return (
                <div className='btn' id='game-start-btn' onClick={this.startGame}>
                    {'Start Game!'}
                </div>
            );
        }
    };

    //TODO: I feel like this can be shortened? 
    copyToClipboard = (source, sourceID) => {
        var textField = document.createElement('textarea');
        textField.innerText = document.getElementById(sourceID).innerText;
        textField.style.opacity = '0';
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        
        let key = source + 'Copied';
        this.setState({ [key]: true });
        setTimeout(
            function () {
                this.setState({ [key]: false });
            }.bind(this), 
            2000
        );
    };

    startGame = () => {
        this.setState({ gameCanStart: true });
    };

    gameExistsView = () => {
        const players = [...Array(MAX_PLAYERS).keys()]; //[0, 1]
        const server = APP_PRODUCTION ? `https://${window.location.hostname}` : WEB_SERVER_URL;

        return (
            <>
                <h3>Invite your friend by sending them the link or game code below:</h3>
                <div>
                    <div className='game-info-ctr'>
                        <div className='display-box' id='game-link-box'>
                            {`${server}/lobby/${this.state.roomID}`}
                        </div>

                        <div className='btn' id='game-link-btn' 
                          onClick={() => this.copyToClipboard('link', 'game-link-box')}>
                            {this.state.linkCopied ? 'Copied️!' : ' Copy '}
                        </div>
                    </div>

                    <div className='game-info-ctr'>
                        <div className='display-box' id='game-code-box'>
                            {this.state.roomID}
                        </div>

                        <div className='btn' id='game-code-btn'
                          onClick={() => this.copyToClipboard('code', 'game-code-box')}>
                            {this.state.codeCopied ? 'Copied️!' : ' Copy '}
                        </div>
                    </div>
                </div>

                <div id='name-change'>
                    <label htmlFor='name-change-txt' id='name-change-lbl'>Player name: </label>
                    <input type='text' id='name-change-txt' placeholder='type name here!'></input>
                    <button type='button' id='name-change-btn' 
                      onClick={() => this.updatePlayerName('name-change-txt')}>
                          Save
                    </button>
                </div>

                <div id='player-list'>
                    {players.map((p) => {
                        const joinedPlayer = this.state.joinedPlayers[p];
                        return this.getPlayerItem(joinedPlayer);
                    })}
                </div>

                { this.getGameStartBtn() }
            </>
        );
    };

    gameNotFoundView = () => {
        return (
            <>
                <div>
                    <h3>Sorry! This game does not exist.</h3>
                    <br />
                    <Link to='/'>Create a new game</Link>
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
                credentials={ this.state.playerCredentials }
            ></HanafudaClient>
        );
    };

    render() {
        if (this.state.gameCanStart) {
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