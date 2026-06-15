<template>

  <SendInviteModal 
    v-if="selected"
    v-model:show="show" 
    :player="selected" 
  />
  <InvitationModal
    v-if="game"  
    :show="true"
    :game="game"
  />
  <div>
    <h2>Lobby</h2>
    <p>Wähle einen Gegner aus um zu spielen.</p>

    <div 
      v-for="player in lobby" 
      :key="player.id"
      class="player"
      @click="invitePlayer(player)"
    >
      <p>{{ player.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $lobby } from '@/stores/lobby';
import SendInviteModal from './modals/send-invite-modal.vue';
import { ref } from 'vue';
import type { UserDO } from '../../../types/shared.ts';
import { useStore } from '@nanostores/vue';
import { $userId } from '@/stores/connection.ts';
import InvitationModal from './modals/invitation-modal.vue';
import { $game } from '@/stores/game.ts';


const lobby = useStore($lobby)
const show = ref(false)
const selected = ref<UserDO | null>(null)

const game = useStore($game)

const invitePlayer = (player: UserDO) => {
  if(player.id === $userId.value) return
  selected.value = player
  show.value = true
}

</script>

<style>

.player {
  border: 1px solid var(--accent);
  border-radius: 0.5em;
  padding: 1em;
  cursor: pointer;
}

</style>
