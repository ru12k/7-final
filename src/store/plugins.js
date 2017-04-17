import L from 'leaflet';
import css from '../config/layerStyle';
import * as types from '../store/types';
// import router from '../router/index';
import defaultData from '../defaultDatabase.json';
import { auth, fire } from './store';
// import defaultDb from './defaultDB';

export const defaultDb = (() => {
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
export const setRoutes = store => {
  store.watch(
    state => {
      if (state.user.userProfile) { return `/private/${state.user.userProfile.nickname}` }
      return '/public';
    },
    () => {
      const state = { 'page_id': 1, 'user_id': 5 };
      const title = 'Hello World';
      const url = store.getters.routes;
      window.history.pushState(state, title, url);
    },
    { immediate: true },
  );
};
export const authAuthenticated = store => {
  store.watch(
    state => state.authenticated,
    () => { 
      if (store.getters.authenticated === null) {
          console.log('wath authenticated === null:', store.getters.authenticated);
          store.commit({
            type: types.SET_AUTH,
            authenticated: !!localStorage.getItem('id_token'), 
          });
      }
      if (store.getters.authenticated === true) {
        console.log('wath authenticated === true:', store.getters.authenticated);
        const options = auth.tokenOptions;
        options.id_token = localStorage.getItem('id_token');
        auth.auth0.getDelegationToken(options, (err, result) => {
          console.log('getDelegationToken:', options);
          if (!err) {
            fire.fb.auth().signInWithCustomToken(result.id_token).catch( error => console.log("error.code:", error.code));          
            fire.fb.auth().onAuthStateChanged(user => {
              if (user) {
                fire.ref = user.uid;
                fire.initDefaultDatabase(defaultDb);
                // window.history.pushState(null, 'test.html');
                store.commit({
                  type: types.SET_USER,
                  userId: user.uid,
                  userProfile: JSON.parse(localStorage.getItem('profile')),
                });
                console.log('userid:', user.uid);
                console.log('User is signed in:', user);
              } else {
                store.commit({
                  type: types.SET_USER,
                  userId: null,
                  userProfile: null,
                });
                console.log('No user is signed in:', user);
              }
            });
          }
        });
      }
      if (store.getters.authenticated === false) {
        console.log('wath authenticated === false:', store.getters.authenticated);
        store.commit({
          type: types.SET_USER,
          userId: null,
          userProfile: null,
        });
      }
    },
    { immediate: true },
  );
};

export const initUser = store => {
    store.subscribe((mutation, state) => {
    if (mutation.type === types.SET_USER) {
      // console.log('plugin types.SET_USER routes:', store.getters.routes);
      store.dispatch({
        type: types.SAVE_DATABASE,
        userId: mutation.payload.userId,
      });
    }
  });
};
export const createLayer = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === types.INIT_DATA) {
      const db = mutation.payload.data;
      const layers = L.layerGroup();
      Object.keys(db).forEach( id => {
        const style = {...css};
        const countryData = db[id];
        const layer = L.geoJSON();
        if (countryData.status) { 
          style.layer.fillColor = style.visited.fillColor;
        } else {
          style.layer.fillColor = countryData.fillColor;
        }
        layer.on({
          mouseover: () => {
            store.commit({
              type: types.SET_ACTIVE,
              id,
              value: true,
            });
          },
          mouseout: () => {
            store.commit({
              type: types.SET_ACTIVE,
              id,
              value: false,
            });
          },
          click: (e) => {
            store.dispatch({
              type: types.CHANGE_DATABASE,
              id,
            });
          }
        });
        layer.id = id;
        layer.addData(defaultData[id].geojson);
        layer.setStyle(style.layer);
        layer.addTo(layers);
      });
      store.dispatch({
        type: types.RELOAD_LAYERS,
        layers,
      });
      // const state = { 'page_id': 1, 'user_id': 5 };
      // const title = 'Hello World';
      // const url = store.getters.routes;
      // window.history.pushState(state, title, url);
      // console.log('ROUTES STATES:', window.history.state);
      // router.push({ path: store.getters.routes });
    }
  })
};
export const changeStatus = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === types.CHANGE_DATA) {
      const id = mutation.payload.id;
      const state = mutation.payload.data;
      if (state.status) store.getters.layer(id).setStyle({ fillColor: css.visited.fillColor }); 
      else store.getters.layer(id).setStyle({ fillColor: state.fillColor });
    }
  })
};
export const setActive = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === types.SET_ACTIVE) {
      const id = mutation.payload.id;
      const state = store.getters.country(id);
      const layer = store.getters.layer(id);
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