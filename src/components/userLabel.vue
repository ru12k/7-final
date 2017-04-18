<template>
  <a class="ui label" v-show="userId">
    <img :src="ava" class="ui right spaced avatar image">
    {{name}}
  </a>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'userlabel',
  computed: { 
    ...mapGetters(['userId']),
    name() {
      if (this.userId) {
        return JSON.parse(localStorage.getItem('profile')).nickname;
      } 
    },
    ava() {
      if (this.userId) {
        return JSON.parse(localStorage.getItem('profile')).picture;
      }
    },
  },
}
  
</script>
<style lang="">
  
</style>