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
					@click="close"
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

const close = () => {
  emit('update:show', false)
}

const handleOverlayClick = () => {
  if(props.closable) close()
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
  right: 3em;
  top: 3em;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

</style>