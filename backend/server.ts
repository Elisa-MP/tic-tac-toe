import { WebSocket, WebSocketServer } from 'ws';
import { Engine } from './engine';
import { User } from './user';
import { genMsg } from '../util/genMsg';
import { IMessageType, TClientMsg, type TServerMsg } from '../types/protocol';
import { handleClientMsg } from './msgHandler';

const port = 8080;

const wss = new WebSocketServer({
  port: port
});

const engine = new Engine();

const clients = new Map<string, WebSocket>();

// export const sendToUser = (userId: string, msg: TServerMsg) => {
//   clients.get(userId)?.send(
//     genMsg(msg)
//   );
// }

engine.on('lobby-updated', payload => {
  console.log(clients)
  clients.forEach(client => {
    client.send(genMsg({ id: crypto.randomUUID(), type: IMessageType.UPDATE_LOBBY, payload }));
  });
});

wss.on('connection', ws => {
  ws.send(genMsg({
    id: crypto.randomUUID(),
    type: IMessageType.WELCOME,
    payload: {
      msg: 'Welcome to the game!',
      connectionId: crypto.randomUUID(),
    }
  }));

  ws.on('message', data => {
    const msg = JSON.parse(data.toString()) as TClientMsg;
    const currentUser = (ws as any).user as User | undefined;
    handleClientMsg(engine, msg, ws, clients, currentUser);
  });

  ws.on('close', () => {
    const user = (ws as any).user as User | undefined;
    if (!user) {
      return;
    }

    // clients map uses connectionId as key (set in set-username handler)
    clients.delete(user.connectionId);

    setTimeout(() => {
      if (!clients.has(user!.connectionId)) {
        engine.removeUser(user!);
      }
    }, 10000);
  });

  ws.on('error', console.error);
});