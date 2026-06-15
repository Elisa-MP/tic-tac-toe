export type PendingRequestType = 'set-username' | 'create-game' | 'leave-game';

const pendingRequests = new Map<string, PendingRequestType>();

export const addPendingRequest = (reqId: string, requestType: PendingRequestType) => {
  pendingRequests.set(reqId, requestType);
};

export const consumePendingRequest = (reqId: string) => {
  const requestType = pendingRequests.get(reqId);
  pendingRequests.delete(reqId);
  return requestType;
};
