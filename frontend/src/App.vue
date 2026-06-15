<script setup lang="ts">
import { useStore } from '@nanostores/vue';

import LoginScreen from './components/login-screen.vue';
import { $screen } from './stores/connection.ts';
import LobbyScreen from './components/lobby-screen.vue';
import GameScreen from './components/game-screen.vue';

  const screen = useStore($screen);
</script>

<template>
  <div class="background">
    <h1>Tic Tac Toe</h1>
  
    <LoginScreen v-if="screen === 'login'" />
    <LobbyScreen v-else-if="screen === 'lobby'" />
    <GameScreen v-else-if="screen === 'game'" />
  </div>
</template>

<style scoped>



</style>
