<script setup lang="ts">
import { ref } from 'vue';
import { setUsername } from '@/services/messages/set-username';

const username = ref('');

const login = (e: SubmitEvent) => {
	e.preventDefault();
  if (!username.value.trim()) return
  setUsername(username.value.trim())
}

</script>
<template>
	<div class="login">
		<p>Wähle einen Benutzernamen!</p>
		<form @submit="login">
			
			<input class="username" v-model="username" />
			
			<button
			type="submit"
			>
			Verbinden
			</button>
		</form>
	</div>
</template>

<style>

.username {
	height: 2em;
	border-radius: 0.5em;
}

.login {
	text-align: center;
}

</style>
