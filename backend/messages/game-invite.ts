import WebSocket from "ws";
import { genMsg } from "../../util/genMsg";
import { IMessageType } from "../../types/protocol";
import { Game } from "../game";

export const gameInvite = (ws: WebSocket, game: Game) => {

  ws.send(genMsg({
    id: crypto.randomUUID(),
    type: IMessageType.GAME_INVITE,	
    payload: {
      game: game.toJSON(),
    }
  }));
}