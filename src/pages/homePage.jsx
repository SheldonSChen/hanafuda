import React from 'react';
import TemplatePage from './templatePage';
import { LobbyAPI } from '../api';
import './styles/homePage.css';

const api = new LobbyAPI();

class HomePage extends React.Component {
    state = {
        text: "",
        loading: false,
        redirect: null,
    };
    
    createGame = () => {
        console.log('createGame');
        //TODO: can this be just if, no else?
        if (this.state.loading) {
            return;
        } else {
            this.setState({ loading: true });
        }

        api.createRoom(2).then(
            (roomID) => {
                const history = this.props.history;
                console.log("Created room, roomID=", roomID);
                this.setState({ loading: false });
                history.push('/lobby/' + roomID);
            },
            (error) => {
                console.log(error);
                this.setState({ loading: false });
            }
        );
    };

    render() {
        const history = this.props.history;
        return (
            <TemplatePage
                content={
                <>
                    <div id="menu-cards">
                        <div
                            className="card"
                            onMouseEnter={() => this.setState({text: "Create a new game"})}
                            onMouseLeave={() => this.setState({text: ""})}
                            onClick={() => this.createGame()}
                        >
                            <div className="card-inside" id="start">
                                <h1>new game</h1>
                            </div>
                        </div>

                        <div
                            className="card"
                            onMouseEnter={() => this.setState({text: "Join a game"})}
                            onMouseLeave={() => this.setState({text: ""})}
                            onClick={() => {history.push("/join");}}
                        >
                            <div className="card-inside" id="join">
                                <h1>join game</h1>
                            </div>
                        </div>

                        <div
                            className="card"
                            onMouseEnter={() => this.setState({text: "Game rules and guide"})}
                            onMouseLeave={() => this.setState({text: ""})}
                            onClick={() => {history.push("/help");}}
                        >
                            <div className="card-inside" id="help">
                                <h1>game help</h1>
                            </div>
                        </div>
                    </div>
                    <div id="menu-description">{this.state.text}</div>
                </>
                }
            />
        );
    }
}

export default HomePage;