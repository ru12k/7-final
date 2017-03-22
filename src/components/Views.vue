<template>
  <div class="views">
    <v-map></v-map>
  </div>
</template>

<script>
import Map from './Map';

export default {
  name: 'views',
  components: {
    'v-map': Map,
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
