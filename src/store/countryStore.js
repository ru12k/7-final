/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import L from 'leaflet';
import { fire } from '../store/userStore';
import defaultData from '../defaultDatabase.json';

Vue.use(Vuex);

export const defaultDb = (() => {
  let result = {};
  Object.keys(defaultData).forEach( (id) => {
    let country = {
      id,
      commonName: defaultData[id].commonName,
      fillColor: defaultData[id].fillColor,
      status: defaultData[id].status,
    }
    result[id] = country;
  });
  return result;
})();

export const SAVE_DATABASE = 'SAVE_DATABASE';
export const CHANGE_DATABASE = 'CHANGE_DATABASE'; 
export const INIT_DATA = 'INIT_DATA';
export const CHANGE_DATA = 'CHANGE_STATUS';
export const SET_CURRENT = 'SET_CURRENT';
export const ADD_MAP = 'ADD_MAP';
export const RESET_LAYER = 'RESET_LAYER';
export const ADD_LAYERS = 'ADD_LAYERS';

export const countryStore = {
  state: {
    data: {},
    map: false,
    layers: false,
    current: { 
      id: '',
      value: false,
      init: false,
    },
  },
  mutations: {
    [ADD_MAP]: (state, payload) => state.map = payload.map,
    [ADD_LAYERS]: (state, payload) => state.layers = payload.layers,
    [INIT_DATA]: (state, payload) => {
      console.log('INIT_DATA:');
      state.data = payload.data
    },
    [CHANGE_DATA]: (state, payload) => {
      console.log('CHANGE_DATA:');
      Vue.set(state.data, payload.id, payload.data)
    },
    [RESET_LAYER]: (state) => state.layers = false,
    [SET_CURRENT]: (state, payload) => { 
      state.current.init = true;
      state.current.id = payload.id;
      state.current.value = payload.value;
    },
  }, 
  actions: {
    [SAVE_DATABASE]: (context, payload) => {
      const initDb = data => context.commit({ type: INIT_DATA, data });
      const changeData = data => context.commit({ type: CHANGE_DATA, data});
      if (payload.userId === null) initDb(defaultDb);
      else {
        fire.onInitDatabase(initDb);
        fire.onChangeDatabase(changeData);
      }
    },
    [CHANGE_DATABASE]: ({ dispatch, commit, getters, rootGetters }, payload) => {
      const newState = rootGetters.getStateChanged(payload.id);
      if (rootGetters.userId) {
        fire.changeDatabase({ [payload.id]: newState });
      } else {
        commit({
          type: CHANGE_DATA,
          id: payload.id,
          data: newState,
        });
      }
    },
  },
  getters: {
    getMap: state => state.map,
    getLayer: (state, getters) => {
      return id => {
        let findlayer = {};
        getters.getMap.eachLayer( layer => {
          if (layer.id === id) findlayer = layer;
        });
        return findlayer;
      };
    },
    layers: state => state.layers,
    countries: state => state.data,
    getCountry: (state, getters) => { 
      return id => getters.countries[id];
    },
    getStateChanged: state => { 
      return id => { 
        const data = state.data[id];
        data.status = !data.status;
        return data;
      }
    },
    current: state => state.current,
    visitedCount: (state, getters) => getters.visited.length,
    notVisitedCount:  (state, getters) => getters.notVisited.length,
    visited: state => {
      const keys = Object.keys(state.data);
      const visitedID = keys.filter( id => state.data[id].status);
      return visitedID.map( id => state.data[id]);
    },
    notVisitedID: state => {
      const keys = Object.keys(state.data);
      const notVisitedID = keys.filter( id => !state.data[id].status);
      return notVisitedID.map( id => state.data[id]);
    },
  },
}