<template>
  <div>
    <h1>Welcome to the 20-questions web app</h1>
    <h2>If you have an account log in</h2>
    <form @submit.prevent="handleLogInSubmit">
      <label>
        user_name: 
        <input v-model="user.user_name" placeholder="user name" type="text">
      </label>
      <label>
        password: 
        <input v-model="user.password" placeholder="password" type="password">
      </label>
      <button type="submit">Submit</button>
    </form>
    <hr/>
    <h2>If you don't have an account then please make one</h2>
    <form @submit.prevent="handleCreationSubmit">
      <label>
        <input v-model="newUser.user_name" placeholder="user name" type="text">
      </label>
      <label for="">
        <input v-model="newUser.password" placeholder="password" type="password">
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';

const BASE_URL = "http://localhost:3001";

export default {
  name: 'Welcome',
  data() {
    return {
      user: {
        user_name: '',
        password: '',
      },
      newUser: {
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
    async handleLogInSubmit() {
      const res = await axios.post(`${BASE_URL}/login`, this.user); 
      console.log(res.data);
    },
    async handleCreationSubmit() {
      const res = await axios.post(`${BASE_URL}/users`, this.newUser);
      console.log(res.data);
    },
  },
}
</script>