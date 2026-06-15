import type { IGameStart } from "../../../../types/protocol";
import { $game, $isMyTurn } from "../../stores/game";
import { $screen, $userId } from "../../stores/connection";

export const gameStartHandler = (msg: IGameStart) => {
	const { game } = msg.payload;
	
	console.log('Game started:', game);

	const currentGame = $game.get()

	// if(!currentGame || currentGame.id !== game.id) {
	// 	// TODO handle error, inform Opp
	//		// save gameId in inviting users frontend
	// 	return
	// }
	$game.set(game)
	$isMyTurn.set(game.activePlayerId === $userId.get());
	
	$screen.set('game');
}
