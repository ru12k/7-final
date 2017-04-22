<template>
  <div id="card-wrapper" v-on:click="fitBounds">
    <h5 class="custom-header"><i class="info circle icon"></i><span>Selected countries:</span></h5>
    <div v-if="show">
      <div class="custom-content" v-bind:style="fillColor">
      <div class="custom-text">
        <h4 class="header" style="color: white" >{{getCountry.commonName}}</h4>
        <div>
          {{descriptionStatus}}
        </div>
      </div>
      <div class="custom-flag">
        <img :src="flag"/>
      </div>
    </div>
    <div class="ui bottom attached button" v-on:click="changeStatus"><i class="add icon">
      </i> {{buttonText}}
    </div>
  </div>
</div>
</template>

<script>
import * as types from '../store/types.js';
import css from '../config/layerStyle';
import { fire } from '../store/store.js';
import { mapGetters } from 'vuex';

export default {
  name: 'CountryCard',
  computed: {
    ...mapGetters(['map', 'layer', 'country', 'active', 'showCard' ]),
    show() {
        if (!this.showCard) {
          return false;
        } else {
          return this.active.id;
        }
      },
    getCountry() { 
      if (this.active.id) return this.country(this.active.id);

    },
    flag() {
      if (this.active.id) {
        return require(`../assets/flags/4x3/${this.active.id}.svg`);
      }
    },
    fillColor() {
      let fillColor = this.getCountry.fillColor;
      if (this.getCountry.status) fillColor = css.visited.fillColor;
      return { 'background-color': fillColor };
    },
    descriptionStatus() {
      if (this.getCountry.status) return `alredy visited`;
      return `not yet visited`;
    },
    buttonText() {
      if (this.getCountry.status) return 'Remove from visited list';
      return 'Add to visited list';
    },
  },
  methods: {
    changeStatus() {
      this.$store.dispatch({
        type: types.CHANGE_DATABASE,
        id: this.getCountry.id,
      })
    },
    fitBounds() {
      const self = this;
      const center = this.layer(self.getCountry.id).getBounds().getCenter();
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
    width: 300px;
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
  .empty-card {
    height: 100px;
    width: 300px;
 }

</style>