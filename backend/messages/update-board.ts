import WebSocket from "ws";
import { genMsg } from "../../util/genMsg";
import { IMessageType } from "../../types/protocol";
import { Game } from "../game";

export const updateBoard = (ws: WebSocket, game: Game) => {

	ws.send(genMsg({
		id: crypto.randomUUID(),
		type: IMessageType.UPDATE_BOARD,	
		payload: {
			game: game.toJSON(),
		}
	}));
}