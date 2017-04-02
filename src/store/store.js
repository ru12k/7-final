/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import L from 'leaflet';
import { 
  countryStore,
  ADD_MAP,
  SAVE_DATABASE,
  CHANGE_DATABASE,
  INIT_DATA,
  CHANGE_DATA,
  SET_CURRENT,
  RESET_LAYER,
  ADD_LAYERS,
} from './countryStore';
import { userStore, SET_USERID } from './userStore';
import css from '../config/layerStyle';
import defaultData from '../config/defaultDatabase.json';
import { fire } from '../store/userStore';

Vue.use(Vuex);

const initUser = store => {
    store.subscribe((mutation, state) => {
    if (mutation.type === SET_USERID) {
      const userId = mutation.payload.userId;
      console.log('userId1:', userId);
      store.dispatch({
          type: SAVE_DATABASE,
          userId,
      });
    }
  })
};

const addLayers = store => {
  store.subscribe((mutation, state) => {
    // if (mutation.type === ADD_MAP) {
    //   const layers = store.getters.layers;
    //   const map = mutation.payload.map;
    //   layers.addTo(map);
    // }
    // if (mutation.type === ADD_LAYERS) {
    //   const layers = mutation.payload.layers;
    //   const map = store.getters.getMap;
    //   layers.addTo(map);
    // }
  })
};

const createLayer = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === INIT_DATA) {
      console.log('create layer - INIT_DATA:', mutation.payload.data);
      const db = mutation.payload.data;
      // const layers = store.getters.layers;
      const layers = L.layerGroup();
      console.log('layers::', layers);
      Object.keys(db).forEach( id => {
        const style = css;
        const countryData = db[id];
        const layer = L.geoJSON();
        console.log('id: 1111', id, db[id]);
        if (countryData.status) { 
          console.log('test 1111:', id, style.visited.fillColor);
          style.layer.fillColor = style.visited.fillColor;
        } else {
          console.log('test 2222:', id, countryData.fillColor);
          style.layer.fillColor = countryData.fillColor;
        }
        console.log('test 3333:', id, style.layer.fillColor);
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
  plugins: [initUser, addLayers, createLayer, changeStatus, setCurrent],
});

export default store;

