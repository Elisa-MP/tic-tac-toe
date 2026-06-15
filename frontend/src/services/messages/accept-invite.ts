import type { GameDO } from "../../../../types/shared";
import { IMessageType } from "../../../../types/protocol";
import { socket } from "../socket-service";
import { genMsg } from "../../../../util/genMsg";

export const acceptInvite = (game: GameDO) => {
	if (!socket.ws || socket.ws.readyState !== WebSocket.OPEN) {
		console.error('WebSocket is not open');
		return;
	}

	socket.ws.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.ACCEPT_INVITE,
		payload: {
			gameId: game.id
		}
	}));
}

