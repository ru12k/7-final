<template>
  <a class="ui label">
    <img :src="ava" class="ui right spaced avatar image">
    {{name}}
  </a>
</template>
<script>
export default {
  name: 'userlabel',
  computed: {
    profile() { return JSON.parse(localStorage.getItem('profile'))},
    name() { return this.profile.nickname },
    ava() { return this.profile.picture },
  },
  mounted() {
    console.log('NAME: ', this.name, 'AVA: ', this.ava, 'PROFILE: ', this.profile );
  },
}
  
</script>
<style lang="">
  
</style>