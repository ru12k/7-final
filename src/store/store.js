/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import Fire from '../fire';
import Auth from '../auth';
import configFire from '../config/configFire';
import { initUser, createLayer, changeStatus, setActive, authAuthenticated, setRoutes } from './plugins';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import * as types from '../store/types';

Vue.use(Vuex);

export const fire = new Fire(configFire);
export const auth = new Auth();

const state = {
  data: {},
  map: false,
  layers: false,
  load: false,
  active: {
    id: '',
    value: false,
    init: false,
  },
  secretThing: false,
  authenticated: null,
  user: {
    userId: false,
    userProfile: false,
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [ 
    initUser, 
    createLayer, 
    changeStatus, 
    setActive,
    authAuthenticated,
    // setRoutes,
    ],
});

export default store;

