/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import L from 'leaflet';
import { 
  countryStore,
  SAVE_DATABASE,
  CHANGE_DATABASE,
  INIT_DATA,
  CHANGE_DATA,
  SET_CURRENT,
  RESET_LAYER,
  ADD_LAYERS,
  defaultDb,
} from './countryStore';
import { 
  userStore, 
  SET_AUTH, 
  SET_USERID, 
  fire, 
  auth  } from './userStore';
import css from '../config/layerStyle';
import defaultData from '../defaultDatabase.json';

Vue.use(Vuex);
const authType = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_AUTH) {
      const authenticated = mutation.payload.authenticated;
      if (store.getters.authenticated === true) {
        console.log('authType: if:  auth:', store.getters.authenticated, auth);
        auth.auth0.getDelegationToken(auth.tokenOptions, (err, result) => {
          console.log('getDelegationToken:', auth.tokenOptions);
          if(!err) {
            fire.fb.auth().signInWithCustomToken(result.id_token).catch( error => console.log("error.code:", error.code));          
            fire.fb.auth().onAuthStateChanged(user => {
              if (user) {
                fire.ref = user.uid;
                console.log('fire.ref:', fire.ref, user.uid);
                fire.initDefaultDatabase(defaultDb);
                store.commit({
                  type: SET_USERID,
                  userId: user.uid,
                });
                console.log('userid:', user.uid);
                console.log('User is signed in:', user);
              } else {
                store.commit({
                  type: SET_USERID,
                  userId: null,
                });
                console.log('No user is signed in:', user);
              }
            });
          }
      });
    } else {
      console.log('authType: else:', store.getters.authenticated);
        store.commit({
          type: SET_USERID,
          userId: null,
        });
      }
    }
  });
};
const initUser = store => {
    store.subscribe((mutation, state) => {
    if (mutation.type === SET_USERID) {
      const userId = mutation.payload.userId;
      store.dispatch({
          type: SAVE_DATABASE,
          userId,
      });
    }
  })
};

const createLayer = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === INIT_DATA) {
      store.commit({type: RESET_LAYER});
      const db = mutation.payload.data;
      const layers = L.layerGroup();
      Object.keys(db).forEach( id => {
        const style = css;
        const countryData = db[id];
        const layer = L.geoJSON();
        if (countryData.status) { 
          style.layer.fillColor = style.visited.fillColor;
        } else {
          style.layer.fillColor = countryData.fillColor;
        }
        console.log('test 3333:', id, style.layer.fillColor, countryData.status);
        layer.on({
          mouseover: () => {
            store.commit({
              type: SET_CURRENT,
              id,
              value: true,
            });
          },
          mouseout: () => {
            store.commit({
              type: SET_CURRENT,
              id,
              value: false,
            });
          },
          click: (e) => {
            store.dispatch({
              type: CHANGE_DATABASE,
              id,
            });
          }
        });
        layer.id = id;
        layer.addData(defaultData[id].geojson);
        layer.setStyle(style.layer);
        layer.addTo(layers);
      });
      store.commit({
        type: ADD_LAYERS,
        layers,
      });
    }
  })
};

const changeStatus = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === CHANGE_DATA) {
      const id = mutation.payload.id;
      const state = mutation.payload.data;
      if (state.status) store.getters.getLayer(id).setStyle({ fillColor: css.visited.fillColor }); 
      else store.getters.getLayer(id).setStyle({ fillColor: state.fillColor });
    }
  })
};

const setCurrent = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_CURRENT) {
      const id = mutation.payload.id;
      const state = store.getters.getCountry(id);
      const layer = store.getters.getLayer(id);
      const fillColor = css.hover.fillColor;
      if (mutation.payload.value) { 
        layer.setStyle({ 
        fillColor,
        weight: css.hover.weight,
       });
      } else {
        if (state.status) fillColor = css.visited.fillColor;
        else fillColor = state.fillColor;
        layer.setStyle({ 
          fillColor,
          weight: css.layer.weight,
        });
      }
    }
  })
};

const store = new Vuex.Store({
  modules: {
    countryStore,
    userStore,
  },
  plugins: [authType, initUser, createLayer, changeStatus, setCurrent],
});

export default store;

