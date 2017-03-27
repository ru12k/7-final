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
  SET_USERID,
  INIT_DB,
} from './countryStore';
import layerStyle from '../config/layerStyle';
import mapConfig from '../config/mapConfig.js';
import defaultData from '../config/defaultData.json';
import geoData from '../config/countriesData.json';

Vue.use(Vuex);

const initUser = store => {
    store.subscribe((mutation, state) => {
    if (mutation.type === SET_USERID) {
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
      geoData.forEach( geo => {
        const layerId = geo.cca2;
        const layer = L.geoJSON();
        const styles = layerStyle(db[layerId].fillColor);
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
              fillColor: styles.visitedfillColor
            });
          }
        });
        layer.id = layerId;
        layer.addData(geo.geojson);
        layer.setStyle(styles.style);
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
      store.getters.getLayer(id).setStyle({ fillColor: fillColor });
    }
  })
};

const setCurrent = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_CURRENT) {
      const id = mutation.payload.id;
      const layer = store.getters.getLayer(id);
      if (mutation.payload.value) layer.setStyle({ fillColor: layerStyle().hoverfillColor});
      else {
        const fillColor = store.getters.getCountry(id).fillColor;
        layer.setStyle({ fillColor: fillColor});
      }
    }
  })
};

const store = new Vuex.Store({
  modules: {
    countryStore,
  },
  plugins: [initUser, addLayers, createLayer, changeStatus, setCurrent],
});

export default store;

