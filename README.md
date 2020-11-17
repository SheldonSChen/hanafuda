# HANAFUDA.io
An attempt at making an io version of a traditional Hanafuda game, with Koikoi rules.<br />
This repo is NOT ready to be run on other local machines yet.<br />
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## IO:brief explanation

Each client (i.e. player) connects to the server (i.e. game server).<br />
The server matches up clients and puts them in a gameroom.<br />
Multiples pairs can play on one server simultaneously.

## Running App on Local Network

Run both commands in the project directory simultaneously, each in a separate terminal window:

### `npm run client`

Runs the client side of the app in the development mode.<br />
Each player is a client.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run server`

Runs the server side of the app in development mode.<br />
The server runs all game matches. 
