import WebSocket from "ws";
import { User } from "./user";

export const backendState = {
  clients: new Map<string, WebSocket>(),
  users: new WeakMap<WebSocket, User>(),
};

