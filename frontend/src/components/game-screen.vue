<template>

  <GameOverModal 
    v-if="game"
    :game="game"
  />
  <div>
    <h2 class="title">{{ myturn ? 'Du bist dran!' : 'Genger am Zug!' }}</h2>

    <div class="board">
      <div
        v-for="(field, index) in game?.board"
        :key="index"
        class="field"
        :class="{
          disabled: field !== null || !myturn,
          markedX: field === 'X',
          markedO: field === 'O',
        }"
        @click="move(index)"
      >
        {{ field ?? '' }}
      </div>
    </div>
    <button
      @click="leave"
      class="leave"
    >
      Spiel verlassen
    </button>
  </div>
</template>

<script setup lang="ts">
import { gameMove } from '@/services/messages/game-move';
import { $game, $isMyTurn } from '@/stores/game';
import { useStore } from '@nanostores/vue';
import GameOverModal from './modals/game-over-modal.vue';
import { leaveGame } from '@/services/messages/leave-game.ts';
import { $screen } from '@/stores/connection.ts';

  const myturn = useStore($isMyTurn)
  const game = useStore($game)

  const move = (index: number) => {
    if(!game.value || !myturn) return
    // TODO error handling

    if(game.value.board[index] !== null) return
    gameMove(game.value?.id, index)
  }

  const leave = () => {
	if(game.value) leaveGame(game.value.id)
	$screen.set('lobby')
	// TODO handle error
  // TODO do something smarter with the buttons, maybe component
}
</script>

<style>

.title {
  text-align: center;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 4px;
  margin: 1em 0;
}

.field {
  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid var(--accent);
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 2em;
}

.field.disabled {
  cursor: not-allowed;
}

.markedX {
  background-color: var(--accent);
  color: var(--background);
}

.markedO {
  background-color: var(--dark);
}

</style>