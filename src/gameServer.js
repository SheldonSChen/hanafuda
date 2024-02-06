//TODO: requires instead of import?
const { Server } = require('boardgame.io/server');
const { Hanafuda } = require('./game/Game');
const PORT = process.env.PORT || 8000;

const server = Server({ games: [Hanafuda] });
server.run(PORT);