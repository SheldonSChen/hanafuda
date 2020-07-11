import { GAME_NAME, GAME_SERVER_URL, APP_PRODUCTION } from './config'
import ky from 'ky';

const server = APP_PRODUCTION ? `https://${window.location.hostname}` : GAME_SERVER_URL;

export class LobbyAPI {
    constructor() {
        this.api = ky.create({ 
            prefixUrl: `${server}/games/${GAME_NAME}` 
        });
    }

    async createRoom(numPlayers) {
        const data = await this.api
            .post('create', { numPlayers: numPlayers })
            .json();
        return data.gameID;
    }

    async joinRoom(roomID, playerName, playerID) {
        const payload = { playerName: playerName, playerID: playerID};
        const data = await this.api
            .post(roomID + '/join', { json: payload })
            .json();
        const { playerAuthToken } = data;
        return playerAuthToken;
    }

    //TODO: can we unify credentials / playerAuthToken?
    async leaveRoom(roomID, playerID, playerAuthToken) {
        const payload = { playerID: playerID, credentials: playerAuthToken };
        try {
            await this.api
                .post(roomID + '/leave', { json: payload})
                .json();
        } catch (error) {
            console.log('Error - leaveRoom: ', error);
        }
    }

    async playersInRoom(roomID) {
        const room = await this.api.get(roomID).json();
        return room.players;
    }
}