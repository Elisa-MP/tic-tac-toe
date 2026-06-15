<template>
	<BaseModal
		:show="game?.winner !== null || !game"
		:closable="false"
	>
	<template #header>
		<h2>Spiel beendet!</h2>
	</template>

	<p>{{ message }}</p>

	<template #buttons>
		<button
			@click="leave()"
		>
			Zurück zur Lobby
		</button>
	</template>
	
	</BaseModal>
</template>

<script setup lang="ts">
import { leaveGame } from '@/services/messages/leave-game.ts';
import BaseModal from './base-modal.vue';
import { $game } from '@/stores/game.ts';
import { computed } from 'vue';
import type { GameDO } from '../../../../types/shared.ts';
import { $screen } from '@/stores/connection.ts';
import { useStore } from '@nanostores/vue';

const game = useStore($game)

const props = defineProps<{
  game: GameDO
}>()

const leave = () => {
	if(game.value) leaveGame(game.value.id)
	$screen.set('lobby')
	// TODO handle error
}

const message = computed(() => {
	if(!game) return 'Gegner hat das Spiel verlassen!'

  const winner = props.game.winner

  if (winner === 'Unentschieden') return 'Unentschieden!'

  return `${winner?.name} hat gewonnen!`
})
</script>