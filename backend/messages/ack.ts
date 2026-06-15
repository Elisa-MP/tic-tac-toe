import WebSocket from "ws";
import { genMsg } from "../../util/genMsg";
import { IMessageType } from "../../types/protocol";

export const ack = (ws: WebSocket, reqId?: string, msg?: string, userId?: string) => {

  ws.send(genMsg({
    id: crypto.randomUUID(),
    type: IMessageType.ACK,	
    payload: {
      reqId: reqId ? reqId : '',
      message: msg ? msg : '',
      userId: userId ? userId : ''
    }
  }));
}