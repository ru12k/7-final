/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const SET_DATA = 'SET_DATA';
export const SET_CURRENT = 'SET_CURRENT';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const ADD_MAP = 'ADD_MAP';
export const INIT_DATA = 'INIT_DATA';

export const countryStore = {
  state: {
    data: {},
    map: {},
    current: { 
      id: '',
      value: false,
    },
  },
  mutations: {
    [ADD_MAP]: (state, payload) => state.map = payload.map,
    [SET_DATA]: (state, payload) => Vue.set(state.data, payload.id, payload.data),
    [SET_CURRENT]: (state, payload) => { 
      console.log('current:', payload.id, payload.value);
      state.current.id = payload.id;
      state.current.value = payload.value;
    },
    [CHANGE_STATUS]: (state, payload) => {
        const data = state.data[payload.id];
        if (!data.status) {
          data.savefillColor = data.fillColor;
          data.fillColor = payload.fillColor;
        } else {
          data.fillColor = data.savefillColor;
        }
        data.status = !data.status;
    },
  },
  actions: {
    [INIT_DATA]: (context, payload) => {
      const db = payload.db;
      const keys = Object.keys(db);
      keys.forEach( key => {
        context.commit({
          type: SET_DATA,
          id: key,
          data: db[key],
        });
      });
    }, 
  },
  getters: {
    getMap: state => state.countryStore.map,
    visitedCount: (state, getters) => getters.visited.length ,
    notVisitedCount:  (state, getters) => getters.notVisited.length,
    countries: state => state.countryStore.data,
    visited: state => {
      const keys = Object.keys(state.countryStore.data);
      return keys.filter( id => state.countryStore.data[id].status);
    },
    notVisited: state => {
      const keys = Object.keys(state.countryStore.data);
      return keys.filter( id => !state.countryStore.data[id].status);
    },
  }
}