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
import auth0Config from './config/auth0Config.js';
import '../node_modules/semantic-ui-css/semantic.min.css';
import '../node_modules/leaflet/dist/leaflet.css';
import './main.css';
import { SET_AUTH, SET_USERID } from './store/countryStore.js';

export default {
  name: 'app',
  computed: {
    lock() { return this.$store.getters.lock },
    auth0() { return this.$store.getters.auth0 },
    firebase() { return this.$store.getters.firebase },
    authenticated() { return this.$store.getters.authenticated },
  },
  watch: {
    authenticated: {
      handler: function() {
        console.log('watch', this.authenticated);
        if (this.authenticated === true) this.firebaseAuth();
        else this.notAuthenticated();
      },
      immediate: true,
    }
  },
  methods: {
    checkAuth() { return !!localStorage.getItem('id_token') },
    authListener() {
      this.$store.commit({
        type: SET_AUTH,
        authenticated: this.checkAuth(),
      });
      this.lock.on('authenticated', (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
        this.lock.getProfile(authResult.idToken, (error, profile) => {
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
      this.lock.on('authorization_error',  error => console.log(error));
    },
    firebaseAuth() {
      const self = this;
      const options = {
        id_token: localStorage.getItem('id_token'),
        api: 'firebase',
        scope: 'openid name email displayName',
        target: auth0Config.clientId,
      };
      self.auth0.getDelegationToken(options, (err, result) => {
        if(!err) {
          self.firebase.auth().signInWithCustomToken(result.id_token).catch( error => console.log("error.code:", error.code));
          self.firebase.auth().onAuthStateChanged(user => {
            if (user) {
              self.userId = user.uid;
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
