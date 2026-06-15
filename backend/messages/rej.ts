import WebSocket from "ws";
import { genMsg } from "../../util/genMsg";
import { IMessageType } from "../../types/protocol";

export const rej = (ws: WebSocket, reqId?: string, error?: string) => {

  ws.send(genMsg({
    id: crypto.randomUUID(),
    type: IMessageType.REJ,	
    payload: {
      reqId: reqId ? reqId : '',
      error: error ? error : ''
    }
  }));
}