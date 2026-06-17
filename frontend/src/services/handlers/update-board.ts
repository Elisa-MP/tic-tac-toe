import type { IUpdateBoard } from "../../../../types/protocol";
import { $game, $isMyTurn } from "../../stores/game";
import { $connectionId } from "@/stores/connection";

export const updateBoardHandler = (msg: IUpdateBoard) => {
	const { game } = msg.payload;
		
	$game.set(game)
	$isMyTurn.set(game.activePlayerId === $connectionId.value);
	
}
