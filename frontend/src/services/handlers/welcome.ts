import type { IWelcome } from "../../../../types/protocol";
import { $username, $connectionId, $connected, $screen } from "../../stores/connection";

export const welcomeHandler = (msg: IWelcome) => {
	const { msg: message, connectionId } = msg.payload;
	const storedConnectionId = localStorage.getItem('connectionId');

	console.log('Welcome message:', message);

	if (storedConnectionId) {
		$connectionId.set(storedConnectionId);
	} else if (connectionId) {
		$connectionId.set(connectionId);
		localStorage.setItem('connectionId', connectionId);
	}
	
	$connected.set(true);
}
