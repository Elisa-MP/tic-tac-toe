import WebSocket from "ws";
import { IMessageType } from "../../types/protocol";
import { genMsg } from "../../util/genMsg"

export const welcome = (ws: WebSocket) => {
  ws.send(genMsg({
    id: crypto.randomUUID(),
    type: IMessageType.WELCOME,
    payload: {
      msg: 'Welcome to the game!',
      connectionId: crypto.randomUUID(),
    }
  }));
}