import { IMessageType } from "../../../../types/protocol";
import { genMsg } from "../../../../util/genMsg";
import { addPendingRequest } from "../pendingRequests";
import { socket } from "../socket-service";

export const leaveGame = (gameId: string) => {
	if (!socket.ws || socket.ws.readyState !== WebSocket.OPEN) {
		console.error('WebSocket is not open');
		return;
	}

	const reqId = crypto.randomUUID();
	addPendingRequest(reqId, 'leave-game');

	socket.ws.send(genMsg({
		id: reqId,
		type: IMessageType.LEAVE_GAME,
		payload: {
			gameId,
		}
	}));
}