import { GAME_NAME, GAME_SERVER_URL, APP_PRODUCTION } from './config'
import ky from 'ky';

const server = APP_PRODUCTION ? `https://${window.location.hostname}` : GAME_SERVER_URL;

//see: https://boardgame.io/documentation/#/api/Lobby
export class LobbyAPI {
    constructor() {
        this.api = ky.create({ 
            prefixUrl: `${server}/games/${GAME_NAME}` 
        });
    }

    async createRoom(numPlayers) {
        const params = {
            numPlayers: numPlayers,
            unlisted: true 
        };
        const data = await this.api
            .post('create', params)
            .json();
        // * NOTE * API incorrectly says 'data.roomID'
        return data.gameID;
    }

    async joinRoom(roomID, playerName, playerID) {
        const payload = { 
            playerID: playerID, 
            playerName: playerName 
        };
        const data = await this.api
            .post(roomID + '/join', { json: payload })
            .json();
        return data.playerCredentials;
    }

    async updatePlayerName(roomID, playerID, credentials, newName) {
        const payload = { 
            playerID: playerID, 
            credentials: credentials,
            newName: newName
        };
        try {
            await this.api
                // * NOTE * API incorrectly says params instead of JSON body params.
                .post(roomID + '/update', { json: payload })
                .json();
        } catch (error) {
            console.log('ERROR(updatePlayerName): ', error);
        }
    }

    async leaveRoom(roomID, playerID, credentials) {
        const payload = { 
            playerID: playerID, 
            credentials: credentials 
        };
        try {
            await this.api
                // * NOTE * API incorrectly says params instead of JSON body params.
                .post(roomID + '/leave', { json: payload })
                .json();
        } catch (error) {
            console.log('ERROR(leaveRoom): ', error);
        }
    }

    async playersInRoom(roomID) {
        const room = await this.api
            .get(roomID)
            .json();
        return room.players;
    }
}