import { ICreateGame } from "../../types/protocol";
import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { backendState } from "../state";
import { rej } from "../messages/rej";
import { gameInvite } from "../messages/game-invite";

export const createGameHandler = (engine: Engine, ws: WebSocket, msg: ICreateGame) => {
	
	const currentUser = backendState.users.get(ws);
	
	if (!currentUser) {
		rej(ws, msg.id, 'undefined-user');
		return;
	}

	const opponent = engine.getUserById(msg.payload.opponentId);
	if (!opponent) {
		rej(ws, msg.id, 'opponent-not-found');
		return;
	}

	if(currentUser.status === 'active' && opponent.status === 'active') {
		const game = engine.createGame(currentUser, opponent);
		const oppWs = backendState.clients.get(opponent.connectionId);

		if (!oppWs) {
			rej(ws, msg.id, 'opponent-disconnected');
			return;
		}
		gameInvite(oppWs, game)

	} else {
		rej(ws, msg.id, 'user-busy')
	}
}
