import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { IAcceptInvite } from "../../types/protocol";
import { rej } from "../messages/rej";
import { backendState } from "../state";
import { gameStart } from "../messages/game-start";

export const acceptInviteHandler = (engine: Engine, ws: WebSocket, msg: IAcceptInvite) => {
	const game = engine.getGame(msg.payload.gameId);

	if (!game) {
		rej(ws, msg.id, 'game-not-found')
		return;
	}

	engine.startGame(game);

	const players = [
		backendState.clients.get(game.p1.getConnectionId()), 
		backendState.clients.get(game.p2.getConnectionId())
	];


	players.forEach(p => {
		if(p) gameStart(p, game)
	});
}