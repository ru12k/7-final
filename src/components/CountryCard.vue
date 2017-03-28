<template>
  <div id="card-wrapper" v-if="currentID.init" v-on:click="fitBounds">
  <h5 class="custom-header"><i class="info circle icon"></i><span>Selected countries:</span></h5>
  <div class="custom-content" v-bind:style="fillColor">
    <div class="custom-text">
      <h4 class="header" style="color: white" >{{currentCountry.commonName}}</h4>
      <div>{{ descriptionStatus}}</div>
    </div>
    <div class="custom-flag">
      <img :src="flag"/>
    </div>
  </div>
  <div class="ui bottom attached button" v-on:click="changeStatus"><i class="add icon"></i> {{buttonText}} </div>
</div>
</template>

<script>
import { SET_STATE,  CHANGE_STATUS } from '../store/countryStore.js';
import css from '../config/layerStyle';

export default {
  name: 'CountryCard',
  computed: {
    currentCountry() { return this.$store.getters.currentCountry },
    currentID() { return this.$store.getters.currentID },
    map() { return this.$store.getters.getMap },
    layer() { return this.$store.getters.getLayer},
    flag() {
      if (this.currentCountry.id) {
        return require(`../assets/flags/4x3/${this.currentCountry.id}.svg`);
      }
    },
    fillColor() {
      return { 'background-color': this.currentCountry.fillColor };
    },
    descriptionStatus() {
      if (this.currentCountry.status) return `alredy visited`;
      return `not yet visited`;
    },
    buttonText() {
      if (this.currentCountry.status) return 'Remove from visited list';
      return 'Add to visited list';
    },
  },
  methods: {
    changeStatus() {
      this.$store.commit({
        type: CHANGE_STATUS,
        id: this.currentCountry.id,
        fillColor: css.visited.fillColor,
      })
    },
    fitBounds() {
      const self = this;
      const center = this.layer(self.currentCountry.id).getBounds().getCenter();
      this.map.flyTo(center, 3);
    },
  }
}
  
</script>

<style scoped>
#card-wrapper {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 2;
    color: white;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
    border-radius: 5px;
  }
 
  .custom-header {
    background-color: #2185D0;
    color: #fff;
    margin: auto;
    text-align: center;
  }
  .custom-content {
    height: 100px;
    width: 300px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: top;
    cursor: pointer;
  }
  .custom-text {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .custom-text h4{
    padding: 15px 0 0 15px;
    margin: 0;

  }
.custom-text div{
    padding: 0 0 0 15px;
    font-size: 12px;
    line-height: 12px;

    margin: 0;
  }
  .custom-flag {
    padding: 15px 15px 0 0;
    margin: 0;
    
  }
  .custom-flag img {
    width: 70px;
  }


</style>