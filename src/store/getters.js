export default {
  map: state => state.map,
  layer: (state, getters) => {
    return id => {
      let findlayer = {};
      getters.layers.eachLayer(layer => {
        if (layer.id === id) findlayer = layer;
      });
      return findlayer;
    };
  },
  layers: state => state.layers,
  data: state => state.data,
  country: (state, getters) => { 
    return id => getters.data[id];
  },
  changeStatus: state => {
    return id => {
      return !state.data[id].status;
    }
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
  authenticated: state => state.authenticated,
  userId: state => state.user.userId,
  secretThing: state => state.secretThing,
  routes: ( state, getters ) => {
    if ( getters.userProfile ) { 
      return `/private/${state.user.userProfile.nickname}`;
    }
    return '/public';
  },
  userProfile: state => state.user.userProfile,
  load: state => state.load,
};
