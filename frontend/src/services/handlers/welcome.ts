import { $game } from "@/stores/game";
import type { IWelcome } from "../../../../types/protocol";
import { $connectionId, $screen, $userId } from "../../stores/connection";

export const welcomeHandler = (msg: IWelcome) => {
	const { msg: message, connectionId, userId, targetScreen, game } = msg.payload;

	console.log(message)

	const storageConnectionId = localStorage.getItem('connectionId')

	if(storageConnectionId && storageConnectionId === connectionId) {
		$userId.set(userId!)

		if(targetScreen === 'game' && game?.status === 'active') {
			$game.set(game)
			$screen.set(targetScreen)
		} else {
			$game.set(null)
			$screen.set('lobby')
		}
		return
	}

	localStorage.setItem('connectionId', connectionId);

	$connectionId.set(connectionId)
	$screen.set('login')


	// TODO: If !connected (nanostore speichern) show discconected message
}
