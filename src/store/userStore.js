// /*eslint linebreak-style: ["error", "windows"]*/
// /*eslint-disable*/
// import Vue from 'vue';
// import Vuex from 'vuex';
// import * as types from '../types';
  
// Vue.use(Vuex);

// const state = {
//   data: {},
//   map: {},
//   layers: {},
//   active: {},
//   secretThing: false,
//   authenticated: false,
//   user: {
//     userId: false,
//     userProfile: false,
//     routes: '/public',
//   },
// };



// const actions = {
//   [types.SAVE_AUTH]: ({dispatch, commit, state}, payload) => {
//     console.log('types.SAVE_TYPE_AUTH:', payload);
//       commit('types.SET_USER', {
//         userId: payload.userId,
//         userProfile: payload.userProfile,
//         routes: payload.routes,
//       });
//   },
// };

// const getters = {
//     authenticated: state => state.authenticated,
//     userId: state => state.user.userId,
//     userProfile: state => state.user.userProfile,
//     secretThing: state => state.user.secretThing,
//     routes: state => state.user.routes,
// };

// export default {
//   state,
//   mutations,
//   actions,
//   getters,
// }
// // export const userStore = {
// //   state: {
// //       userId: null,
// //       path: null,
// //       authenticated: null,
// //       secretThing: '',
// //   },
// //   mutations: {
// //     [types.SET_AUTH]: (state, payload) => {
// //       console.log('SET_AUTH:', payload.authenticated);
// //       state.authenticated = payload.authenticated;
// //     },
// //     [types.SET_USERID]: (state, payload) => { 
// //       console.log('SET_USERID:', payload.userId);
// //       state.userId = payload.userId;
// //     },
// //     [types.SET_PATH]: (state, payload) => {
// //       console.log('SET_PATH:', payload.path);
// //       state.path = payload.path;
// //     },
    
// //   },
// //   actions: {},
// //   getters: {
// //     authenticated: state => state.authenticated,
// //     userId: state => state.userId,
// //     secretThing: state => state.secretThing,
// //     path: state => state.path,
// //   },
// // };