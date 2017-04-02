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
import { CHANGE_DATA, CHANGE_DATABASE, SET_CURRENT } from '../store/countryStore.js';
import css from '../config/layerStyle';

export default {
  name: 'visited-item',
  props: ['id', 'name'],
  computed: {
    map() { return this.$store.getters.getMap },
    layer() { return this.$store.getters.getLayer(this.id)},
    flag() {
        if (this.id != '-99') {
          console.log('flag: ', this.id);
          return require(`../assets/flags/4x3/${this.id}.svg`);
        };
      },
  },
  methods: {
    fitBounds(id) {
      const center = this.layer.getBounds().getCenter();
      this.map.flyTo(center, 3);
    },
    changeStatus(id) {
      this.$store.dispatch({
        type: CHANGE_DATABASE,
        id,
      });
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