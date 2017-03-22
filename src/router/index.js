import Vue from 'vue';
import Router from 'vue-router';
import Views from '@/components/Views';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Views',
      component: Views,
    },
  ],
});
