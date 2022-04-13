<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import useSocket from '@/utils/socket';

const socket = ref(useSocket());
const userInput = ref<HTMLInputElement>();
const messages = ref<Array<string>>([]);

onMounted(() => {
  socket.value
    .on('connection', (s) => console.log(s, 'connected!'))
    .on('connect_error', (e) => console.error(e.message))
    .on('chat', (message) => messages.value.push(message));
});

const submit = () => {
  if (!userInput.value || !socket.value) return;
  const message = userInput.value.value;
  socket.value.emit('chat', message);
  userInput.value.value = '';
};

onUnmounted(() => socket.value.close());
</script>

<template>
  <input type="text" class="user-input" ref="userInput" @keyup.enter="submit" />
  <section class="messages">
    <div v-for="message in messages" :key="message">
      <p>{{ message }}</p>
    </div>
  </section>
</template>
