import { fire } from '../store/store';
import defaultData from '../defaultDatabase.json';
import * as types from '../store/types';

const defaultDb = (() => {
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

export default {
  [types.RELOAD_LAYERS]: ({ commit }, payload) => {
    // new Promise((resolve, reject) => {
      console.log('types.RELOAD_LAYERS:', payload.layers);
      commit({
        type: types.ADD_LAYERS,
        layers: payload.layers,
      });
    // }).then(() => {
      console.log('types.LOAD_LAYERS:', payload.layers);
      commit({ type: types.LOAD_LAYERS });
    // });
  },
  [types.SAVE_DATABASE]: ({ commit }, payload) => {
    const initDb = data => {
      commit({ type: types.INIT_DATA, data });
    };
    const changeData = data => commit({ type: types.CHANGE_DATA, data});
    if (payload.userId === null) initDb(defaultDb);
    else {
      fire.onInitDatabase(initDb);
      fire.onChangeDatabase(changeData);
    }
  },
  [types.CHANGE_DATABASE]: ({ dispatch, commit, getters, rootGetters }, payload) => {
    const newState = rootGetters.getStateChanged(payload.id);
    if (rootGetters.userId) {
      fire.changeDatabase({ [payload.id]: newState });
    } else {
      commit({
        type: types.CHANGE_DATA,
        id: payload.id,
        data: newState,
      });
    }
  },
};
