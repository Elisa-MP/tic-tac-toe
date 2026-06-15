import { IMessageType } from "../../../../types/protocol";
import { genMsg } from "../../../../util/genMsg";
import { $connectionId } from "@/stores/connection";
import { socket } from '../socket-service';
import { addPendingRequest } from '../pendingRequests';

export const setUsername = (username: string) => {

	if (!username.trim()) {
		console.error("Username cannot be empty");
		return;
	}

	const connectionId = $connectionId.get();
	if (!connectionId) {
		console.error('No connectionId yet');
		return;
	}

	if (!socket.ws || socket.ws.readyState !== WebSocket.OPEN) {
		console.error('WebSocket is not open');
		return;
	}

	const reqId = crypto.randomUUID();
	addPendingRequest(reqId, 'set-username');

	socket.ws.send(genMsg({
		id: reqId,
		type: IMessageType.SET_USERNAME,
		payload: {
			username: username.trim(),
			connectionId,
		}
	}));
}