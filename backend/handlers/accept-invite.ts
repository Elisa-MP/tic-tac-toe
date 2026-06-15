import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { genMsg } from "../../util/genMsg";
import { User } from "../user";
import { IAcceptInvite, IMessageType } from "../../types/protocol";

export const acceptInviteHandler = (engine: Engine, ws: WebSocket, msg: IAcceptInvite, clients: Map<string, WebSocket>, currentUser?: User) => {
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

	engine.startGame(game);

	const players = [clients.get(game.p1.getConnectionId()), clients.get(game.p2.getConnectionId())];

	players.forEach(p => p?.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.GAME_START,
		payload: {
			game: {
				id: game.id,
				p1: {
					id: game.p1.id,
					name: game.p1.name,
					status: game.p1.status
				},
				p2: {
					id: game.p2.id,
					name: game.p2.name,
					status: game.p2.status
				},
				status: game.status,
				activePlayerId: game.activePlayer.id,
				board: game.getBoard(),
				winner: game.winner,
			}
		}
	})));
}