<template>
  <div>
    <h1>Welcome component</h1>
    <form @submit.prevent="handleSubmit">
      <label>
        user_name: 
        <input v-model="user.user_name" placeholder="user name">
      </label>

      <label>
        password: 
        <input v-model="user.password" placeholder="password" type="password">
      </label>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'Welcome',
  data() {
    return {
      user: {
        user_name: '',
        password: '',
      },
      message: '',
      messages: [],
      socket: io('localhost:3001'),
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault
    },
    handleSubmit() {
      
    }
  },
}
</script>