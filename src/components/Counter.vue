<template>
<div id="custom-statistic">
  <div class="ui labeled button" tabindex="0">
    <div class="ui blue button">
      <!--
        <i class="check circle outline icon"></i>
        -->
        travels:
    </div>
    <a class="ui basic blue left pointing label">
        {{visitedCount}}
    </a>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'counter',
  computed: {
    ...mapGetters(['visitedCount']),
  } 

}
  
</script>
<style lang="">
#custom-statistic {
  padding: 0;
}
</style>