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
  [types.DISPLAY]: (state, payload) => state.data[payload.id].display = payload.display,
  [types.SEARCH]: (state, payload) => {
    console.log('payload.search:', payload.search);
    state.search = payload.search
  },
  [types.SHOW_DEFAULT_UI]: state => {
    console.log('SHOW_DEFAULT_UI:', state.ui.showCountryList);
    state.ui.showCountryList = true;
    state.ui.showCard = true;
    state.ui.showVisitedList = true;
    state.ui.showMessageBox = false;
    console.log('SHOW_DEFAULT_UI:', state.ui.showCountryList);
  },
  [types.SHOW_COUNTRY_LIST]: state => state.ui.showCountryList = !state.ui.showCountryList,
  [types.SHOW_CARD]: state => state.ui.showCard = !state.ui.showCard,
  [types.SHOW_VISITED_LIST]: state => state.ui.showVisitedList = !state.ui.showVisitedList,
  [types.SHOW_MESSAGE_BOX]: state => state.ui.showMessageBox = !state.ui.showMessageBox,
};
