  
<template>
  <div :class="[{visited: status}]" id="country"
    v-on:mouseover="hoverCountry(id)" 
    v-on:mouseout="leaveCountry(id)"
    v-bind:style="dataHoverStyle"
    v-show= "setFilter">
    <div class="custom-flag">
      <img :src="flag">
    </div>
    <div class="custom-name" v-on:click="changeStatus({id}), fitBounds(id)">
      <h5 v-bind:style="dataHoverStyle" style="font-size: 12px">{{name}}</h5>
    </div>
    <div class="ui checkbox">
      <input type="checkbox" :checked="status" v-on:click="changeStatus({id}), fitBounds(id)">
      <label></label>
    </div>
    <div class="ui mini primary icon buttons"  style="margin-right: 5px" v-on:click="fitBounds(id)">
      <button class="ui button"><i class="world icon"></i></button>
    </div>
  </div>
</template>

  <script>
  import * as types from '../store/types.js';
  import css from '../config/layerStyle';
  import { mapMutations, mapActions, mapGetters } from 'vuex';

  let self = null;
    export default {
      name: 'listItem',
      props: ['name', 'status', 'id', 'fillColor', 'display', 'filter'],
      data() {
        self = this;
        return {
          dataHoverStyle: {},
        }
      },
      computed: {
        ...mapGetters(['map', 'layer']),
        flag() {
          if (this.id != '-99') {
            return require(`../assets/flags/4x3/${this.id}.svg`);
          }
        },
        checkDisplay() {
          if (this.display > -1) return true;
          return false;
        },
        setFilter() {
          if (this.filter && this.status) return true;
          if (this.filter && !this.status) return false;
          if (!this.filter) return this.checkDisplay;
        },
      },
    methods: {
      ...mapMutations({ setActive: types.SET_ACTIVE }),
      ...mapActions({ changeStatus: types.CHANGE_DATABASE }),
      fitBounds(id) {
        const center = this.layer(this.id).getBounds().getCenter();
        this.map.flyTo(center, 3);
      },
      hoverCountry(id) {
        let fillColor = this.fillColor;
        if (this.status) fillColor = css.visited.fillColor;
        this.dataHoverStyle = { 
          'background-color': fillColor,
          'color': 'white',
        };
        this.setActive({
          id,
          value: true
        });
      },
      leaveCountry(id) {
        this.dataHoverStyle = {};
        this.setActive({
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
  