<template>

  <GameOverModal 
    v-if="game"
    :game="game"
  />
  <div>
    <h2>{{ myturn ? 'Du bist dran!' : 'Genger am Zug!' }}</h2>

  <div class="board">
    <div
      v-for="(field, index) in game?.board"
      :key="index"
      class="field"
      :class="{
        disabled: field !== null || !myturn
      }"
      @click="move(index)"
    >
      {{ field ?? '' }}
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { gameMove } from '@/services/messages/game-move';
import { $game, $isMyTurn } from '@/stores/game';
import { useStore } from '@nanostores/vue';
import GameOverModal from './modals/game-over-modal.vue';

  const myturn = useStore($isMyTurn)
  const game = useStore($game)

  const move = (index: number) => {
    if(!game.value || !myturn) return
    // TODO error handling

    if(game.value.board[index] !== null) return
    gameMove(game.value?.id, index)
  }
</script>

<style>
.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 4px;
}

.field {
  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid var(--accent);
  cursor: pointer;
  font-size: 2em;
}

.field.disabled {
  cursor: not-allowed;
}
</style>