import type { IWelcome } from "../../../../types/protocol";
import { $username, $connectionId, $connected, $screen } from "../../stores/connection";

export const welcomeHandler = (msg: IWelcome) => {
	const { msg: message, connectionId } = msg.payload;
	
	console.log('Welcome message:', message);
	
	if (connectionId) {
		$connectionId.set(connectionId);
	}
	
	$connected.set(true);
}
