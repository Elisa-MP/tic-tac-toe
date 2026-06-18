import { ILeaveGame } from "../../types/protocol";
import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { oppLeftGame } from "../messages/opp-left-game";
import { backendState } from "../state";
import { rej } from "../messages/rej";
import { ack } from "../messages/ack";

export const leaveGameHandler = (engine: Engine, ws: WebSocket, msg: ILeaveGame) => {
	const game = engine.getGame(msg.payload.gameId);

	const currentUser = backendState.users.get(ws);
	if (!game) {
		currentUser?.setStatus('active');
		rej(ws, msg.id, 'game-not-found')
		return;
	}

	if (game.p1.id !== currentUser?.id && game.p2.id !== currentUser?.id) {
		currentUser?.setStatus('active');
		rej(ws, msg.id, 'not-part-of-game')
		return;
	}

	engine.leaveGame(game, currentUser);

	ack(ws, msg.id)

	const opponentConnectionId = game.p1.id === currentUser?.id ? game.p2.getConnectionId() : game.p1.getConnectionId();
	console.log(opponentConnectionId)
	const oppWs = backendState.clients.get(opponentConnectionId);
	
	if (!oppWs) {
		rej(ws, msg.id, 'opponent-not-found');
		return;
	}
	
	const opp = backendState.users.get(oppWs)
	
	oppLeftGame(oppWs, game);
}