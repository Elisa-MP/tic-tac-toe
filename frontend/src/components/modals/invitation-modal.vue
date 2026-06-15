<template>
	<BaseModal
		:show="props.show"
		:closable="false"
		@update:show="emit('update:show', $event)"
	>
		<template #header>
			<h2>Herausforderung</h2>
		</template>

		<p>{{ opponent.name }} fordert dich heraus!</p>

		<template #buttons>
			<button @click="accept">
				Annehmen
			</button>
			
			<button @click="reject">
				Ablehnen
			</button>
		</template>
	
	</BaseModal>
</template>

<script setup lang="ts">
import { $userId } from '@/stores/connection';
import type { GameDO } from '../../../../types/shared';
import BaseModal from './base-modal.vue';
import { acceptInvite } from '@/services/messages/accept-invite.ts';
import { rejectInvite } from '@/services/messages/reject-invite.ts';

const props = defineProps<{
	game: GameDO
	show: boolean
}>()

const opponent = props.game.p1.id === $userId.value ? props.game.p2 : props.game.p1;

const emit = defineEmits([
	'update:show'
])

const accept = () => {
	acceptInvite(props.game)
	close()
}

const reject = () => {
	rejectInvite(props.game)
	close()
}
</script>
