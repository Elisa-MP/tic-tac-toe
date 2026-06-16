<template>
  <BaseModal
    :show="props.show"
		:closable="false"
    @update:show="emit('update:show', $event)"
  >
    <template #header>
      <h2 v-if="!invited">{{ player.name }} herausfordern ?</h2>
      <h2 v-else>Warten auf {{ player.name }}!</h2>
    </template>

    <template #buttons v-if="!invited">
      <button @click="invite">
        Einladen
      </button>
  
      <button
        @click="emit('update:show', false)"
      >
        Abbrechen
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './base-modal.vue'
import type { UserDO } from '../../../../types/shared'
import { createGame } from '@/services/messages/create-game.ts';
import { ref } from 'vue';

const props = defineProps<{
  player: UserDO
  show: boolean
}>()

const invited = ref(false);

const emit = defineEmits([
  'update:show'
])

const invite = () => {
  createGame(props.player.id)
  invited.value = true;
}
</script>