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
} from './countryStore';
import layerStyle from '../config/layerStyle';
import defaultData from '../config/defaultData.json';
import geoData from '../config/countriesData.json';

Vue.use(Vuex);

const initData = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === ADD_MAP) {
      const userId = store.getters.userId;
      console.log('userId1:', userId);
      store.dispatch({
          type: INIT_DATA,
          userId,
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
            layer.id = id;
            layer.addData(data.geojson);
            layer.setStyle(styles.style);
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
  plugins: [initData, createLayer, changeStatus, setCurrent],
});

export default store;

