<template>
  <div class="views">
    <v-map></v-map>
    <v-list></v-list>
    <v-visitedlist></v-visitedlist>
    <v-card></v-card>
    <v-menu></v-menu>
  </div>
</template>

<script>
import Map from './Map';
import CountryList from './CountryList';
import VisitedList from './VisitedList';
import CountryCard from './CountryCard';
import Menu from './Menu';

export default {
  name: 'views',
  components: {
    'v-map': Map,
    'v-list': CountryList,
    'v-visitedlist': VisitedList,
    'v-card': CountryCard,
    'v-menu': Menu,
  },
  data(){
    return {

    };
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
