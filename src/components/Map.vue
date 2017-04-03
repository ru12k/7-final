<template>
  <div id="map-container"></div>
</template>
<script>
import L from '../../node_modules/leaflet/dist/leaflet.js';
import mapConfig from '../config/mapConfig.js';
import { ADD_MAP} from '../store/countryStore.js';

let self = null;
export default {
  name: 'map',
  data() {
    return {
      map: false,
    }
  },
  methods: {
    initMap() {
        this.$nextTick(function () {
          const self = this;
          this.map = L.map('map-container', {
              zoomControl: false,
            }).setView(mapConfig.center, mapConfig.zoom);
          L.tileLayer(mapConfig.url, {
            attribution: mapConfig.attribution,
            id: mapConfig.id,
            maxZoom: mapConfig.maxZoom,
          }).addTo(self.map);
          this.$store.commit({
              type: ADD_MAP,
              map: this.map,
            });
        })
      },
  },
  mounted() {
    this.initMap();
  },
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
