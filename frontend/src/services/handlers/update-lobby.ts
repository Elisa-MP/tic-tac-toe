import type { IUpdateLobby } from "../../../../types/protocol";
import { $lobby } from "../../stores/lobby";

export const updateLobbyHandler = (msg: IUpdateLobby) => {
	const { lobby } = msg.payload;
	
	console.log('Updating lobby with users:', lobby);
	
	$lobby.set(lobby);
}
