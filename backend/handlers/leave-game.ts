import { ILeaveGame, IMessageType } from "../../types/protocol";
import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { genMsg } from "../../util/genMsg";
import { User } from "../user";

export const leaveGameHandler = (engine: Engine, ws: WebSocket, msg: ILeaveGame, clients: Map<string, WebSocket>, currentUser?: User) => {
	const game = engine.getGame(msg.payload.gameId);

	if (!game) {
		currentUser?.setStatus('active');
		ws.send(genMsg({
			id: crypto.randomUUID(),
			type: IMessageType.REJ,
			payload: {
				reqId: msg.id,
				error: "Game not found"
			}
		}));
		return;
	}

	if (game.p1.id !== currentUser?.id && game.p2.id !== currentUser?.id) {
		currentUser?.setStatus('active');
		ws.send(genMsg({
			id: crypto.randomUUID(),
			type: IMessageType.REJ,
			payload: {
				reqId: msg.id,
				error: "You are not a player in this game"
			}
		}));
		return;
	}

	engine.leaveGame(game, currentUser);

	ws.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.ACK,	
		payload: {
			reqId: msg.id
		}
	}));

	const opponentConnectionId = game.p1.id === currentUser?.id ? game.p2.getConnectionId() : game.p1.getConnectionId();
	
	clients.get(opponentConnectionId)?.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.OPP_LEFT_GAME,
		payload: {
			gameId: game.id,
		}
	}));
}