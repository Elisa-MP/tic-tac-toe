import { WebSocketServer } from 'ws';
import { Engine } from './engine';
import { User } from './user';
import { genMsg } from '../util/genMsg';
import { IMessageType, TClientMsg, type TServerMsg } from '../types/protocol';
import { handleClientMsg } from './msg-handler';
import { backendState } from './state';
import { welcome } from './messages/welcome';

const port = 8080;

const wss = new WebSocketServer({
  port: port
});

const engine = new Engine();

const clients = backendState.clients;
const users = backendState.users;

engine.on('lobby-updated', payload => {
  clients.forEach(client => {
    client.send(genMsg({ id: crypto.randomUUID(), type: IMessageType.UPDATE_LOBBY, payload }));
  });
});

wss.on('connection', ws => {
  // welcome(ws);

  ws.on('message', data => {
    const msg = JSON.parse(data.toString()) as TClientMsg;
    handleClientMsg(engine, msg, ws);
  });

  ws.on('close', () => {
    const user = (ws as any).user as User | undefined;
    if (!user) {
      return;
    }

    clients.delete(user.connectionId);
    users.delete(ws);

    user.setSelfdestruct(
      setTimeout(() => {
      if (!clients.has(user!.connectionId)) {
        engine.removeUser(user!);
      }
    }, 10000));
  });

  ws.on('error', console.error);
});