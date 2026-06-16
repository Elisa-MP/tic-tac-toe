import type { IREJ } from "../../../../types/protocol";
import { consumePendingRequest } from "../pendingRequests";

export const rejHandler = (msg: IREJ) => {
	const { reqId, error } = msg.payload;
	const pending = consumePendingRequest(reqId);
	console.log(pending)
	console.log('why here ?')
	console.error(`REJ for request ${reqId}:`, pending);
	

	if(pending === 'set-username') {
	}

	if(pending === 'create-game') {
		// TODO: close 'waiting for opp modal' 
	}

}
