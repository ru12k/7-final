<template>
  <div class="wrapper" v-if="init">
    <h5 class="custom-header"><i class="bookmark icon"></i><span>Visited countries:</span></h5>
    <div class="visitedblock">
        <v-visiteditem v-for="countryItem in isVisited" :name="countryItem.commonName" :id="countryItem.id"></v-visiteditem>
    </div>
  </div>
</template>

<script>
import  VisitedItem from './VisitedItem';

export default {
  name: 'visitedList',
  components: {
    'v-visiteditem': VisitedItem
  },
  computed: {
      init() { 
        if (this.isVisited.length > 0) return true;
        return false;
      },
      isVisited() {  return this.$store.getters.visited },
    },
  }
</script>

<style scoped>
.wrapper {
  position: absolute;
    right: 0;
    top: 215px;
    z-index: 2;
    font-size: 12px;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
    border-radius: 5px;
    background-color: rgba(230, 230, 230, 0.7);
    
}
.visitedblock{
    width: 300px;
    min-height: 50px;
    max-height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;
    overflow: auto;
  }
  .custom-header {
    background-color: #2185D0;
    color: #fff;
    margin: auto;
    margin-bottom: 5px;
    text-align: center;
  }
</style>
