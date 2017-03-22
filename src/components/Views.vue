<template>
  <div class="views">
    <v-map></v-map>
    <v-list></v-list>
    <v-visitedlist></v-visitedlist>
  </div>
</template>

<script>
import Map from './Map';
import CountryList from './CountryList';
import VisitedList from './VisitedList';

export default {
  name: 'views',
  components: {
    'v-map': Map,
    'v-list': CountryList,
    'v-visitedlist': VisitedList,
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
