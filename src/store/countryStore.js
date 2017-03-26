/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import auth0Config from '../config/auth0Config';
import fireConfig from '../config/firebaseConfig';

Vue.use(Vuex);

export const SET_DATA = 'SET_DATA';
export const SET_CURRENT = 'SET_CURRENT';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const ADD_MAP = 'ADD_MAP';
export const INIT_DATA = 'INIT_DATA';
export const SET_AUTH = 'SET_AUTH';
export const SET_USERID = 'SET_USERID';

export const countryStore = {
  state: {
    data: {},
    map: {},
    current: { 
      id: '',
      value: false,
      init: false,
    },
    user: {
      lock: new Auth0Lock(auth0Config.clientId, auth0Config.domain, auth0Config.optionsLock),
      auth0: new Auth0({ domain : auth0Config.domain, clientID: auth0Config.clientId}),
      firebase: firebase.initializeApp(fireConfig, "auth0"),
      userId: null,
      authenticated: false,
      secretThing: '',
    }
  },
  mutations: {
    [ADD_MAP]: (state, payload) => state.map = payload.map,
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
    [SET_AUTH]: (state, payload) => state.user.authenticated = payload.authenticated,
    [SET_USERID]: (state, payload) => state.user.userId = payload.userId,
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
    lock: state => state.user.lock,
    auth0: state => state.user.auth0,
    authenticated: state => state.user.authenticated,
    userId: state => state.user.userId,
    firebase: state => state.user.firebase,
    secretThing: state => state.user.secretThing,
  },
  watch: {
    firebase: {
       handler: function() {
        console.log('watch fire:', state.firebase);
      },
      immediate: true,
    }
  },
}