<template>
  <div id="visitedItem-wrapper"
      v-on:mouseover="hoverCountry(id)"
      v-on:mouseout="leaveCountry(id)">
      <a class="ui blue image label">
        <img :src="flag">
        {{name}}
        <i class="delete icon" v-on:click="changeStatus({id})"></i>
      </a>
  </div>
</template>

<script>
import * as types from '../store/types.js';
import css from '../config/layerStyle';
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'visited-item',
  props: ['id', 'name'],
  computed: {
    ...mapGetters(['map', 'layer']),
    getLayer() { 
      const self = this;
      return this.layer(self.id);
      },
    flag() {
        if (this.id != '-99') {
          console.log('flag: ', this.id);
          return require(`../assets/flags/4x3/${this.id}.svg`);
        };
      },
  },
  methods: {
    ...mapMutations({ setActive: types.SET_ACTIVE }),
    ...mapActions({ changeStatus: types.CHANGE_DATABASE }),  
    fitBounds(id) {
      const center = this.getLayer.getBounds().getCenter();
      this.map.flyTo(center, 3);
    },
    hoverCountry(id) {
      this.fitBounds(id);
      this.setActive({
        id,
        value: true
        })
    },
    leaveCountry(id) {
      this.setActive({
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