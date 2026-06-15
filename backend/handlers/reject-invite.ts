import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { IRejectInvite } from "../../types/protocol";
import { backendState } from "../state";
import { rej } from "../messages/rej";

export const rejectInviteHandler = (engine: Engine, ws: WebSocket, msg: IRejectInvite) => {
	const game = engine.getGame(msg.payload.gameId);

	if (!game) return;
	engine.cancelGame(game);

	const currentUser = backendState.users.get(ws);
	
	const opponentId = game.p1.id === currentUser?.id ? game.p2.id : game.p1.id;
	const opponent = engine.getUserById(opponentId);

	if(!opponent) return;

	const opponentWs = backendState.clients.get(opponent?.connectionId);

	if(!opponentWs) return;
	
	rej(opponentWs, msg.id, 'Game invite rejected')

	// TODO: save id of invite message and use it here
}