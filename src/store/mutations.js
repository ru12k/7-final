import Vue from 'vue';
import * as types from '../store/types';

export default {
  [types.LOAD_LAYERS]: state => state.load = {...!state.load},
  [types.SET_AUTH]: (state, payload) => {
    console.log('mutations SET_AUTH:', payload.authenticated);
    state.authenticated = payload.authenticated;
  },
  [types.SET_USER]: (state, payload) => {
    console.log('SET_USER:', payload.userId, payload.userProfile );
    state.user.userId = payload.userId;
    state.user.userProfile = payload.userProfile;
  },
  [types.ADD_MAP]: (state, payload) => {
    console.log('types.ADD_MAP:', payload.map);
    state.map = payload.map; 
  },
  [types.ADD_LAYERS]: (state, payload) => {
    console.log('types.ADD_LAYERS:', payload.layers);
    state.layers = payload.layers;
  },
  [types.INIT_DATA]: (state, payload) => {
      console.log('INIT_DATA:');
      state.data = payload.data;
    },
    [types.CHANGE_DATA]: (state, payload) => {
      console.log('CHANGE_DATA:');
      Vue.set(state.data, payload.id, payload.data);
    },
    [types.RESET_LAYER]: state => state.layers = false,
    [types.SET_ACTIVE]: (state, payload) => {
      state.active.init = true;
      state.active.id = payload.id;
      state.active.value = payload.value;
    },
};
