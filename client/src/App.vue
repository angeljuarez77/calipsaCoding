<template>
  <div id="app">
    <LoggedIn v-if="jwt" :userName="user_name" />
    <Welcome v-else @jwt-received="storeJWT" />
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue';
import LoggedIn from './components/LoggedIn';
import axios from 'axios';

const BASE_URL = "http://localhost:3001";
export default {
  name: 'app',
  components: {
    Welcome,
    LoggedIn
  },
  data () {
    return {
      jwt: null,
      user_name: null,
    }
  },
  methods: {
    storeJWT(jwt, user_name){
      this.jwt = jwt;
      this.user_name = user_name;
    },
  },
  mounted() {
    console.log('from mounted in App.vue component')
    axios.get(BASE_URL).then(res => console.log(res.data)).catch(e => console.log(e));
  },
}
</script>

<style>
  body { 
    border: solid orange 1px;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
