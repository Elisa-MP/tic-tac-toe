import { $game } from "@/stores/game";
import type { IACK } from "../../../../types/protocol";
import { $screen, $userId } from "../../stores/connection";
import { consumePendingRequest } from "../pendingRequests";

export const ackHandler = (msg: IACK) => { 	
	const { reqId, message, userId } = msg.payload;
	const pending = consumePendingRequest(reqId);

	console.log(`ACK for request ${reqId}:`, message, pending);

	if(pending === 'set-username') {
		$screen.set('lobby');
		$userId.set(userId || '');
	}
	if( pending === 'leave-game') {
		$screen.set('lobby')
		$game.set(null)
	}
};
