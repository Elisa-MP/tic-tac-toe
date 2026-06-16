import type { TServerMsg } from "../../../types/protocol";
import { handleServerMsg } from "./msg-handler";

class SocketService implements SocketService {
  ws?: WebSocket;

  connect() {
    this.ws = new WebSocket(
      'wss://api.tictactoe.pircher.tech'
    );

    this.ws.onopen = () => {
      console.log('connected')
    }

    this.ws.onclose = () => {
      console.log('disconnected')
    }

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data.toString()) as TServerMsg;
      handleServerMsg(msg, this.ws!);
    }
  }

  send(
    type: string,
    payload: object
  ) {
    this.ws?.send(
      JSON.stringify({
        id: crypto.randomUUID(),
        type,
        payload
      })
    );
  }
}

export const socket: SocketService =
  new SocketService();
