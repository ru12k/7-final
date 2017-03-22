<template>
  <div id="visitedItem-wrapper">
      <div><img class="visited-flag" :src="flag"></div>
      <div class="visited-name">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'visited-item',
  props: ['id', 'name'],
  computed: {
    flag() {
        if (this.id != '-99') {
          console.log('flag: ', this.id);
          return require(`../assets/flags/4x3/${this.id}.svg`);
        };
      },
  }
}
</script>

<style>
#visitedItem-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 6px;
}
.visited-flag {
  width: 15px;
}
.visited-name {
  padding: 3px;
  font-size: 12px;
  color: orangered;
}
</style>