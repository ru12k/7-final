import Vue from 'vue';
import * as types from '../store/types';

export default {
  [types.LOAD]: state => state.load = true,
  [types.SET_AUTH]: (state, payload) => state.authenticated = payload.authenticated,
  [types.SET_USER]: (state, payload) => {
    state.user.userId = payload.userId;
    state.user.userProfile = payload.userProfile;
  },
  [types.ADD_MAP]: (state, payload) => state.map = payload.map,
  [types.ADD_LAYERS]: (state, payload) => state.layers = payload.layers,
  [types.INIT_DATA]: (state, payload) => state.data = payload.data,
  [types.CHANGE_DATA]: (state, payload) => state.data[payload.id].status = payload.status ,
  [types.SET_ACTIVE]: (state, payload) => {
    state.active.init = true;
    state.active.id = payload.id;
    state.active.value = payload.value;
  },
};
