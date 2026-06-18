<script setup lang="ts">
import { useStore } from '@nanostores/vue';

import LoginScreen from './components/login-screen.vue';
import { $connectionId, $screen } from './stores/connection.ts';
import LobbyScreen from './components/lobby-screen.vue';
import GameScreen from './components/game-screen.vue';
import { $game } from './stores/game.ts';

  const screen = useStore($screen);
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Tic Tac Toe</h1>
  
    <div class="inner-wrapper">
      <LoginScreen v-if="screen === 'login'" />
      <LobbyScreen v-else-if="screen === 'lobby'" />
      <GameScreen v-else-if="screen === 'game'" />
    </div>
  </div>
</template>

<style scoped>

.title {
  text-align: center;
  border-bottom: 1px solid var(--accent);
  max-width: 20em;
  min-width: 10em;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--accent);
  border-radius: 1em;
  box-shadow: 2px 2px 5px -2px var(--accent) ;
  padding: 3em;
  margin-top: 10em;
}

.inner-wrapper {
  width: 100%;
}

</style>
