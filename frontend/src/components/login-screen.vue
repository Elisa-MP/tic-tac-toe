<script setup lang="ts">
import { ref } from 'vue';
import { socket } from '../services/socket-service';
import { setUsername } from '@/services/messages/set-username';

const username = ref('');

const login = (e: SubmitEvent) => {
	e.preventDefault();
  if (!username.value.trim()) return
  setUsername(username.value.trim())
}

</script>

<template>
	<form @submit="login">
		<input v-model="username" />

		<button
			type="submit"
		>
			Verbinden
		</button>
	</form>
</template>