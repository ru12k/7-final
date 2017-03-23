<template>
  <div class="wrapper">
    <h5 class="custom-header"><i class="world icon"></i><span>All countries:</span></h5>
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
    width: 360px;
    position: absolute;
    left: 0;
    top: 100px;
    z-index: 2;
    font-size: 14px;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: rgba(230, 230, 230, 0.7);
  }
  .list-wrapper {
    overflow: auto;
    width: 360px;
    height: 750px;
  }
  .custom-header {
    background-color: #2185D0;
    color: #fff;
    margin: auto;
    text-align: center;
  }
</style>


