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
    <p v-if="lobby.length > 1">Wähle einen Gegner aus um zu spielen!</p>
    <p v-else>Warte auf weitere Spieler!</p>

    <div class="lobby">
        <div 
        v-for="player in lobby" 
        :key="player.id"
        class="player"
        :class="{
          me: player.id === $userId.value,
          inactive: player.status !== 'active'
        }"
        @click="invitePlayer(player)"
        >
        <p class="player-name">{{ player.name }}</p>
        <span v-if="player.id === $userId.value">(Ich)</span>
        <span v-if="player.status !== 'active'">(beschäftigt!)</span>
      </div>
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

// TODO: Sort Lobby so me + active players are first

const show = ref(false)
const selected = ref<UserDO | null>(null)

const game = useStore($game)

const invitePlayer = (player: UserDO) => {
  if(player.id === $userId.value) return
  if(player.status !== 'active') return
  selected.value = player
  show.value = true
}

</script>

<style>

.lobby {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.player {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--accent);
  border-radius: 0.5em;
  padding: 0.5em 1em;
  cursor: pointer;
  text-align: center;
  min-height: 2em;
}

.player:hover {
  background-color: var(--dark);
}

.me {
  background-color: var(--accent);
  color: var(--background);
}

.me:hover {
  background-color: var(--background);
}

.inactive {
  opacity: 0.5;
}

.player-name {
  margin: 0
}

</style>
