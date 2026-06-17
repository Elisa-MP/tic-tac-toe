import { $userId } from "@/stores/connection";
import type { IGameInvite } from "../../../../types/protocol";
import { $game } from "@/stores/game";
import { rejectInvite } from "../messages/reject-invite";

export const gameInviteHandler = (msg: IGameInvite) => {
	const { game } = msg.payload;

	const currentGame = $game.get()

	if(currentGame) {
		rejectInvite(game)
		return
	}

	$game.set(game)
	const id = $userId.get();
	
	console.log('game invite', msg)
}
