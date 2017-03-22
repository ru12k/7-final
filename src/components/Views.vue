<template>
  <div class="views">
    <v-map></v-map>
    <v-list></v-list>
  </div>
</template>

<script>
import Map from './Map';
import CountryList from './CountryList';

export default {
  name: 'views',
  components: {
    'v-map': Map,
    'v-list': CountryList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.views {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
