import L from 'leaflet';
import css from '../config/layerStyle';
import * as types from '../store/types';
import { auth, fire } from './store';

export const wathAuthenticated = store => {
  store.watch(
    state => state.authenticated,
    () => { 
      if (store.state.authenticated === null) {
        store.dispatch({ type: types.INIT_APP });
        console.log('wath authenticated === null:', store.getters.authenticated);
      }
      if (store.state.authenticated === true) {
        console.log('wath authenticated === true:', store.getters.authenticated);
        const options = auth.tokenOptions;
        options.id_token = localStorage.getItem('id_token');
        auth.auth0.getDelegationToken(options, (err, result) => {
          if (!err) {
            fire.fb.auth().signInWithCustomToken(result.id_token).catch( error => console.log("error.code:", error.code));          
            fire.fb.auth().onAuthStateChanged(user => {
              if (user) {
                fire.userId = user.uid;
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
      if (store.state.authenticated === false) {
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
      store.dispatch({
        type: types.INIT_USER,
        userId: mutation.payload.userId,
      });
    }
  });
};

export const changeStatus = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === types.CHANGE_DATA) {
      const id = mutation.payload.id;
      const status = mutation.payload.status;
      const state = store.getters.country(id);
      if (state.status) store.getters.layer(id).setStyle({ fillColor: css.visited.fillColor });
      else store.getters.layer(id).setStyle({ fillColor: state.fillColor });
    }
  });
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