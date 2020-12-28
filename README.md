# HANAFUDA.io
An attempt at making an io version of a traditional Hanafuda game, with Koikoi rules (2 players).<br />
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Client-Server: brief explanation

The client provides the game website.<br />
The server provides the lobby, matches up players, and runs matches.<br />
Multiples matches can play on one server simultaneously.

## Getting Started

After cloning, remember to open your terminal and run `npm install` from the root folder (i.e. /hanafuda).

## Running App on Local Network (development mode)

### Player 1:<br />
1. Open a terminal tab and run `npm run client` 
    - (returns "On Your Network" address)
1. Open another terminal tab and run `npm run server`

To end either, click the tab and press `ctrl + c`

### Player 2:<br />
Join via link or game code.
The game page can be viewed at:
- same device as Player 1: [http://localhost:3000](http://localhost:3000)<br />
- different device, but same network (e.g. wifi) as Player 1: (ask for "On Your Network" address)<br />
  - note: you will need to change `localhost` to the network address beforehand in [`src/config.js`](src/config.js) 

## `npm` Commands

### `npm run client`

Runs the client side of the app in development mode.<br />
The game page can be viewed at: [http://localhost:3000](http://localhost:3000)<br />

The page will reload if you make edits to the code.<br />
You will also see any lint errors in the console.

### `npm run server`

Runs the server side of the app in development mode.<br />
