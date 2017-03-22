<template>
  <div id="app">
    <router-view></router-view>
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

export default {
  name: 'app',
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
}
</style>
