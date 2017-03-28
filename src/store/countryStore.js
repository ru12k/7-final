/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import L from 'leaflet';
import defaultData from '../config/defaultData.json';

Vue.use(Vuex);

export const SET_DATA = 'SET_DATA';
export const SET_CURRENT = 'SET_CURRENT';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const ADD_MAP = 'ADD_MAP';
export const INIT_DATA = 'INIT_DATA';
export const INIT_DB = 'INIT_DB';
export const RESET_LAYER = 'RESET_LAYER';

export const countryStore = {
  state: {
    data: {},
    map: {},
    layers: L.layerGroup(),
    current: { 
      id: '',
      value: false,
      init: false,
    },
  },
  mutations: {
    [ADD_MAP]: (state, payload) => state.map = payload.map,
    [INIT_DB]: (state, payload) => state.data = payload.data,
    [RESET_LAYER]: (state) => state.layers = L.layerGroup(),
    [SET_DATA]: (state, payload) => Vue.set(state.data, payload.id, payload.data),
    [SET_CURRENT]: (state, payload) => { 
      state.current.init = true;
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
      console.log('userId2:', payload.userId);
      const defaultDb = defaultData.users.defaultUser;
      const initDb = data => {
            // context.commit({ type: RESET_LAYER });
            context.commit({
              type: INIT_DB,
              data,
            });
       };
      if (payload.userId === null) initDb(defaultDb);
      else {
        const userRef = context.getters.firebase.database().ref('users/' + payload.userId);
        userRef.once('value').then( snapshot => {
          const data = snapshot.val();
          console.log('snapshot:', data);
          if (data) initDb(data);
          else userRef.set(defaultDb);
        });
      }
    }
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
    currentID: state => state.current,
    currentCountry: state => state.data[state.current.id],
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