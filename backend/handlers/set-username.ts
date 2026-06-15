import type { WebSocket } from 'ws';
import { ISetUsername } from "../../types/protocol";
import { Engine } from "../engine";
import { User } from "../user";
import { backendState } from '../state';
import { rej } from '../messages/rej'
import { ack } from '../messages/ack'

export const setUsernameHandler = (engine: Engine, ws: WebSocket, msg: ISetUsername) => {
	const username = msg.payload.username?.trim();

	if (!username) {
    rej(ws, msg.id, 'username-required')
    return;
  }

	if (engine.getUserByName(username)) {
    rej(ws, msg.id, 'duplicate-user')
    return;
  }

	const user = new User(username, msg.payload.connectionId);

  backendState.clients.set(user.getConnectionId(), ws);
  backendState.users.set(ws, user);
  engine.addUser(user);

  ack(ws, msg.id, `Welcome ${user.name}!`, user.id)
};
