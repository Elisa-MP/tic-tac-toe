import { IGameMove } from "../../types/protocol";
import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { updateBoard } from "../messages/update-board";
import { rej } from "../messages/rej";
import { backendState } from "../state";

export const gameMoveHandler = (engine: Engine, ws: WebSocket, msg: IGameMove) => {
	
	const { gameId, field } = msg.payload
	
	const game = engine.getGame(gameId);

	if (!game) {
		rej(ws, msg.id, 'game-not-found')
		return;
	}

	const currentUser = backendState.users.get(ws);

	if (game.activePlayer.id !== currentUser?.id) {
		rej(ws, msg.id, 'not-your-turn')
		return;
	}	

	try {
		game.move(currentUser, field)
	} catch(e) {
		rej(ws, msg.id, `${e}`)
		return;
	}

	const players = [
		backendState.clients.get(game.p1.getConnectionId()), 
		backendState.clients.get(game.p2.getConnectionId())
	];


	players.forEach(p => {
		if(p) updateBoard(p, game)
	});
}

