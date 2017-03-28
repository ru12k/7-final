/*eslint linebreak-style: ["error", "windows"]*/
/*eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';
import L from 'leaflet';
import { 
  countryStore,
  ADD_MAP,
  INIT_DATA,
  SET_DATA,
  SET_CURRENT,
  CHANGE_STATUS,
  RESET_LAYER,
  INIT_DB,
} from './countryStore';
import { userStore, SET_USERID } from './userStore';
import css from '../config/layerStyle';
import mapConfig from '../config/mapConfig.js';
import defaultData from '../config/defaultData.json';
import geoData from '../config/countriesData.json';

Vue.use(Vuex);

const initUser = store => {
    store.subscribe((mutation, state) => {
    if (mutation.type === SET_USERID) {
      store.commit({ type: RESET_LAYER });
      const userId = mutation.payload.userId;
      console.log('userId1:', userId);
      store.dispatch({
          type: INIT_DATA,
          userId,
      });
    }
  })
};

const addLayers = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === ADD_MAP) {
      const layers = store.getters.layers;
      const map = mutation.payload.map;
      layers.addTo(map);
    }
  })
};

const createLayer = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === INIT_DB) {
      console.log('init--db');
      const db = mutation.payload.data;
      const layers = store.getters.layers;
      console.log('layers:', layers);
      geoData.forEach( geo => {
        const style = css;
        const layerId = geo.cca2;
        const layer = L.geoJSON();
        style.layer.fillColor = db[layerId].fillColor;
        layer.on({
          mouseover: () => {
            // layer.bringToFront();
            store.commit({
              type: SET_CURRENT,
              id: layerId,
              value: true,
            });
          },
          mouseout: () => {
            // layer.bringToBack();
            store.commit({
              type: SET_CURRENT,
              id: layerId,
              value: false,
            });
          },
          click: (e) => {
            store.commit({
              type: CHANGE_STATUS,
              id: layerId,
              fillColor: style.visited.fillColor,
            });
          }
        });
        layer.id = layerId;
        layer.addData(geo.geojson);
        layer.setStyle(style.layer);
        layer.addTo(layers);
      });
    }
  })
};

const changeStatus = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === CHANGE_STATUS) {
      const id = mutation.payload.id;
      const fillColor = store.getters.getCountry(id).fillColor;
      store.getters.getLayer(id).setStyle({ fillColor });
    }
  })
};

const setCurrent = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_CURRENT) {
      const style = css;
      const id = mutation.payload.id;
      const layer = store.getters.getLayer(id);
      if (mutation.payload.value) layer.setStyle({ 
        fillColor: style.hover.fillColor,
        weight: style.hover.weight,
       });
      else {
        const fillColor = store.getters.getCountry(id).fillColor;
        layer.setStyle({ 
          fillColor,
          weight: style.layer.weight,
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

