export const GAME_NAME = "hanafuda";
export const GAME_SERVER_PORT = 8000;
const LOCAL_HOST = true;
const ADDRESS = LOCAL_HOST ? "http://localhost" : "NETWORK ADDRESS HERE";
export const APP_PRODUCTION = true;
export const GAME_SERVER_URL = APP_PRODUCTION ? `https://hanafuda-backend.onrender.com` : `${ADDRESS}:${GAME_SERVER_PORT}`;
export const WEB_SERVER_URL = APP_PRODUCTION ? `https://hanafuda-backend.onrender.com` : `${ADDRESS}:3000`;


export const DEBUG = false;
//TODO: use MAX_PLAYERS elsewhere instead of 2
export const MAX_PLAYERS = 2;