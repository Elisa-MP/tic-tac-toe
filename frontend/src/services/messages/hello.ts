import { IMessageType } from "../../../../types/protocol";
import { genMsg } from "../../../../util/genMsg";
import { socket } from "../socket-service";

export const hello = (cId?: string) => {
	if (!socket.ws || socket.ws.readyState !== WebSocket.OPEN) {
		console.error('WebSocket is not open');
		return;
	}

	const connectionId = cId || localStorage.getItem('connectionId') || undefined;

	socket.ws.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.HELLO,
		payload: {
			connectionId,
		}
	}));
}
