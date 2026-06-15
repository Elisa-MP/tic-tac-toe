import { ICreateGame, IMessageType } from "../../types/protocol";
import { Engine } from "../engine";
import type { WebSocket } from 'ws';
import { genMsg } from "../../util/genMsg";
import { User } from "../user";

export const createGameHandler = (engine: Engine, ws: WebSocket, msg: ICreateGame, clients: Map<string, WebSocket>, currentUser?: User) => {
	if (!currentUser) {
		ws.send(genMsg({
			id: crypto.randomUUID(),
			type: IMessageType.REJ,
			payload: {
				reqId: msg.id,
				error: 'undefined-user'
			}
		}));
		return;
	}

	const opponent = engine.getUserById(msg.payload.opponentId);
	if (!opponent) {
		ws.send(genMsg({
			id: crypto.randomUUID(),
			type: IMessageType.REJ,
			payload: {
				reqId: msg.id,
				error: 'opponent-not-found'
			}
		}));
		return;
	}

	console.log(opponent)
	console.log('CREATE G OPP CONN ID', opponent.getConnectionId())
	console.log(clients.keys())
	console.log(clients.get(opponent.getConnectionId()) !== undefined)

	if(currentUser.status === 'active' && opponent.status === 'active') {
		const game = engine.createGame(currentUser, opponent);
		const oppWs = clients.get(opponent.getConnectionId());
		if (!oppWs) {
			ws.send(genMsg({
				id: crypto.randomUUID(),
				type: IMessageType.REJ,
				payload: {
					reqId: msg.id,
					error: 'opponent-disconnected'
				}
			}));
			return;
		}
		oppWs.send(genMsg({
			id: crypto.randomUUID(),
			type: IMessageType.GAME_INVITE,
			payload: {
				game: game.getGameDO(),
			}
		}));
	} else {
		ws.send(genMsg({
			id: crypto.randomUUID(),
			type: IMessageType.REJ,
			payload: {
				reqId: msg.id,
				error: 'user-busy'
			}
		}));
		return;
	}
}
