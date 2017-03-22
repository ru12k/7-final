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
} from './countryStore';
import layerStyle from '../config/layerStyle';
import defaultData from '../config/defaultData.json';
import geoData from '../config/countriesData.json';

Vue.use(Vuex);

const initData = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === ADD_MAP) {
      store.dispatch({
          type: INIT_DATA,
          db: defaultData.users.defaultUser,
      });
    }
  })
};

const createLayer = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_DATA) {
      const id = mutation.payload.id;
      geoData.forEach( data => {
         if (data.cca2 === id) {
            const layer = L.geoJSON();
            const styles = layerStyle(mutation.payload.data.fillColor);
            layer.id = id;
            layer.addData(data.geojson);
            layer.setStyle(styles.style);
            layer.on({
              mouseover: () => {
                layer.bringToFront();
                store.commit({
                  type: SET_CURRENT,
                  id,
                  value: true,
                });
              },
              mouseout: () => {
                layer.bringToBack();
                store.commit({
                  type: SET_CURRENT,
                  id,
                  value: false,
                });
              },
              click: (e) => {
                store.commit({
                  type: CHANGE_STATUS,
                  id,
                  fillColor: styles.visitedfillColor
                });
              }
            });
            layer.addTo(store.state.countryStore.map);
          }
      });
    }
  })
};

const changeStatus = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === CHANGE_STATUS) {
      const id = mutation.payload.id;
      state.countryStore.map.eachLayer( layer => {
        if (layer.id === id) {
          const layerData = store.state.countryStore.data[id];
          layer.setStyle({ fillColor: layerData.fillColor});
        }
      });
    }
  })
};

const setCurrent = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_CURRENT) {
      const id = mutation.payload.id;
      state.countryStore.map.eachLayer( layer => {
        if (layer.id === id) {
          if (mutation.payload.value) layer.setStyle({ fillColor: layerStyle().hoverfillColor});
          else {
            const layerData = store.state.countryStore.data[id];
            layer.setStyle({ fillColor: layerData.fillColor});
          }
        }
      });
    }
  })
};

const store = new Vuex.Store({
  modules: {
    countryStore,
  },
  plugins: [initData, createLayer, changeStatus, setCurrent],
});

export default store;

