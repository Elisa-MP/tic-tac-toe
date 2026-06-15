import type { TServerMsg } from "../../../types/protocol";
import { IMessageType } from "../../../types/protocol";
import { ackHandler } from "./handlers/ack";
import { gameInviteHandler } from "./handlers/game-invite";
import { gameStartHandler } from "./handlers/game-start";
import { oppLeftGameHandler } from "./handlers/opp-left-game";
import { rejHandler } from "./handlers/rej";
import { updateBoardHandler } from "./handlers/update-board";
import { updateLobbyHandler } from "./handlers/update-lobby";
import { welcomeHandler } from "./handlers/welcome";


export const handleServerMsg = (msg: TServerMsg, ws: WebSocket) => {
	switch (msg.type) {
		case IMessageType.WELCOME:
			welcomeHandler(msg);
			break;
		case IMessageType.ACK:
			ackHandler(msg);
			break;
		case IMessageType.REJ:
			rejHandler(msg);
			break;
		case IMessageType.UPDATE_LOBBY:
			updateLobbyHandler(msg);
			break;
		case IMessageType.GAME_INVITE:
			gameInviteHandler(msg);
			break;
		case IMessageType.GAME_START:
			gameStartHandler(msg);
			break;
		case IMessageType.UPDATE_BOARD:
			updateBoardHandler(msg);
			break;
		case IMessageType.OPP_LEFT_GAME:
			oppLeftGameHandler(msg);
			break;
		default:
			console.log('Unknown message type:', msg);
	}
}