<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/*eslint-disable*/
import $ from '../node_modules/jquery/dist/jquery.min.js';
import jQuery from '../node_modules/jquery/dist/jquery.min.js';
import semantic from '../node_modules/semantic-ui-css/semantic.min.js';
import '../node_modules/semantic-ui-css/semantic.min.css';
import '../node_modules/leaflet/dist/leaflet.css';
import './main.css';
import { fire, auth, tokenOptions, SET_AUTH, SET_USERID } from './store/userStore.js';

export default {
  name: 'app',
  computed: {
    authenticated() { return this.$store.getters.authenticated },
    map() { return this.$store.getters.getMap },
    layers() { return this.$store.getters.layers },
    isMap() {
      if (this.$store.getters.getMap) return true;
      return false;
    },
    isLayer() {
      if (this.$store.getters.layers) return true;
      return false;
    },
    layersToMap() {
      if (this.isMap && this.isLayer) return true;
      return false;
    },
  },
  watch: {
    layersToMap: {
      handler: function() {
        const self = this;
        if (this.layersToMap === true) this.layers.addTo(self.map);
      },
      immediate: true,
    },
  },
  methods: {
    checkAuth() { return !!localStorage.getItem('id_token') },
    authListener() {
      auth.lock.on('authenticated', (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
        auth.lock.getProfile(authResult.idToken, (error, profile) => {
          if (error) {
            console.log(error);
            return;
          }
          localStorage.setItem('profile', JSON.stringify(profile));
          this.$store.commit({
            type: SET_AUTH,
            authenticated: true,
          });
        });
      });
      auth.lock.on('authorization_error',  error => console.log(error));
    },
  },
  mounted() {
     this.$store.commit({
        type: SET_AUTH,
        authenticated: this.checkAuth(),
      });
    this.authListener();
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
}
</style>
