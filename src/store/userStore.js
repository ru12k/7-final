/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import Fire from '../fire';
import configFire from '../config/configFire';
  
Vue.use(Vuex);

export const SET_AUTH = 'SET_AUTH';
export const SET_USERID = 'SET_USERID';
export const fire = new Fire(configFire);
// export const checkAuth = () => { return !!localStorage.getItem('id_token') };

export const userStore = {
  state: {
      userId: null,
      authenticated: !!localStorage.getItem('id_token'),
      secretThing: '',
  },
  mutations: {
    [SET_AUTH]: (state, payload) => state.authenticated = payload.authenticated,
    [SET_USERID]: (state, payload) => state.userId = payload.userId,
  },
  actions: {},
  getters: {
    authenticated: state => state.authenticated,
    userId: state => state.userId,
    secretThing: state => state.secretThing,
  },
};