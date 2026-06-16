import { $game, $isMyTurn } from "@/stores/game";
import type { IOppLeftGame } from "../../../../types/protocol";
import { $screen } from "../../stores/connection";
import { $lobby } from "@/stores/lobby";

export const oppLeftGameHandler = (msg: IOppLeftGame) => {
	const { gameId } = msg.payload;
	
	console.log('Opponent left game:', gameId);
	
	$game.set(null);
	$isMyTurn.set(false);
	$screen.set('lobby')
	// TODO: 
	// - Benutzer mit Modal benachrichtigen dass der Gegner das Spiel verlassen hat
	// - Zur Lobby zurückkehren option

}
