<template>
  <div class="wrapper">
    <div class="ui secondary  menu">
      <a class="item custom-item" style="padding: 0;">
        <div class="ui small primary icon buttons" style="margin-right: 5px;">
          <button class="ui button" v-on:click="showCountryList()"><i class="flag icon"></i></button>
          <button class="ui button" v-on:click="showCard()"><i class="info circle icon"></i></button>
          <button class="ui button" v-on:click="showVisitedList()"><i class="bookmark icon"></i></button>
          <button class="ui button" v-on:click="showMessageBox()"><i class="comments outline icon"></i></button>
        </div>

        <div class="ui small primary icon buttons">
          <button class="ui button" v-on:click="zoomIn()"><i class="zoom icon"></i></button>
          <button class="ui button" v-on:click="zoomOut()"><i class="zoom out icon"></i></button>
          <button class="ui button" v-on:click="onClick()"><i class="undo icon"></i></button>
        </div>
      </a>
      <div class="right menu">
        <a class="item" style="padding: 0;">
        <v-counter v-if="authenticated"></v-counter>
        <v-userlabel v-if="authenticated"></v-userlabel>
        <div id="auth">
        </div>
        <div class="ui small buttons">
          <button class="ui positive button" @click="login()" v-show="!authenticated">
            <i class="sign in icon"></i>
            Log-in
           </button>
           <button class="ui button" @click="logout()" v-show="authenticated">
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
import { fire, auth } from '../store/store.js';
import * as types from '../store/types.js';

import UserLabel from '../components/userLabel';
import Counter from '../components/Counter';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'menu',
  props: ['Login', 'Logout', 'Authenticated'],
  components: {
    'v-userlabel': UserLabel,
    'v-counter': Counter,
  },
  computed: {
        ...mapGetters(['map', 'authenticated']),
  },
  methods: {
    ...mapMutations({ 
        setAuth: types.SET_AUTH,
        showCountryList: types.SHOW_COUNTRY_LIST,
        showCard: types.SHOW_CARD,
        showVisitedList: types.SHOW_VISITED_LIST,
        showMessageBox: types.SHOW_MESSAGE_BOX, 
        }),
    onClick() { this.map.setView(mapConfig.center, mapConfig.zoom) },
    login() { auth.login() },
    logout() { 
      const self = this;
      auth.logout(self.setAuth) 
    },
    zoomIn() { this.map.zoomIn() },
    zoomOut() { this.map.zoomOut() },
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