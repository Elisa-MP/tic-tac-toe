<script setup lang="ts">
import { ref } from 'vue';
import { socket } from '../services/socket-service';
import { setUsername } from '@/services/messages/set-username';

const username = ref('');

const login = () => {
  if (!username.value.trim()) return
  setUsername(username.value.trim())
}

</script>

<template>
	<input v-model="username" />

	<button
		@click="login"
	>
		Verbinden
	</button>
</template>