import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { genMsg } from "../../util/genMsg";
import { User } from "../user";
import { IMessageType, IRejectInvite } from "../../types/protocol";

export const rejectInviteHandler = (engine: Engine, ws: WebSocket, msg: IRejectInvite, clients: Map<string, WebSocket>, currentUser?: User) => {
	const game = engine.getGame(msg.payload.gameId);

	if (!game) return;
	engine.cancelGame(game);

	const opponentId = game.p1.id === currentUser?.id ? game.p2.id : game.p1.id;
	const opponent = engine.users.get(opponentId)
	clients.get(opponent.getConnectionId())?.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.REJ,
		payload: {
			reqId: msg.id, // TODO: save id of invite message and use it here
			error: "Game invite rejected"
		}
	}));
}