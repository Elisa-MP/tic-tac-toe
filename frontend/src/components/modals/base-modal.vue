<template>
  <div
    v-if="show"
    class="modal-overlay"
    @click="handleOverlayClick"
  >
    <div
      class="modal"
      @click.stop
    >
			<div class="header">
				<slot name="header" />
				<button
          v-if="props.closable"
					class="close"
					@click="closeModal"
				>
				X
				</button>
			</div>
      <div class="content">
				<slot />
			</div> 
      <div class="buttons">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineSlots<{
  header(): any
  buttons(): any
  default(): any
}>()

const props = defineProps({
  show: Boolean,
  closable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'update:show'
])

const closeModal = () => {
  emit('update:show', false)
}

const handleOverlayClick = () => {
  if(props.closable) closeModal()
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgb(124, 124, 124, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  min-width: 30em;
  padding: 1.5em;
  border-radius: 1em;
  background-color: var(--background);
}

.close {
  position: absolute;
  right: 2em;
  top: 2em;
}

.header {
	text-align: center;
  border-bottom: 1px solid var(--accent);
  margin-bottom: 2em;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 2em;
}

</style>