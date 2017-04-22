<template>
  <div class="ui icon input custom-tool">
    <input type="text" placeholder="Search..." v-model.trim="search" v-on:input="searcher">
    <i class="search link icon"></i>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'Search',
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters(['data', ]),
  },
  methods: {
    ...mapMutations({setDisplay: types.DISPLAY, setSearch: types.SEARCH}),
    searcher() {
      const self = this;
      this.setSearch({search: true});
      Object.keys(self.data).forEach( id => {
        const index = self.data[id].commonName.toLowerCase().indexOf(self.search.toLowerCase());
        self.setDisplay({
          id,
          display: index,
        });
      });
    },
  },

}
</script>
<style>
  
</style>