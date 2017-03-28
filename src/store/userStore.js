/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import auth0Config from '../config/auth0Config';
import fireConfig from '../config/firebaseConfig';

Vue.use(Vuex);

export const SET_AUTH = 'SET_AUTH';
export const SET_USERID = 'SET_USERID';

export const userStore = {
  state: {
     user: {
      lock: new Auth0Lock(auth0Config.clientId, auth0Config.domain, auth0Config.optionsLock),
      auth0: new Auth0({ domain : auth0Config.domain, clientID: auth0Config.clientId}),
      firebase: firebase.initializeApp(fireConfig, "auth0"),
      userId: null,
      authenticated: false,
      secretThing: '',
    }
  },
  mutations: {
    [SET_AUTH]: (state, payload) => state.user.authenticated = payload.authenticated,
    [SET_USERID]: (state, payload) => state.user.userId = payload.userId,
  },
  actions: {},
  getters: {
    lock: state => state.user.lock,
    auth0: state => state.user.auth0,
    authenticated: state => state.user.authenticated,
    userId: state => state.user.userId,
    firebase: state => state.user.firebase,
    secretThing: state => state.user.secretThing,
  },
}