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
	if(msg.type === IMessageType.WELCOME) {
		welcomeHandler(msg);
		return
	}
	if(msg.type === IMessageType.ACK) {
		ackHandler(msg);
		return
	}
	if(msg.type === IMessageType.REJ) {	
		rejHandler(msg);
		return;
	}
	if(msg.type === IMessageType.UPDATE_LOBBY) {
		updateLobbyHandler(msg);
		return
	}
	if(msg.type === IMessageType.GAME_INVITE) {
		gameInviteHandler(msg);
		return
	}
	if(msg.type === IMessageType.GAME_START) {
		gameStartHandler(msg);
		return
	}
	if(msg.type === IMessageType.UPDATE_BOARD) {
		updateBoardHandler(msg);
		return
	}
	if(msg.type === IMessageType.OPP_LEFT_GAME) {
		oppLeftGameHandler(msg);
		return
	}
}