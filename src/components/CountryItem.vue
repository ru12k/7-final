  
<template>
  <div :class="[{visited: status}]" id="country"
    v-on:click="changeStatus(id)"
    v-on:mouseover="hoverCountry(id)" 
    v-on:mouseout="leaveCountry(id)"
    v-bind:style="dataHoverStyle">
    <div class="custom-flag">
      <img :src="flag">
    </div>
    <div class="custom-name">
      <h5 v-bind:style="dataHoverStyle" style="font-size: 13px">{{name}}</h5>
    </div>
    <div class="ui checkbox">
      <input type="checkbox" :checked="status" v-on:click="changeStatus(id)">
      <label></label>
    </div> 
  </div>
</template>

  <script>
  import { CHANGE_STATUS, SET_CURRENT } from '../store/countryStore.js';
  import layerStyle from '../config/layerStyle';

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
      },
    methods: {
      changeStatus(id) {
        this.$store.commit({
          type: CHANGE_STATUS,
          id,
          fillColor: layerStyle().visitedfillColor,
        })
      },
      hoverCountry(id) {
        this.dataHoverStyle = { 
          'background-color': this.fillColor,
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
    
  <style>
  #country {
    display: flex;
    flex-wrap: nowrap;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .custom-name {
    flex-grow: 1;
    padding: 5px;
  }
  .custom-flag {
    width: 40px;
    padding: 5px 5px 5px 10px;
  }
  .custom-flag img {
    width: 30px;
  }
  #country.visited {
    background-color: rgba(255,69,0,0.7);
    color: white;
  }
  </style>
  