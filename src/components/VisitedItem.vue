<template>
  <div id="visitedItem-wrapper"
      v-on:mouseover="hoverCountry(id)"
      v-on:mouseout="leaveCountry(id)">
      <a class="ui blue image label">
        <img :src="flag">
        {{name}}
        <i class="delete icon" v-on:click="changeStatus(id)"></i>
      </a>
  </div>
</template>

<script>
import { CHANGE_STATUS, SET_CURRENT } from '../store/countryStore.js';
import layerStyle from '../config/layerStyle';

export default {
  name: 'visited-item',
  props: ['id', 'name'],
  computed: {
    map() { return this.$store.getters.getMap },
    layer() { return this.$store.getters.getLayer},
    flag() {
        if (this.id != '-99') {
          console.log('flag: ', this.id);
          return require(`../assets/flags/4x3/${this.id}.svg`);
        };
      },
  },
  methods: {
    fitBounds(id) {
      const center = this.layer(this.id).getBounds().getCenter();
      this.map.flyTo(center, 3);
    },
    changeStatus(id) {
      this.$store.commit({
        type: CHANGE_STATUS,
        id,
        fillColor: layerStyle().visitedfillColor,
      })
    },
    hoverCountry(id) {
      this.fitBounds(id);
      this.$store.commit({
          type: SET_CURRENT,
          id,
          value: true,
        });
    },
    leaveCountry(id) {
      this.$store.commit({
        type: SET_CURRENT,
        id,
        value: false,
      }); 
    },
  }
}
</script>

<style>
#visitedItem-wrapper {
  margin: 5px;
  cursor: pointer;
}
/*


#visitedItem-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 6px;
    cursor: pointer;
}
#visitedItem-wrapper:hover {
  font-size: 14px;
}
.visited-flag {
  width: 15px;
}
.visited-name {
  padding: 3px;
  font-size: 12px;
  color: orangered;
}
*/
</style>