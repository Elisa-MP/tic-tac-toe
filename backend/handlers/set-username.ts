import type { WebSocket } from 'ws';
import { genMsg } from "../../util/genMsg";
import { IMessageType, ISetUsername, TServerMsg } from "../../types/protocol";
import { Engine } from "../engine";
import { User } from "../user";

export const setUsernameHandler = (engine: Engine, ws: WebSocket, msg: ISetUsername, clients: Map<string, WebSocket>) => {
	const username = msg.payload.username?.trim();

	if (!username) {
    ws.send(genMsg({
      id: crypto.randomUUID(),
      type: IMessageType.REJ,
      payload: {
        reqId: msg.id,
        error: 'username-required'
      }
    }));
    return;
  }

	if (engine.getUserByName(username)) {
    ws.send(genMsg({
      id: crypto.randomUUID(),
      type: IMessageType.REJ,
      payload: {
        reqId: msg.id,
        error: 'duplicate-user'
      }
    }));
    return;
  }

	const user = new User(username, msg.payload.connectionId);
  clients.set(user.getConnectionId(), ws);
  console.log('ADDING CLIENT', user.getConnectionId())
  engine.addUser(user);

  (ws as any).user = user;

  ws.send(genMsg({
    id: msg.id,
    type: IMessageType.ACK,
    payload: {
      reqId: msg.id,
      message: `Welcome ${user.name}!`,
      userId: user.id
    }
  }));
};
