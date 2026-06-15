import type { WebSocket } from 'ws';
import { IMessageType, TClientMsg } from "../types/protocol";
import { Engine } from "./engine";
import { User } from './user';
import { setUsernameHandler } from './handlers/set-username';
import { createGameHandler } from './handlers/create-game';
import { acceptInviteHandler } from './handlers/accept-invite';
import { rejectInviteHandler } from './handlers/reject-invite';
import { leaveGameHandler } from './handlers/leave-game';
import { gameMoveHandler } from './handlers/game-move';

export const handleClientMsg = (engine: Engine, msg: TClientMsg, ws: WebSocket) => {
	if(msg.type === IMessageType.SET_USERNAME) {
		setUsernameHandler(engine, ws, msg);
		return
	}
	if(msg.type === IMessageType.CREATE_GAME) {
		createGameHandler(engine, ws, msg);
		return
	}
	if(msg.type === IMessageType.ACCEPT_INVITE) {
		acceptInviteHandler(engine, ws, msg);
		return
	}
	if(msg.type === IMessageType.REJ_INVITE) {
		rejectInviteHandler(engine, ws, msg);
		return
	};
	if(msg.type === IMessageType.LEAVE_GAME) {
		leaveGameHandler(engine, ws, msg);
		return
	}
	if(msg.type === IMessageType.GAME_MOVE) {
		gameMoveHandler(engine, ws, msg);
		return
	}
}