<template>
  <div>
    <h1>20-questions.</h1>
    <h2>{{ userName }}</h2>
    <form @submit.prevent="sendMessage">
      <label for="message"> 
        Type your question:
        <input v-model="message" type="text" placeholder="message body">
      </label>
      <button type="submit">Send</button>
    </form>
    <ul>
      <Questions 
        v-for="(message, index) in messages" 
        v-bind:message="message"
        v-bind:key="index"
      />
    </ul>
  </div>
</template>

<script>
const BASE_URL = 'localhost:3001';
import io from 'socket.io-client';
import Questions from './Questions.vue';

export default {
  name: 'LoggedIn',
  components: {
    Questions,
  },
  data() {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io(BASE_URL),
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message,
      });
      this.message = '';
    },
  },
  mounted() {
    this.user = this.userName;

    // this.socket.on('welcome', data => console.log(data));

    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
    })
  },
  props: {
    userName: String,
  },
}
</script>

<style scoped>
  ul {
    border: solid pink 1px;
  }
</style>

