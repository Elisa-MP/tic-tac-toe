import { createApp } from 'vue'
import App from './App.vue'
import { socket } from './services/socket-service.ts'

socket.connect();

createApp(App).mount('#app')
