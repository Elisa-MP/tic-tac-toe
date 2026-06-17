import type { WebSocket } from 'ws';
import { Engine } from "../engine";
import { welcome } from '../messages/welcome';
import { Hello } from '../../types/protocol';
import { backendState } from '../state';
import { User } from '../user';
import { Screen } from '../../types/shared';

const newClient = (ws: WebSocket) => {
  welcome(ws, crypto.randomUUID())
}

const restoreClient = (ws: WebSocket, user: User, engine: Engine) => {
  user.survive();

  backendState.clients.set(user.getConnectionId(), ws);
  backendState.users.set(ws, user);

  const game = engine.findUserGame(user)

  if(game && game.status === 'active') {
    welcome(ws, user.connectionId, user.id, 'game', game)
  }
  
  welcome(ws, user.connectionId, user.id)

  engine.updateLobby()
} 

export const helloHandler = (engine: Engine, ws: WebSocket, msg: Hello) => {
	const connectionId = msg.payload.connectionId;

  if(!connectionId) return newClient(ws)

  const user = engine.getUserByConnectionId(connectionId)
  if(!user) return newClient(ws)

  restoreClient(ws, user, engine)

};
