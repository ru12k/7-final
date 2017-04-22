/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import Fire from '../API/fire';
import Auth from '../API/auth';
import configFire from '../config/configFire';
import { 
  initUser, 
  changeStatus, 
  setActive, 
  wathAuthenticated,
  // setSearch,
  // checkDisplay 
} from './plugins';
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
    id: false,
    value: false,
    init: false,
  },
  search: false,
  secretThing: false,
  authenticated: null,
  user: {
    userId: false,
    userProfile: false,
  },
  ui: {
    showCountryList: true,
    showCard: true,
    showVisitedList: true,
    showMessageBox: false, 
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [ 
    initUser, 
    changeStatus, 
    setActive,
    wathAuthenticated,
    ],
});

export default store;

