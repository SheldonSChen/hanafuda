import React from 'react';
import TemplatePage from './templatePage';
import { LobbyAPI } from '../lobbyAPI';
import './styles/homePage.css';
import { MAX_PLAYERS } from '../config';

const api = new LobbyAPI();
const MENU = {
    'START': 'start',
    'JOIN': 'join',
    'HELP': 'help'
}
const TEXT_TYPES = {
    'MSG': 'msg',
    'INNER_TEXT': 'innerText'
}
const texts = {
    [MENU.START]: {
        [TEXT_TYPES.MSG]: 'Create a new game',
        [TEXT_TYPES.INNER_TEXT]: 'new game'
    },
    [MENU.JOIN]: {
        [TEXT_TYPES.MSG]: 'Join a game',
        [TEXT_TYPES.INNER_TEXT]: 'join game'
    },
    [MENU.HELP]: {
        [TEXT_TYPES.MSG]: 'Game rules and guide',
        [TEXT_TYPES.INNER_TEXT]: 'help'
    }
}

class HomePage extends React.Component {
    state = {
        text: "",
        loading: false,
        redirect: null,
    };
    
    createGame = () => {
        console.log('createGame');
        if (this.state.loading) {
            return;
        } else {
            this.setState({ loading: true });
        }

        api.createRoom(MAX_PLAYERS).then(
            (roomID) => {
                const history = this.props.history;
                console.log("Created room, roomID =",roomID);
                this.setState({ loading: false });
                history.push('/lobby/' + roomID);
            },
            (error) => {
                console.log(error);
                this.setState({ loading: false });
            }
        );
    };

    getMenuCard = (option, history, specialClick=null) => {
        let handleClick = specialClick;
        if (!handleClick) {
            handleClick = () => history.push('/' + option);
        }

        return (
            <div
                className="card"
                onMouseEnter={() => this.setState({text: texts[option][TEXT_TYPES.MSG]})}
                onMouseLeave={() => this.setState({text: ""})}
                onClick={handleClick}
            >
                <div className="card-inside" id={option}>
                    <h1>{texts[option][TEXT_TYPES.INNER_TEXT]}</h1>
                </div>
            </div>
        );
    }

    render() {
        const history = this.props.history;
        return (
            <TemplatePage
                content={
                <>
                    <div id="menu-cards">
                        {this.getMenuCard(MENU.START, history, () => this.createGame())}
                        {this.getMenuCard(MENU.JOIN, history)}
                        {this.getMenuCard(MENU.HELP, history)}
                    </div>
                    <h3 id="menu-description">{this.state.text}</h3>
                </>
                }
            />
        );
    }
}

export default HomePage;