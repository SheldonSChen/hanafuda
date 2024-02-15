import React from 'react';
import { Switch, Route, useHistory } from "react-router";
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import HomePage from './pages/homePage';
import HelpPage from './pages/helpPage';
import JoinPage from './pages/joinPage';
import HanafudaBoard from './boards/board';
import LobbyPage from './pages/lobbyPage';


import { Hanafuda } from './game/Game';
import { GAME_SERVER_URL, DEBUG } from './config';

function App() {
    const history = useHistory();
    const HanafudaClient = Client({ 
        game: Hanafuda,
        board: HanafudaBoard,
        multiplayer: SocketIO({ server: GAME_SERVER_URL }),
        debug: DEBUG 
    });

    return (
        <Switch>
          <Route
            path="/home"
            exact
            render={(props) => <HomePage {...props} history={history} />}
          />
          <Route
            path="/help"
            exact
            render={(props) => <HelpPage {...props} history={history} />}
          />
          <Route
            path="/join"
            exact
            render={(props) => <JoinPage {...props} history={history} />}
          />
          <Route
            path="/play" 
            exact 
            render={(props) => <HanafudaClient playerID="0"></HanafudaClient>} 
          />
          <Route 
            path="/lobby/:roomID" 
            component={LobbyPage} 
          />
          <Route
            path="*"
            render={(props) => <HomePage {...props} history={history} />}
          />
        </Switch>
      );
}

export default App;