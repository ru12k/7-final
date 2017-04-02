<template>
  <div id="card-wrapper" v-if="current.init" v-on:click="fitBounds">
  <h5 class="custom-header"><i class="info circle icon"></i><span>Selected countries:</span></h5>
  <div class="custom-content" v-bind:style="fillColor">
    <div class="custom-text">
      <h4 class="header" style="color: white" >{{country.commonName}}</h4>
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
import { fire } from '../store/userStore.js';

export default {
  name: 'CountryCard',
  computed: {
    country() { return this.$store.getters.getCountry(this.current.id) },
    current() { return this.$store.getters.current },
    newState() { return { [this.current.id]: this.$store.getters.getStateChanged(this.current.id) } },
    map() { return this.$store.getters.getMap },
    layer() { return this.$store.getters.getLayer},
    flag() {
      if (this.current.id) {
        return require(`../assets/flags/4x3/${this.current.id}.svg`);
      }
    },
    fillColor() {
      let fillColor = this.country.fillColor;
      if (this.country.status) fillColor = css.visited.fillColor;
      return { 'background-color': fillColor };
    },
    descriptionStatus() {
      if (this.country.status) return `alredy visited`;
      return `not yet visited`;
    },
    buttonText() {
      if (this.country.status) return 'Remove from visited list';
      return 'Add to visited list';
    },
  },
  methods: {
    changeStatus() {

      // fire.changeStatus(self.newState)
      this.$store.display({
        type: CHANGE_DATABASE,
        id: this.country.id,
        // fillColor: css.visited.fillColor,
      })
    },
    fitBounds() {
      const self = this;
      const center = this.layer(self.country.id).getBounds().getCenter();
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