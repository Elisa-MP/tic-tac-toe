<template>
  <BaseModal
    :show="props.show"
    @update:show="emit('update:show', $event)"
  >
    <template #header>
      <h2>{{ player.name }} herausfordern ?</h2>
    </template>

    <template #buttons>
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

const props = defineProps<{
  player: UserDO
  show: boolean
}>()

const emit = defineEmits([
  'update:show'
])

const invite = () => {
  createGame(props.player.id)
  emit("update:show", false)
}
</script>