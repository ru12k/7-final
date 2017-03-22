<template>
  <div id="card-wrapper" v-if="currentID.init">
  <div class="ui cards">
  <div class="card" v-bind:style="fillColor">
    <div class="content">
      <img class="right floated my-image" :src="flag"/>
      <div class="header" style="color: white"><i class="flag icon"></i>{{currentCountry.commonName}}</div>
      <div class="description" style="color: white">{{ descriptionStatus}}</div>
    </div>
    <div class="ui bottom attached button" v-on:click="changeStatus"><i class="add icon"></i> {{buttonText}} </div>
  </div>
</div>
</div>
</template>

<script>
import { SET_STATE } from '../store/countryStore.js';
import layerStyle from '../config/layerStyle';

export default {
  name: 'CountryCard',
  computed: {
    currentCountry() { return this.$store.getters.currentCountry },
    currentID() { return this.$store.getters.currentID }, 
    flag() {
      if (this.currentCountry.id) {
        return require(`../assets/flags/4x3/${this.currentCountry.id}.svg`);
      }
    },
    fillColor() {
      return { 'background-color': this.currentCountry.fillColor };
    },
    descriptionStatus() {
      if (this.currentCountry.status) return `${this.currentCountry.commonName} alredy visited`;
      return `${this.currentCountry.commonName} is not yet visited`;
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
        fillColor: layerStyle().visitedfillColor,
      })
    },
  }
}
  
</script>

<style>
#card-wrapper {
    position: absolute;
    right: 0;
    top: 100px;
    z-index: 2;
  }
  .content img.my-image {
    width: 80px;
  }
</style>