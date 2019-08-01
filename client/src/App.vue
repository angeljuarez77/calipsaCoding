<template>
  <div id="app">
    <LoggedIn v-if="jwt" :userName="user_name" />
    <Welcome v-else @jwt-received="storeJWT" />
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue';
import LoggedIn from './components/LoggedIn';

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
  }
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
