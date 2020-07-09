import { Client } from 'boardgame.io/react';
import { Hanafuda } from './Game';

const App = Client({ game: Hanafuda });

export default App;