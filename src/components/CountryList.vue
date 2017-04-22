<template>
  <div class="wrapper">
    <h5 class="custom-header"><i class="flag icon"></i><span>All countries:</span></h5>
    <div class="wrapper-list-contetnt" v-show="showCountryList">
      <div class="list-tool">
        <v-search></v-search>
        <div class="ui small primary icon buttons">
          <button class="ui button" v-on:click="offFilter()"><i class="list layout icon"></i></button>
          <button class="ui button" v-on:click="setFilter()"><i class="check circle outline icon"></i></button>
        </div>
      </div>
      <div class="list-wrapper">
        <v-country id="country" 
          v-for="country in data"
          :filter="filter"
          :name="country.commonName"
          :status="country.status" 
          :id="country.id"
          :display="country.display"
          :fillColor="country.fillColor">
        </v-country>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../store/types.js';
import Country from './CountryItem';
import Search from './Search';
import { mapGetters } from 'vuex';

export default {
  name: 'CountryList',
  components: {
    'v-country': Country,
    'v-search': Search
  },
  data() {
    return {
      filter: false,
    }
  },
  computed: {
     ...mapGetters(['data', 'showCountryList']),
  },
  methods: {
    setFilter() {
      this.filter = true;
    },
    offFilter() {
      this.filter = false;
    },
  },
}

</script>

<style scoped>
  .wrapper {
    width: 300px;
    position: absolute;
    left: 0;
    top: 50px;
    z-index: 2;
    font-size: 14px;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: rgba(230, 230, 230, 0.7);
  }
  .list-wrapper {
    overflow: auto;
    width: 300px;
    height: 500px;
  }
  .custom-header {
    background-color: #2185D0;
    color: #fff;
    margin: auto;
    text-align: center;
    width: 300px;
  }
  .list-tool {
    padding: 5px;
  }
  .custom-tool {
    margin-right: 5px;
  }
  .custom-tool input[type="text"] {
    width: 200px;
}
</style>


