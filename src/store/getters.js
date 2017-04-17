export default {
  map: state => {
    console.log('getters map: ', state.map);
    return state.map;
  },
  layer: (state, getters) => {
    return id => {
      let findlayer = {};
      getters.map.eachLayer(layer => {
        if (layer.id === id) findlayer = layer;
      });
      return findlayer;
    };
  },
  layers: state =>  { 
    console.log('getters layers: ', state.layers);
    return state.layers;
  },
  countries: state => { 
    console.log('getters countries: ', state.data);
    return state.data;
  },
  country: (state, getters) => { 
    return id => getters.countries[id];
  },
  getStateChanged: state => { 
    return id => { 
      const data = state.data[id];
      data.status = !data.status;
      return data;
    };
  },
  active: state => state.active,
  visitedCount: (state, getters) => getters.visited.length,
  notVisitedCount:  (state, getters) => getters.notVisited.length,
  visited: state => {
    const keys = Object.keys(state.data);
    const visitedID = keys.filter( id => state.data[id].status);
    return visitedID.map( id => state.data[id]);
  },
  notVisitedID: state => {
    const keys = Object.keys(state.data);
    const notVisitedID = keys.filter( id => !state.data[id].status);
    return notVisitedID.map( id => state.data[id]);
  },
  authenticated: state => {
    console.log('getter authenticated:', state.authenticated);
    return state.authenticated;
  },
  userId: state => {
    console.log('getter userId:', state.user.userId);
    return state.user.userId;
  },
  secretThing: state => state.secretThing,
  routes: ( state, getters ) => {
    console.log('getter routes:');
    if ( getters.userProfile ) { 
      return `/private/${state.user.userProfile.nickname}`;
    }
    return '/public';
  },
  userProfile: state => {
    console.log('getter userProfile:', state.user.userProfile);
    return state.user.userProfile;
  },
  loadLayers: state => state.load,
};
