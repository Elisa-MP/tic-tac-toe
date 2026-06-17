import WebSocket from "ws";
import { IMessageType } from "../../types/protocol";
import { genMsg } from "../../util/genMsg"
import { GameDO, Screen } from "../../types/shared";

export const welcome = (ws: WebSocket, connectionId: string, userId?: string, targetScreen?: Screen, game?: GameDO) => {
  ws.send(genMsg({
    id: crypto.randomUUID(),
    type: IMessageType.WELCOME,
    payload: {
      msg: 'Welcome to the game!',
      connectionId,
      userId,
      targetScreen: targetScreen || 'login',
      game
    }
  }));
}