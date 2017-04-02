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
import { fire, SET_AUTH, SET_USERID } from './store/userStore.js';
import { auth,  auth0Config }   from './auth.js';

export default {
  name: 'app',
  computed: {
    // fb() {return this.$store.getters.fb },  
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
    authenticated: {
      handler: function() {
        console.log('watch', this.authenticated);
        if (this.authenticated === true) this.firebaseAuth();
        else this.notAuthenticated();
      },
      immediate: true,
    },
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
      this.$store.commit({
        type: SET_AUTH,
        authenticated: this.checkAuth(),
      });
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
    firebaseAuth() {
      const self = this;
      const options = {
        id_token: localStorage.getItem('id_token'),
        api: 'firebase',
        scope: 'openid name email displayName',
        target: auth0Config.clientId,
      };
      auth.auth0.getDelegationToken(options, (err, result) => {
        if(!err) {
          fire.fb.auth().signInWithCustomToken(result.id_token).catch( error => console.log("error.code:", error.code));          
          fire.fb.auth().(user => {
            if (user) {
              // self.userId = user.uid;
              self.$store.commit({
                type: SET_USERID,
                userId: user.uid,
              });
              console.log('userid:', user.uid);
              console.log('User is signed in:', user);
            } else {
              console.log('No user is signed in:', user);
            }
          });
        }
      });
    },
    notAuthenticated() {
      this.$store.commit({
        type: SET_USERID,
        userId: null,
      });
    },
  },
  mounted() {
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
