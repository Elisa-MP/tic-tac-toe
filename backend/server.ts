import { WebSocketServer } from 'ws';
import { Engine } from './engine';
import { User } from './user';
import { genMsg } from '../util/genMsg';
import { IMessageType, TClientMsg, type TServerMsg } from '../types/protocol';
import { handleClientMsg } from './msg-handler';
import { backendState } from './state';
import { welcome } from './messages/welcome';
import { oppLeftGame } from './messages/opp-left-game';

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

  ws.on('message', data => {
    const msg = JSON.parse(data.toString()) as TClientMsg;
    handleClientMsg(engine, msg, ws);
  });

  ws.on('close', () => {
    const user = users.get(ws)
    if (!user) {
      return;
    }


    clients.delete(user.connectionId);
    users.delete(ws);

    user.setSelfdestruct(
      setTimeout(() => {
      if (!clients.has(user!.connectionId)) {
        const activeGame = engine.findUserGame(user)

        if(activeGame) {
          const game = engine.getGame(activeGame.id)

          if(game) {
            engine.cancelGame(game)
            const opp = game.p1.id === user.id ? game.p2 : game.p1
            const oppWs = clients.get(opp.connectionId)

            if(oppWs) oppLeftGame(oppWs, game)
          }
        }
        engine.removeUser(user!);
      }
    }, 5000));
  });

  ws.on('error', console.error);
});