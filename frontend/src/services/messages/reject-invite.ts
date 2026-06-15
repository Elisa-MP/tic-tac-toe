import type { GameDO } from "../../../../types/shared";
import { IMessageType } from "../../../../types/protocol";
import { socket } from "../socket-service";
import { genMsg } from "../../../../util/genMsg";
import { $game } from "@/stores/game";

export const rejectInvite = (game: GameDO) => {
	if (!socket.ws || socket.ws.readyState !== WebSocket.OPEN) {
		console.error('WebSocket is not open');
		return;
	}

	socket.ws.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.REJ_INVITE,
		payload: {
			gameId: game.id
		}
	}));

	$game.set(null);
}
