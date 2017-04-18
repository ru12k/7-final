<template>
  <div id="app">
    <v-map></v-map>
    <v-list></v-list>
    <v-visitedlist></v-visitedlist>
    <v-card></v-card>
    <v-menu></v-menu>
  </div>
</template>

<script>
/*eslint-disable*/
import $ from '../node_modules/jquery/dist/jquery.min.js';
import jQuery from '../node_modules/jquery/dist/jquery.min.js';
import semantic from '../node_modules/semantic-ui-css/semantic.min.js';
import '../node_modules/semantic-ui-css/semantic.min.css';
import '../node_modules/leaflet/dist/leaflet.css';
import './main.css';
import { fire, auth } from './store/store.js';
import { mapMutations, mapGetters } from 'vuex';
import Map from './components/Map';
import CountryList from './components/CountryList';
import VisitedList from './components/VisitedList';
import CountryCard from './components/CountryCard';
import Menu from './components/Menu';
import * as types from './store/types.js';

export default {
  name: 'app',
    components: {
    'v-map': Map,
    'v-list': CountryList,
    'v-visitedlist': VisitedList,
    'v-card': CountryCard,
    'v-menu': Menu,
  },
  computed: {
    ...mapGetters(['authenticated']),
  },
  methods: {
    ...mapMutations({ setAuth: types.SET_AUTH }),
  },
  mounted() {
    const self = this;
    auth.authListener(self.setAuth);
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  padding: 0;
}
</style>
