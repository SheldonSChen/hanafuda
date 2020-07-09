import { React } from 'react';
import { Switch, Route, useHistory } from "react-router";
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import { HomePage } from './pages/homePage';
import { HelpPage } from './pages/helpPage';
import { JoinPage } from './pages/joinPage';
import { HanafudaBoard } from './pages/board';
import { LobbyPage } from './pages/lobbyPage';


import { Hanafuda } from './Game';
import { APP_PRODUCTION, GAME_SERVER_URL } from './config';

function App() {
    const server = APP_PRODUCTION ? `https://${window.location.hostname}` : GAME_SERVER_URL;
    const HanafudaClient = Client({ 
        game: Hanafuda,
        board: HanafudaBoard,
        multiplayer: SocketIO({ server: server }), 
    });

    return (
        <Switch>
          <Route
            path="/home"
            exact
            render={(props) => <HomePage {...props} history={useHistory()} />}
          />
          <Route
            path="/help"
            exact
            render={(props) => <HelpPage {...props} history={useHistory()} />}
          />
          <Route
            path="/join"
            exact
            render={(props) => <JoinPage {...props} history={useHistory()} />}
          />
          <Route
            path="/play" 
            exact 
            render={(props) => <HanafudaClient playerID="0"></HanafudaClient>} 
          />
          <Route 
            path="/lobby/:id" 
            component={LobbyPage} 
          />
          <Route
            path="*"
            render={(props) => <HomePage {...props} history={useHistory()} />}
          />
        </Switch>
      );
}

export default App;