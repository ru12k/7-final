<template>
  <div class="wrapper">
    <div class="ui secondary  menu">
      <a class="item custom-item" style="padding: 0;">
        <div class="ui small primary icon buttons">
          <button class="ui button"><i class="flag icon"></i></button>
          <button class="ui button"><i class="info circle icon"></i></button>
          <button class="ui button"><i class="bookmark icon"></i></button>
          <button class="ui button" v-on:click="onClick()"><i class="undo icon"></i></button>
        </div>
      </a>
      <div class="right menu">
        <a class="item" style="padding: 0;">
        <div class="ui buttons">
          <button class="ui positive button" @click="Login()" v-show="!Authenticated">
            <i class="sign in icon"></i>
            Log-in
           </button>
           <button class="ui button" @click="Logout()" v-show="Authenticated">
             <i class="sign out icon"></i>
              Log-out
           </button> 
        </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import mapConfig from '../config/mapConfig.js';

export default {
  name: 'menu',
  props: ['Login', 'Logout', 'Authenticated'],
  computed: {
    map() { return this.$store.getters.getMap },
  },
  methods: {
    onClick() { this.map.setView(mapConfig.center, mapConfig.zoom) },
  },
}
</script>

<style scoped>
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-color: rgba(33,133,208,0.1);
}
.wrapper .custom-item h4 {
  color: white;
}
</style>