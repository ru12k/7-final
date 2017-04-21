import L from 'leaflet';
import { fire } from '../store/store';
import defaultData from '../config/defaultDatabase.json';
import * as types from '../store/types';
import css from '../config/layerStyle';

export default {
  [types.INIT_APP]: ({ dispatch, commit }) => {
    const data = {};
    const layers = L.layerGroup();
    Object.keys(defaultData).forEach( (id) => {
      const countryData = {
        commonName: defaultData[id].commonName,
        fillColor: defaultData[id].fillColor,
        status: defaultData[id].status,
        id,
      };
      data[id] = countryData;
      const style = {...css};
      style.layer.fillColor = countryData.fillColor;
      const layer = L.geoJSON();
      layer.id = id;
      layer.addData(defaultData[id].geojson);
      layer.setStyle(style.layer);
      layer.on({
        mouseover: () => {
          commit({
            type: types.SET_ACTIVE,
            id,
            value: true,
          });
        },
        mouseout: () => {
          commit({
            type: types.SET_ACTIVE,
            id,
            value: false,
          });
        },
        click: (e) => {
          dispatch({
            type: types.CHANGE_DATABASE,
            id,
          });
        }
      });
      layer.addTo(layers);
    });
    commit({ type: types.INIT_DATA, data });
    commit({ type: types.ADD_LAYERS, layers });
    commit({ type: types.LOAD });
    commit({
      type: types.SET_AUTH,
      authenticated: !!localStorage.getItem('id_token'),
    });
  },

  [types.INIT_USER]: ({ commit, getters, rootGetters }, payload) => {
    if (payload.userId) {
      fire.initDefaultDatabase(getters.data);
      fire.onInitDatabase().then( val => {
        Object.keys(val).forEach( id => {
          if (getters.data[id].status !== val[id].status) {
            commit({
              type: types.CHANGE_DATA,
              id,
              status: val[id].status,
            });
          }
        });
      });
      const changeData = (id, status) => { 
        commit({ type: types.CHANGE_DATA, id, status });
      };
      fire.onChangeDatabase(changeData);
    } else {
      Object.keys(getters.data).forEach(id => {
        if (getters.data[id].status) {
          const status = getters.changeStatus(id);
          commit({
            type: types.CHANGE_DATA,
            id,
            status,
          });
        }
      });
    }
  },

  [types.CHANGE_DATABASE]: ({ dispatch, commit, getters }, payload) => {
    const status = getters.changeStatus(payload.id);
    if (getters.userId) {
      fire.changeDatabase(payload.id);
    } else {
      commit({
        type: types.CHANGE_DATA,
        id: payload.id,
        status,
      });
    }
  },
};
