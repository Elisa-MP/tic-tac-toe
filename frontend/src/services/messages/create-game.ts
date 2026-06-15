import { IMessageType } from "../../../../types/protocol";
import { genMsg } from "../../../../util/genMsg";
import { addPendingRequest } from "../pendingRequests";
import { socket } from "../socket-service";

export const createGame = (opponentId: string) => {
	if (!socket.ws || socket.ws.readyState !== WebSocket.OPEN) {
		console.error('WebSocket is not open');
		return;
	}

	const reqId = crypto.randomUUID();
	addPendingRequest(reqId, 'create-game')

	socket.ws.send(genMsg({
		id: reqId,
		type: IMessageType.CREATE_GAME,
		payload: {
			opponentId,
		}
	}));
}