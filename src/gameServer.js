//TODO: requires instead of import?
import { GAME_SERVER_PORT } from './config';
const { Server } = require('boardgame.io/server');
const { Hanafuda } = require('./game/Game');

const server = Server({ games: [Hanafuda] });
server.run(process.env.PORT || GAME_SERVER_PORT);