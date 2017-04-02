/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import Fire from '../fire';
import Auth from '../auth';
import configFire from '../config/configFire';
  
Vue.use(Vuex);

export const SET_AUTH = 'SET_AUTH';
export const SET_USERID = 'SET_USERID';
export const fire = new Fire(configFire);
export const auth = new Auth();

export const userStore = {
  state: {
      userId: null,
      authenticated: false,
      secretThing: '',
  },
  mutations: {
    [SET_AUTH]: (state, payload) => {
      console.log('SET_AUTH:', payload.authenticated);
      state.authenticated = payload.authenticated;
    },
    [SET_USERID]: (state, payload) => { 
      console.log('SET_USERID:', payload.userId);
      state.userId = payload.userId;
    },
  },
  actions: {},
  getters: {
    authenticated: state => state.authenticated,
    userId: state => state.userId,
    secretThing: state => state.secretThing,
  },
};