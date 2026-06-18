import WebSocket from "ws";
import { genMsg } from "../../util/genMsg";
import { IMessageType } from "../../types/protocol";
import { Game } from "../game";

export const oppLeftGame = (ws: WebSocket, game: Game) => {
  ws.send(genMsg({
    id: crypto.randomUUID(),
    type: IMessageType.OPP_LEFT_GAME,	
    payload: {
      gameId: game.id,
    }
  }));
}