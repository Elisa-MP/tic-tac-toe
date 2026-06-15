import { IMessageType } from "../../../../types/protocol";
import { genMsg } from "../../../../util/genMsg";
import { socket } from "../socket-service";

export const gameMove = (gameId: string, field: number) => {
	if (!socket.ws || socket.ws.readyState !== WebSocket.OPEN) {
		console.error('WebSocket is not open');
		return;
	}

	socket.ws.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.GAME_MOVE,
		payload: {
			gameId,
			field,
		}
	}));
}
