//TODO: requires instead of import?
const { Server } = require('boardgame.io/server');
const { Hanafuda } = require('./Game');
import { GAME_SERVER_PORT } from './config';

const server = Server({ games: [Hanafuda] });
server.run(GAME_SERVER_PORT);