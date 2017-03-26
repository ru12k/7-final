<template>
  <div class="wrapper">
    <h5 class="custom-header"><i class="flag icon"></i><span>All countries:</span></h5>
    <div class="list-tool">
      <div class="ui small primary icon buttons">
        <button class="ui button"><i class="list layout icon"></i></button>
        <button class="ui button"><i class="check circle outline icon"></i></button>
      </div>
      <div class="ui icon input custom-tool">
        <input type="text" placeholder="Search...">
        <i class="search link icon"></i>
      </div>
    </div>

    <div class="list-wrapper">
      <v-country id="country" 
        v-for="country in countries" 
        :name="country.commonName" 
        :status="country.status" 
        :id="country.id" 
        :fillColor="country.fillColor">
      </v-country>
    </div>
  </div>
</template>

<script>
import { CHANGE_STATUS } from '../store/countryStore.js';
import Country from './CountryItem';

export default {
  name: 'CountryList',
  components: {
    'v-country': Country,
  },
  computed: {
    countries() { return this.$store.getters.countries },
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


