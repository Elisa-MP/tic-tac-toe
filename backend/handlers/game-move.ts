import { IGameMove, IMessageType } from "../../types/protocol";
import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { genMsg } from "../../util/genMsg";
import { User } from "../user";

export const gameMoveHandler = (engine: Engine, ws: WebSocket, msg: IGameMove, clients: Map<string, WebSocket>, currentUser?: User) => {
	const game = engine.getGame(msg.payload.gameId);

	if (!game) {
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

	if (game.activePlayer.id !== currentUser?.id) {
		ws.send(genMsg({
			id: crypto.randomUUID(),
			type: IMessageType.REJ,
			payload: {
				reqId: msg.id,
				error: "Not your turn"
			}
		}));
		return;
	}	

	const gameDO = game.move(currentUser, msg.payload.field);

	const players = [clients.get(game.p1.getConnectionId()), clients.get(game.p2.getConnectionId())];	

	if (gameDO) {
		players.forEach(p => p?.send(genMsg({
			id: crypto.randomUUID(),
			type: IMessageType.UPDATE_BOARD,	
			payload: {
				game: gameDO,
			}
		})));
	};
}