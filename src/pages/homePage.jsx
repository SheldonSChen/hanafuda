import React from 'react';
import TemplatePage from './templatePage';
import './styles/homePage.css';

class HomePage extends React.Component {
    state = {
        text: "",
    };
    /*********** functions ***********/
    createGame = () => {
        console.log('game created');
    };
    /*********************************/

    render() {
        const history = this.props.history;
        return (
            <TemplatePage
                content={
                <>
                    <div className="menu-cards">
                        <div
                            className="card"
                            onMouseEnter={() => this.setState({text: "Create a new game"})}
                            onMouseLeave={() => this.setState({text: ""})}
                            onClick={() => this.createGame()}
                        >
                            <div className="card-inside start">
                                <h1>new game</h1>
                            </div>
                        </div>

                        <div
                            className="card"
                            onMouseEnter={() => this.setState({text: "Join a game"})}
                            onMouseLeave={() => this.setState({text: ""})}
                            onClick={() => {history.push("/join");}}
                        >
                            <div className="card-inside join">
                                <h1>join game</h1>
                            </div>
                        </div>

                        <div
                            className="card"
                            onMouseEnter={() => this.setState({text: "Game rules and guide"})}
                            onMouseLeave={() => this.setState({text: ""})}
                            onClick={() => {history.push("/help");}}
                        >
                            <div className="card-inside help">
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