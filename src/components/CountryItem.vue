  
<template>
  <div :class="[{visited: status}]" id="country"
    v-on:mouseover="hoverCountry(id)" 
    v-on:mouseout="leaveCountry(id)"
    v-bind:style="dataHoverStyle">
    <div class="custom-flag">
      <img :src="flag">
    </div>
    <div class="custom-name" v-on:click="changeStatus(id), fitBounds(id)">
      <h5 v-bind:style="dataHoverStyle" style="font-size: 12px">{{name}}</h5>
    </div>
    <div class="ui checkbox">
      <input type="checkbox" :checked="status" v-on:click="changeStatus(id), fitBounds(id)">
      <label></label>
    </div>
    <div class="ui mini primary icon buttons"  style="margin-right: 5px" v-on:click="fitBounds(id)">
      <button class="ui button"><i class="world icon"></i></button>
    </div>
  </div>
</template>

  <script>
  import { CHANGE_STATUS,CHANGE_DATABASE, SET_CURRENT } from '../store/countryStore.js';
  import css from '../config/layerStyle';

  let self = null;
    export default {
      name: 'listItem',
      props: ['name', 'status', 'id', 'fillColor'],
      data() {
        self = this;
        return {
          dataHoverStyle: {},
        }
      },
      computed: {
        flag() {
          if (this.id != '-99') {
            return require(`../assets/flags/4x3/${this.id}.svg`);
          }
        },
        map() { return this.$store.getters.getMap },
        layer() { return this.$store.getters.getLayer},
      },
    methods: {
      fitBounds(id) {
        const center = this.layer(this.id).getBounds().getCenter();
        this.map.flyTo(center, 3);
      },
      changeStatus(id) {
        this.$store.dispatch({
          type: CHANGE_DATABASE,
          id,
        });
      },
      hoverCountry(id) {
        let fillColor = this.fillColor;
        if (this.status) fillColor = css.visited.fillColor;
        this.dataHoverStyle = { 
          'background-color': fillColor,
          'color': 'white',
        };
        this.$store.commit({
          type: SET_CURRENT,
          id,
          value: true,
        });
      },
      leaveCountry(id) {
        this.dataHoverStyle = {};
        this.$store.commit({
          type: SET_CURRENT,
          id,
          value: false,
        }); 
      },
    },
    }

  </script>
    
  <style scoped>
  #country {
    display: flex;
    flex-wrap: nowrap;
    height: 40px;
    justify-content: space-between;
    align-items: center;
  }
  .custom-name {
    flex-grow: 1;
    padding: 5px;
    cursor: pointer;
  }
  .custom-flag {
    width: 40px;
    padding: 5px 5px 5px 5px;
  }
  .custom-flag img {
    width: 30px;
  }
  #country.visited {
    background-color: rgba(255,69,0,0.7);
    color: white;
  }
  div.custom-button {
    margin: 5px;
  }
  </style>
  