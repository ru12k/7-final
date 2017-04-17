<template>
  <div id="map-container"></div>
</template>
<script>
import L from '../../node_modules/leaflet/dist/leaflet.js';
import mapConfig from '../config/mapConfig.js';
import * as types from '../store/types.js';
import { mapMutations, mapGetters } from 'vuex';

let self = null;
export default {
  name: 'map',
  data() {
    return {
      appMap: false,
    }
  },
  computed: {
    ...mapGetters(['loadLayers', 'layers', 'map']),
  },
  methods: {
    ...mapMutations({ addMap: types.ADD_MAP }),
    // initMap() {
    //   const self = this;
    //   self.appMap = false;
    //   self.appMap = L.map('map-container', {
    //       zoomControl: false,
    //     }).setView(mapConfig.center, mapConfig.zoom);
    //   console.log('CHECK MAP:', self.appMap);
    //   L.tileLayer(mapConfig.url, {
    //     attribution: mapConfig.attribution,
    //     id: mapConfig.id,
    //     maxZoom: mapConfig.maxZoom,
    //   }).addTo(self.appMap);
    //   console.log('CHECK MAP AND LAYERS:', self.layers, self.appMap);
    //   self.layers.addTo(self.appMap);
    //   self.addMap({map: self.appMap});
    // },
  },
  mounted() {
    const self = this;
    console.log('START MOUNTED MAP:');
    self.appMap = L.map('map-container', {
        zoomControl: false,
      }).setView(mapConfig.center, mapConfig.zoom);
    console.log('CHECK MAP:', self.appMap);
    L.tileLayer(mapConfig.url, {
      attribution: mapConfig.attribution,
      id: mapConfig.id,
      maxZoom: mapConfig.maxZoom,
    }).addTo(self.appMap);
    self.addMap({map: self.appMap});
    this.$store.watch( 
      state => state.load,
      function() { 
        console.log('START WATCH LAYER:');
        self.layers.addTo(self.map);
        self.map.on('viewreset', function(){
          console.log('resetting..');
        });
        // self.initMap();
      },
      {immediate: true}
    );
  }
}
</script>
<style>
  #map-container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
</style>
